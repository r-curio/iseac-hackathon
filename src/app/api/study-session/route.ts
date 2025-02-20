import { createClient } from "@/utils/supabase/server";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { duration, dateStopped } = await req.json();

    console.log("Duration:", duration);

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const previousSession = await prismadb.session.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        totalHr: true,
      },
    });

    if (!previousSession) {
      await prismadb.session.create({
        data: {
          userId: user.id,
          totalHr: duration,
          prevTotalHr: 0,
        },
      });
    } else if (previousSession.totalHr < duration) {
      await prismadb.session.update({
        where: {
          id: previousSession.id,
        },
        data: {
          totalHr: duration,
        },
      });
    }

    const profile = await prismadb.profile.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const existingProgress = await prismadb.progress.findFirst({
      where: {
        userId: profile.id,
        date: {
          gte: new Date(new Date(dateStopped).setHours(0, 0, 0, 0)),
          lt: new Date(new Date(dateStopped).setHours(23, 59, 59, 999)),
        },
      },
    });

    if (existingProgress) {
      await prismadb.progress.update({
        where: {
          id: existingProgress.id,
        },
        data: {
          progress: existingProgress.progress + duration,
        },
      });
    } else {
      await prismadb.progress.create({
        data: {
          userId: user.id,
          progress: duration,
          date: dateStopped,
        },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in study session API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
