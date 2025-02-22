import React from "react";
import { ArrowLeft, ArrowRight, NotebookPen } from 'lucide-react';
import Markdown from 'react-markdown';
import QuestionComponent from '@/components/QuestionComponent';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SubmitModal from '@/components/modals/submit-test-modal';


interface TestProps {
    questions: {
        question: string;
        choices: string[];
        answer: string;
        selectedAnswer: string;
    }[];
    handleAnswer: (answer: string) => void;
    handlePrevQuestion: () => void;
    currentQuestion: number;
    handleNextQuestion: () => void;
    handleSubmit: () => void;
}

export function Test({
    questions,
    handleAnswer,
    handlePrevQuestion,
    currentQuestion,
    handleNextQuestion,
    handleSubmit
}: TestProps) {
  return <><div className="w full border-b border-white pb-4 text-2xl font-normal">
                    <div className="flex items-center justify-between py-4 border-b border-white/20">
                        <div className="text-2xl font-semibold">
                            <Markdown>Test</Markdown>
                        </div>
                        <div className="flex gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="inline-flex items-center justify-center px-4 py-2 gap-2
                                    text-white rounded-xl bg-[radial-gradient(50%_50%_at_50%_50%,#9B77CB_0%,#591DA9_100%)] 
                                    hover:opacity-90 transition-opacity duration-200 min-w-fit">
                                    <NotebookPen size={18} />
                                    <span>Study Deck</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-black border-purple-600 text-white">
                                    <DropdownMenuItem className="hover:bg-gradient-to-r from-[#9B77CB] to-[#591DA9] hover:text-white focus:bg-gradient-to-r focus:from-[#9B77CB] focus:to-[#591DA9] focus:text-white">
                                        Notes
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-gradient-to-r from-[#9B77CB] to-[#591DA9] hover:text-white focus:bg-gradient-to-r focus:from-[#9B77CB] focus:to-[#591DA9] focus:text-white">
                                        Quiz
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <div className="mt-7 w-full space-y-8 rounded-lg bg-[#0C101780]/50 px-[80px] py-[42px]">
                
                    <QuestionComponent question={questions[currentQuestion].question} choices={questions[currentQuestion].choices} selectedAnswer={questions[currentQuestion].selectedAnswer} onAnswer={handleAnswer} />
                    <div className="flex items-center justify-center gap-12 mt-8">
                    <button className="flex items-center justify-center px-7 py-2 border-[#CB98ED] rounded-xl border" onClick={handlePrevQuestion}>
                        <ArrowLeft size={24} color='#CB98ED' />
                    </button>
                    <h1 className='font-semibold text-xl '> {currentQuestion + 1} / {questions.length}</h1>
                    {currentQuestion === questions.length - 1 ? (
                        <SubmitModal handleSubmit={handleSubmit}/>
                    ) : (
                        <button className="flex items-center justify-center px-7 py-2 border-[#CB98ED] rounded-xl border" onClick={handleNextQuestion}>
                            <ArrowRight size={24} color='#CB98ED' />
                        </button>
                    )}
                    
                </div>
            </div></>;
}
  