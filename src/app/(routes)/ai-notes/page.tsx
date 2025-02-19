"use client";
import { useState } from "react";
import { UploadMode } from "./components/UploadMode";
import { UploadModeContent } from "./components/UploadModeContent";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Descendant } from "slate";
import { parseMarkdown } from "@/lib/utils";

export default function VideoNotes() {
  const router = useRouter();
  const [mode, setMode] = useState("upload");
  const [, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentValue, setContentValue] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const [selectedFile, setSelectedFile] = useState<File>();

  // Handle file selection via input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle file drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };

  // Prevent default behavior when dragging over
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveFile = () => {
    setSelectedFile(undefined);
  };

  const handleGenerateNotes = async () => {
    setLoading(true);
    setError(null);

    if (mode === "paste") {
      // Handle paste mode

      toast.loading("Updating goal...", {
        toastId: "addNote",
      });

      try {
        await axios.post("/api/notes", {
          title: "Title",
          content: JSON.stringify(contentValue),
          isAiGenerated: false,
          flashcardProgress: 0,
          examScores: [],
          lastModified: new Date(),
        });

        toast.update("addNote", {
          render: "Note added successfully!",
          type: "success",
          isLoading: false,
          closeButton: true,
          autoClose: 2000,
        });
      } catch (error) {
        console.error("Error:", error);
        toast.update("addNote", {
          render: "Failed to add note. Please try again.",
          type: "error",
          isLoading: false,
          closeButton: true,
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
        return;
      }
    }

    if (!selectedFile) {
      setError("Please select a file first");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const aiResponse = await fetch("http://127.0.0.1:5000/ai-notes", {
        method: "POST",
        body: formData,
      });

      if (!aiResponse.ok) {
        throw new Error(`AI Service error: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();

      console.log(aiData);

      const parsed = await parseMarkdown(aiData.content);

      console.log(parsed);

      const saveResponse = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: aiData.title,
          content: JSON.stringify(parsed),
          isAiGenerated: true,
          flashcardProgress: 0,
          examScores: [],
          lastModified: new Date(),
        }),
      });

      if (!saveResponse.ok) {
        throw new Error(`Save error: ${saveResponse.status}`);
      }

      const savedData = await saveResponse.json();
      router.push(`/study-deck/${savedData.id}/notes`);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  //   if (loading) {
  //     return <RouteLoading />;
  //   }

  return (
    <div className="w-full px-4">
      {error && (
        <div className="mb-4 rounded bg-red-100 p-2 text-red-500">{error}</div>
      )}
      <UploadMode mode={mode} setMode={setMode} />
      <UploadModeContent
        mode={mode}
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleRemoveFile={handleRemoveFile}
        handleGenerateNotes={handleGenerateNotes}
        setText={setContentValue}
        text={contentValue}
      />
    </div>
  );
}
