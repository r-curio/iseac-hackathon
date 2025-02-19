import prismadb from '@/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json()
        const supabase = await createClient()

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ message: 'User is not logged in' }, { status: 401 })
        }

        if (data.type === 'progress update') {

            const response = await prismadb.flashcard.update({
                where: {
                    id: data.id
                },
                data: {
                    isAnswered: data.isAnswered
                }
            })

            if (!response) {
                return NextResponse.json({ message: 'Failed to update flashcard' }, { status: 500 })
            }

            const note = await prismadb.note.update({
                where: {
                    id: response.noteId
                },
                data: {
                    flashcardProgress: data.progress
                }   
            })

            if (!note) {
                return NextResponse.json({ message: 'Failed to update note' }, { status: 500 })
            }

            const activity = await prismadb.activity.create({
                data: {
                    userId: user.id,
                    activityType: 'FLASHCARDS',
                }
            })

            if (!activity) {
                return NextResponse.json({ message: 'Failed to create activity' }, { status: 500 })
            }

            return NextResponse.json(response)
        } 

        else {

            const response = await prismadb.flashcard.update({
                where: {
                    id: data.id
                },
                data: {
                    front: data.front,
                    back: data.back
                }
            })
    
            if (!response) {
                return NextResponse.json({ message: 'Failed to update flashcard' }, { status: 500 })
            }
    
            const activity = await prismadb.activity.create({
                data: {
                    userId: user.id,
                    activityType: 'FLASHCARDS',
                }
            })
    
            if (!activity) {
                return NextResponse.json({ message: 'Failed to create activity' }, { status: 500 })
            }
    
            return NextResponse.json(response)
        }
        

    } catch (error) {
        console.error('An error occurred:', error)
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 })
    }
}