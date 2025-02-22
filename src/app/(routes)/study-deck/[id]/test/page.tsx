'use client'
import { Test } from '@/components/test';
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react';
import ScoreResult from '@/components/score-result';

const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
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
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(true);

    const handleAnswer = (answer: string) => {
        if (answer === questions[currentQuestion].answer) {
            setScore(score + 1);
            if (currentQuestion === questions.length - 1) {
                setShowResult(true);
                return;
            }
        } else {
            console.log("Incorrect");
        }
        setCurrentQuestion(currentQuestion + 1);
    }

    const handleNextQuestion = () => {
        if (currentQuestion === questions.length - 1) {
            setShowResult(true);
            return;
        }

        setCurrentQuestion(currentQuestion + 1);
    }

    const handlePrevQuestion = () => {
        if (currentQuestion === 0) {
            return;
        }

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
                    <ScoreResult score={score} totalQuestions={questions.length} questions={questions}/> 
                ): (
                    <Test
                        questions={questions} 
                        handleAnswer={handleAnswer} 
                        handlePrevQuestion={handlePrevQuestion} 
                        currentQuestion={currentQuestion} 
                        handleNextQuestion={handleNextQuestion}  
                    />
                )}
        </div>
    )
}