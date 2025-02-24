"use client";
import React, { useState } from "react";
import Markdown from "react-markdown";
import { NotebookPen, ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Note } from "@prisma/client";
import EditorProvider, { CustomElement } from "@/providers/editor-provider";
import RichTextbox from "@/components/ui/rich-textbox";
import { Descendant } from "slate";
import { useRouter } from "next/navigation";
import { extractHeadings } from "@/lib/utils";
import NoteSidebar from "./component/note-sidebar";
import CreateTest from "@/components/modals/create-test-modal";

const NoteContainer = ({ note }: { note: Note }) => {
  const [contentValue, setContentValue] = useState<Descendant[]>(
    JSON.parse(note.content!.toString()),
  );

  const headings = extractHeadings(contentValue as CustomElement[]);
  console.log(headings);

  const router = useRouter();

  return (
    <div className="flex max-h-full w-full max-w-[1300px] flex-col">
      <div className="relative mb-8 flex w-full items-center justify-center">
        <div className="absolute left-0">
          <button onClick={() => router.back()}>
            <ChevronLeft size={36} />
          </button>
        </div>
        <h1 className="text-3xl">Study Highlights</h1>
      </div>
      <div className="">
        <div className="flex items-center justify-between border-b border-white/30 py-4">
          <div className="text-2xl font-semibold">
            <Markdown>{note?.title}</Markdown>
          </div>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex min-w-fit items-center justify-center gap-2 rounded-xl bg-[radial-gradient(50%_50%_at_50%_50%,#9B77CB_0%,#591DA9_100%)] px-4 py-2 text-white transition-opacity duration-200 hover:opacity-90">
                <NotebookPen size={18} />
                <span>Notes</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-purple-600 bg-black text-white">
                <DropdownMenuItem className="from-[#9B77CB] to-[#591DA9] hover:bg-gradient-to-r hover:text-white focus:bg-gradient-to-r focus:from-[#9B77CB] focus:to-[#591DA9] focus:text-white">
                  <CreateTest id={note.id} title={note?.title} />
                </DropdownMenuItem>
                <DropdownMenuItem className="from-[#9B77CB] to-[#591DA9] hover:bg-gradient-to-r hover:text-white focus:bg-gradient-to-r focus:from-[#9B77CB] focus:to-[#591DA9] focus:text-white">
                  Flashcards
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <button className="flex items-center justify-center rounded-xl border border-white/20 p-2 transition-colors duration-200 hover:bg-white/10">
              <PenLine size={24} />
            </button> */}
          </div>
        </div>
      </div>

      <div className="max-h-1/2 mt-6 flex w-full max-w-none">
        <EditorProvider
          contentValue={contentValue}
          changeContentValue={setContentValue}
        >
          <RichTextbox />
        </EditorProvider>
        <NoteSidebar headings={headings} />
        {/* <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => (
              <h1 className="mb-4 mt-8 text-3xl font-bold" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="mb-4 mt-8 text-2xl font-semibold" {...props} />
            ),
            p: ({ ...props }) => (
              <p className="my-4 leading-relaxed" {...props} />
            ),
            ul: ({ ...props }) => <ul className="my-4 space-y-2" {...props} />,
            li: ({ ...props }) => (
              <li className="ml-4 list-disc pl-2 text-white" {...props}>
                <span className="ml-2">{props.children}</span>
              </li>
            ),
            strong: ({ ...props }) => (
              <strong className="font-semibold" {...props} />
            ),
            em: ({ ...props }) => <em className="italic" {...props} />,
          }}
        >
          {note.content?.toString()}
        </Markdown> */}
      </div>
    </div>
  );
};

export default NoteContainer;
