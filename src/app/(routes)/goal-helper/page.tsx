import React from "react";
import GoalHelper from "./goal-helper";
import { createClient } from "@/utils/supabase/server";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

const GoalHelperPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = await prismadb.profile.findUnique({
    where: {
      email: user?.email,
    },
  });

  const notes = await prismadb.note.findMany({
    where: {
      userId: profile?.id,
    },
  });

  const exams = await prismadb.exam.findMany({
    where: {
      userId: profile?.id,
    },
  });

  if (!profile) redirect("/login");

  return <GoalHelper notes={notes} profile={profile} exams={exams} />;
};

export default GoalHelperPage;
