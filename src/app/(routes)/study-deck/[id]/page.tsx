import prismadb from "@/lib/prismadb"
import Dashboard from "./dashboard"

export default async function Course({
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
            title: true
        }
    })

    const flashcards = await prismadb.flashcard.findMany({
        where: {
            noteId: id
        },
        select: {
            id: true,
            front: true,
            back: true
        }
    })

    if (!notes) {
        return <div>Note not found</div>;
    }

    return (
        <Dashboard notes={notes} flashcards={flashcards} id={id}/>
    )
}