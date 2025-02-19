import prismadb from "@/lib/prismadb";
import React from "react";
import Notes from "./notes";
import { redirect } from "next/navigation";

const NotesPage = async ({ params }: { params: { id: string } }) => {
  const note = await prismadb.note.findUnique({
    where: {
      id: (await params).id,
    },
  });

  if (!note) redirect("/dashboard");

  return (
    <>
      <Notes note={note} />
    </>
  );
};

export default NotesPage;
