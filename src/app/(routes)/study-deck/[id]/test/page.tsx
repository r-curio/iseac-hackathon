'use client'
import { Test } from '@/components/test';
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react';
import ScoreResult from '@/components/score-result';


const DemoQuestions = [
    {
        question: "What is the capital of France?",
        choices: [],
        answer: "Paris",
        selectedAnswer: ""
    },
    {
        question: "What is the capital of Germany?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Berlin",
        selectedAnswer: ""
    },
    {
        question: "What is the capital of Spain?",
        choices: [],
        answer: "Madrid",
        selectedAnswer: ""
    },
    {
        question: "London is the capital of England?",
        choices: ["True", "False"],
        answer: "True",
        selectedAnswer: ""
    }
]

export default function PracticeTest() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState(DemoQuestions);
    const [showResult, setShowResult] = useState(false);

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
        setShowResult(true);
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