import { NotebookPen, PenLine, ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react'
import Markdown from "react-markdown"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from '@/components/ui/progress'
import Flashcard from "@/components/flashcard"


export default function Page() {

    return (
        <div className="w-full">
            <div className='flex items-center justify-center w-full relative mb-8'>
                <div className='absolute left-0'>
                    <button>
                        <ChevronLeft size={36} />
                    </button>
                </div>
                <h1 className='text-3xl'>Flashcards</h1>
            </div>
            <div className="sticky top-0 bg-black/95 backdrop-blur-sm z-10">
                <div className="flex items-center justify-between py-4 border-b border-white/20">
                    <div className="text-2xl font-semibold">
                        <Markdown>Overview of Common Data Structures</Markdown>
                    </div>
                    <div className="flex gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="inline-flex items-center justify-center px-4 py-2 gap-2
                                text-white rounded-xl bg-[radial-gradient(50%_50%_at_50%_50%,#9B77CB_0%,#591DA9_100%)] 
                                hover:opacity-90 transition-opacity duration-200 min-w-fit">
                                <NotebookPen size={18} />
                                <span>Notes</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-black border-purple-600 text-white">
                                <DropdownMenuItem className="hover:bg-gradient-to-r from-[#9B77CB] to-[#591DA9] hover:text-white focus:bg-gradient-to-r focus:from-[#9B77CB] focus:to-[#591DA9] focus:text-white">
                                    Notes
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gradient-to-r from-[#9B77CB] to-[#591DA9] hover:text-white focus:bg-gradient-to-r focus:from-[#9B77CB] focus:to-[#591DA9] focus:text-white">
                                    Quiz
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gradient-to-r from-[#9B77CB] to-[#591DA9] hover:text-white focus:bg-gradient-to-r focus:from-[#9B77CB] focus:to-[#591DA9] focus:text-white">
                                    Flashcards
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <button className="flex justify-center items-center p-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors duration-200">
                            <PenLine size={24} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-8 px-[70px]'>
                <Progress value={33} />
                <div className='flex items-center justify-center mt-4'>
                    <Flashcard front="What is a stack?" back="A stack is a data structure that follows the Last In First Out (LIFO) principle." />
                </div>
                <div>
                    <div className="flex items-center justify-center gap-12 mt-8">
                        <button className="flex items-center justify-center px-7 py-2 border-[#CB98ED] rounded-xl border">
                            <ArrowLeft size={24} color='#CB98ED'/>
                        </button>
                        <h1 className='font-semibold text-xl '> 1/24 </h1>
                        <button className="flex items-center justify-center px-7 py-2 border-[#CB98ED] rounded-xl border">
                            <ArrowRight size={24} color='#CB98ED'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}