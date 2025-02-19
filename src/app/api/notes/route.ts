import prismadb from "@/lib/prismadb";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    title: string;
    content: string;
    flashcards: {
        Front: string;
        Back: string;
    }[];
}

export async function POST(req: NextRequest) {
    try {
        const data: RequestBody = await req.json();

        console.log(data.flashcards)

        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ message: "User is not logged in" }, { status: 401 });
        }

       const note = await prismadb.note.create({
            data: {
                title: data.title,
                content: data.content,
                userId: user.id
            }
        });

        if (!note) {
            return NextResponse.json({ message: "Failed to insert note" }, { status: 500 });
        }

        const flashcards = await prismadb.flashcard.createMany({
            data: data.flashcards.map((flashcard) => ({
                noteId: note.id,
                userId: user.id,
                isAiGenerated: true,
                front: flashcard.Front,
                back: flashcard.Back
            }))
        });

        if (!flashcards) {
            return NextResponse.json({ message: "Failed to insert flashcards" }, { status: 500 });
        }
        
        return NextResponse.json({ id: note.id }, { status: 200 });

    } catch (error: unknown) {
        console.error("An error occurred:", error);
        return NextResponse.json({ 
            message: error instanceof Error ? error.message : 'An unexpected error occurred' 
        }, { status: 500 });
    }
}