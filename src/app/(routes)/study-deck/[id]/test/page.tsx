'use client'
import { Test } from '@/components/test';
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import ScoreResult from '@/components/score-result';
import { useRouter } from 'next/navigation';

interface Question {
    choices: string[];
    question: string;
    answer: string;
    selectedAnswer: string;
}

export default function PracticeTest() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Get questions from localStorage when component mounts
        const storedQuestions = localStorage.getItem('testQuestions');
        console.log('stored questions:', storedQuestions);
        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
            setIsLoading(false);
            localStorage.removeItem('testQuestions');
        } else {
            // If no questions found, redirect back
            router.push('/study-deck');
        }
    }, [router]);

    if (isLoading || !questions || questions.length === 0) {
        return <div className="w-full min-h-screen bg-result-gradient flex items-center justify-center">
            Loading...
        </div>;
    }

    const handleAnswer = (answer: string) => {
        setQuestions(questions.map((question, index) => {
            if (index === currentQuestion) {
                return {
                    ...question,
                    selectedAnswer: answer
                }
            }
            return question;
        }));
    }

    const handleSubmit = () => {
        const allQuestionsAnswered = questions.every(q => q.selectedAnswer);
        if (allQuestionsAnswered) {
            setShowResult(true);
        } else {
            alert('Please answer all questions before submitting.');
        }
    }

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
    }

    const handlePrevQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
    }

    return (
        <div className="w-full bg-result-gradient">
                <div className="relative mb-8 flex w-full items-center justify-center">
                    <div className="absolute left-0">
                    <Link href="/study-deck">
                        <ChevronLeft size={24} />
                    </Link>
                    </div>
                    <h1 className="text-2xl">Practice Exam</h1>
                </div>
                {showResult ? (
                    <ScoreResult totalQuestions={questions.length} questions={questions}/> 
                ): (
                    <Test
                        questions={questions} 
                        handleAnswer={handleAnswer} 
                        handlePrevQuestion={handlePrevQuestion} 
                        currentQuestion={currentQuestion} 
                        handleNextQuestion={handleNextQuestion}
                        handleSubmit={handleSubmit}  
                    />
                )}
        </div>
    )
}