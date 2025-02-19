import { ChevronLeft, NotebookPen} from "lucide-react"
import Link from "next/link"
import Markdown from "react-markdown"
import prismadb from "@/lib/prismadb"
import FlashcardArray from "@/components/flashcardArray"
import FlashcardList from "@/components/flashcardList"

export default async function Course({
    params
}: {
    params: { id: string }
}) {
    const { id } = params

    const notes = await prismadb.note.findUnique({
        where: {
            id
        },
        select: {
            title: true
        }
    })

    const flashcards = await prismadb.flashcard.findMany({
        where: {
            noteId: id
        },
        select: {
            front: true,
            back: true
        }
    })

    return (
        <div className="w-full">
            <div className='flex items-center justify-center w-full relative mb-8'>
                <div className='absolute left-0'>
                    <Link href="/study-deck">
                        <ChevronLeft size={24} />
                    </Link>
                </div>
                <h1 className="text-2xl"> Course Dashboard </h1>
            </div>
            <div className="w full text-2xl font-normal pb-4 border-b border-white">
                <Markdown>{notes?.title}</Markdown>
            </div>
            <div className="w-full mt-7 py-[42px] px-[80px] bg-[#0C101780]/50 space-y-8">
                <div className="flex justify-between">
                    <Link className="bg-flashcard-gradient rounded-[20px] px-20 flex gap-2 py-4 border-[#591DA9] border-2 hover:bg-[#591DA9]/30" href="/study-deck/[id]/notes" as={`/study-deck/${id}/notes`}>
                        <NotebookPen size={30} />
                        <p className="text-xl font-normal">Summary</p>
                    </Link>
                    <Link className="bg-flashcard-gradient rounded-[20px] px-20 flex gap-2 py-4 border-[#591DA9] border-2 hover:bg-[#591DA9]/30" href="/study-deck/[id]/flashcard" as={`/study-deck/${id}/flashcard`}>
                        <NotebookPen size={30} />
                        <p className="text-xl font-normal">Flashcards</p>
                    </Link>
                    <Link className="bg-flashcard-gradient rounded-[20px] px-20 flex gap-2 py-4 border-[#591DA9] border-2 hover:bg-[#591DA9]/30" href="/study-deck/[id]/flashcard" as={`/study-deck/${id}/flashcard`}>
                        <NotebookPen size={30} />
                        <p className="text-xl font-normal">Practice Test</p>
                    </Link>
                </div>
                <div className="w-full">
                   <FlashcardArray flashcard={flashcards} isFlashcard={false}/>
                </div>
            </div>
            <FlashcardList flashcards={flashcards}/>
        </div>
    )
}