import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {

    const { id, score } = await req.json();

    const supabase = await createClient();

    const { data: {user} } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const exam_score = await prismadb.exam.create({
        data: {
            noteId: id,
            userId: user.id,
            score
        }
    })

    if (!exam_score) {
        return NextResponse.json({ error: 'Failed to save exam score' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}