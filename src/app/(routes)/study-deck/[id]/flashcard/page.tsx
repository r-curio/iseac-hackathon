import { NotebookPen, PenLine, ChevronLeft } from 'lucide-react'
import Markdown from "react-markdown"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import FlashcardArray from './flashcardArray'
import prismadb from '@/lib/prismadb'
import Link from 'next/link'


export default async function Page({
    params
}: {
    params: { id: string }
}) {
    const { id } = await params

    const notes = await prismadb.note.findUnique({
        where: {
            id
        },
        select: {
            title: true,
            flashcardProgress: true
        }
    })

    const flashcards = await prismadb.flashcard.findMany({
        where: {
            noteId: id
        },
        select: {
            id: true,
            front: true,
            back: true,
            isAnswered: true
        }
    })

    return (
        <div className="w-full">
            <div className='flex items-center justify-center w-full relative mb-8'>
                <div className='absolute left-0'>
                    <Link href={`/study-deck/${id}`}>
                        <ChevronLeft size={36} />
                    </Link>
                </div>
                <h1 className='text-3xl'>Flashcards</h1>
            </div>
            <div className="sticky top-0 bg-black/95 backdrop-blur-sm z-10">
                <div className="flex items-center justify-between py-4 border-b border-white/20">
                    <div className="text-2xl font-semibold">
                        <Markdown>{notes?.title}</Markdown>
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
                        <button className="flex justify-center items-center p-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors duration-200">
                            <PenLine size={24} />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <FlashcardArray flashcard={flashcards} progress={notes?.flashcardProgress || 0}/>
            </div>
        </div>
    )
}