import prismadb from "@/lib/prismadb";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { noteId: string } },
) {
  try {
    const body = await req.json();

    console.log(body);

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

    const updatedNote = await prismadb.note.update({
      where: { id: params.noteId },
      data: {
        ...body,
      },
    });

    await prismadb.activity.create({
      data: {
        activityType: "NOTES",
        userId: user.id,
      },
    });
    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.log("An error occured", error);
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { noteId: string } },
) {
  params = await params;

  try {
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

    // Delete all related records first
    await prismadb.$transaction([
      // Delete related flashcards
      prismadb.flashcard.deleteMany({
        where: { noteId: params.noteId },
      }),

      // Delete related exams
      prismadb.exam.deleteMany({
        where: { noteId: params.noteId },
      }),

      // Delete the note itself
      prismadb.note.delete({
        where: { id: params.noteId },
      }),

      // Create activity log
      prismadb.activity.create({
        data: {
          activityType: "NOTES",
          userId: user.id,
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("An error occurred during deletion:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while deleting the note",
      },
      { status: 500 },
    );
  }
}
