'use client'
import { useState } from "react"
import { UploadMode } from './components/UploadMode';
import { UploadModeContent } from './components/UploadModeContent';
import RouteLoading from "../loading";

export default function VideoNotes() {

    const [mode, setMode] = useState("upload")
    const [loading, setLoading] = useState(false);
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
        
        if (mode === 'paste') {
            console.log(text);
            return;
        }

        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            const response = await fetch('/api/video-notes', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setLoading(false);
            // Handle successful upload
            
        } catch(error) {
            setLoading(false);
            console.error('Upload error:', error);
            // Handle error state
        }
    }
    
    if (loading) {
        return <RouteLoading />
    }
    

    return (
        <div className="w-full px-4">
            <UploadMode mode={mode} setMode={setMode}   />
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