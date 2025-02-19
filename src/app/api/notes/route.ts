import prismadb from "@/lib/prismadb";
import { createClient } from "@/utils/supabase/server";
import { Flashcard } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "User is not logged in" },
        { status: 401 },
      );
    }

    const newNote = await prismadb.note.create({
      data: {
        ...body,
        userId: user.id,
      },
    });

    await prismadb.flashcard.createMany({
      data: body.flashcards.map((flashcard: Flashcard) => ({
        noteId: newNote.id,
        userId: user.id,
        isAiGenerated: true,
        front: flashcard.front,
        back: flashcard.back,
      })),
    });

    await prismadb.activity.create({
      data: {
        activityType: "NOTES",
        userId: user.id,
      },
    });

    return NextResponse.json(newNote, { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
