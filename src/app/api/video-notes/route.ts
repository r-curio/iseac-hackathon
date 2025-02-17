import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return NextResponse.json({ message: "No file provided" }, { status: 400 });
        }

        // Check file size (50MB limit)
        if (file.size > 50 * 1024 * 1024) {
            return NextResponse.json({ message: "File size exceeds 50MB limit" }, { status: 400 });
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ message: "User is not logged in" }, { status: 401 });
        }

        // Create a path that matches the RLS policy structure
        // The policy expects: storage.foldername(name)[1] to equal auth.uid()
        const fileName = `${user.id}/${Date.now()}_${file.name}`;

        const fileArrayBuffer = await file.arrayBuffer();

        const { data, error } = await supabase.storage
            .from('video-notes')
            .upload(fileName, fileArrayBuffer, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.log(error)
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ 
            message: error instanceof Error ? error.message : 'An error occurred' 
        }, { status: 500 });
    }
}