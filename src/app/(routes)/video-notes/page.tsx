'use client'
import { useState } from "react"
import { UploadMode } from './components/UploadMode';
import { UploadModeContent } from './components/UploadModeContent';
import RouteLoading from "../loading";

export default function VideoNotes() {

    const [mode, setMode] = useState("upload")
    const [loading, setLoading] = useState(false);
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

    const handleGenerateNotes = () => {
        setLoading(true);
        
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
            />
        </div>
    )

}