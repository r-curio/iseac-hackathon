import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { createClient } from "@/utils/supabase/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    // Verify authentication
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the new study goal from request body
    const body = await req.json();
    const { studyHrsGoal } = body;

    if (!studyHrsGoal || typeof studyHrsGoal !== "number") {
      return new NextResponse("Invalid study hours goal", { status: 400 });
    }

    // Update the profile
    const updatedProfile = await prismadb.profile.update({
      where: {
        id: (await params).userId,
      },
      data: {
        studyHrsGoal,
        lastActive: new Date(),
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("[STUDY_GOAL_UPDATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
