import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/utils/supabase/server";

interface Question {
    choices: string[];
    question: string;
    answer: string;
    selectedAnswer?: string;
}

export async function POST(req: NextRequest) {
    const { selectedTypes, id} = await req.json();
    const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY as string,
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        
        const note = await prismadb.note.findUnique({
            where: {
                id,
            },
        });

        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }

        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const activity = await prismadb.activity.create({
            data: {
                userId: user.id,
                activityType: "EXAM",
            },
        });

        if (!activity) {
            return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
        }


        const prompt = `Generate a practice test based on the following educational content: "${note.content}"

            Instructions:
            - Create 5 questions
            - Only use the following question types: ${selectedTypes.join(', ')}
            - Each question should test understanding of the provided content
            - Format the response as a JSON array

            Required JSON structure:
            {
            "questions": [
                {
                "question": "The actual question text",
                "type": "one of: ${selectedTypes.join(', ')}",
                "choices": ["array of choices for multiple choice/true-false", "empty array for identification"],
                "answer": "The correct answer",
                "selectedAnswer": ""
                }
            ]
            }

            Rules:
            1. For Multiple Choice questions:
            - Include 4 plausible choices
            - Only one correct answer
            - Choices should be clear and distinct

            2. For True/False questions:
            - Choices array should be ["True", "False"]
            - Answer must be either "True" or "False"

            3. For Identification questions:
            - Choices array must be empty []
            - Answer should be concise and specific

            Important:
            - All questions must be directly related to the provided content
            - Ensure answers are accurate and unambiguous
            - Keep questions clear and at an appropriate difficulty level
            - Format response as valid JSON

            Return only the JSON output without any additional text or explanations.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean and parse the response
        const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
        
        try {
            const parsedTest = JSON.parse(cleanedText);
            
            // Validate the structure
            if (!parsedTest.questions || !Array.isArray(parsedTest.questions)) {
                throw new Error('Invalid test structure');
            }


            // Validate each question
            parsedTest.questions = parsedTest.questions.map((q: Question) => ({
                ...q,
                choices: Array.isArray(q.choices) ? q.choices : [],
                selectedAnswer: ""
            }));
            

            return NextResponse.json({ 
                questions: parsedTest.questions 
            }, { 
                status: 200 
            });

        } catch (parseError) {
            console.error('Error parsing test:', parseError);
            return NextResponse.json({ 
                error: 'Invalid test format received' 
            }, { 
                status: 500 
            });
        }

    } catch (error) {
        console.error('Error generating test:', error);
        return NextResponse.json({ error: 'Failed to generate test' }, { status: 500 });
    }
}