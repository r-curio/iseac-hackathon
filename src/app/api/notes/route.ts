import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    title: string;
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const data: RequestBody = await req.json();

        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ message: "User is not logged in" }, { status: 401 });
        }

        const { data: notes, error } = await supabase
            .from('notes')
            .insert([
                {
                    user_id: user.id,
                    title: data.title,
                    content: data.content,
                },
            ])
            .select(); // Add select() to return the inserted row

        if (error) {
            console.error("Error inserting data:", error);
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        if (notes && notes.length > 0) {
            return NextResponse.json({ id: notes[0].id }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Failed to insert note" }, { status: 500 });
        }
    } catch (error: any) {
        console.error("An error occurred:", error);
        return NextResponse.json({ 
            message: error.message || 'An unexpected error occurred' 
        }, { status: 500 });
    }
}