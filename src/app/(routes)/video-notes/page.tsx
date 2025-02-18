"use client";
import { useState } from "react";
import { UploadMode } from "./components/UploadMode";
import { UploadModeContent } from "./components/UploadModeContent";
import RouteLoading from "../loading";
import { useRouter } from "next/navigation";

export default function VideoNotes() {
    const router = useRouter();
    const [mode, setMode] = useState("upload")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [text, setText] = useState("");
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
        
        if (mode === 'paste') {
            // Handle paste mode
            console.log(text);
            return;
        }

        if (!selectedFile) {
            setError('Please select a file first');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const aiResponse = await fetch('http://127.0.0.1:5000/ai-notes', {
                method: 'POST',
                body: formData
            });
            
            if (!aiResponse.ok) {
                throw new Error(`AI Service error: ${aiResponse.status}`);
            }

            const aiData = await aiResponse.json();
            
            const saveResponse = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    title: aiData.title, 
                    content: aiData.content
                }) 
            });
            
            if (!saveResponse.ok) {
                throw new Error(`Save error: ${saveResponse.status}`);
            }

            const savedData = await saveResponse.json();
            router.push(`/study-deck/${savedData.id}`);

        } catch(error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <RouteLoading />
    }

    return (
        <div className="w-full px-4">
            {error && (
                <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">
                    {error}
                </div>
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
                setText={setText}  
            />
        </div>
    )
}
