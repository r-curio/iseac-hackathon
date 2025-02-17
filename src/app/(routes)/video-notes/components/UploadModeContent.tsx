import AIButton from "@/components/ai-button";
import UploadDescription from "./UploadDescription";
import UploadBox from "./UploadBox";


interface UploadModeContentProps {
    mode: string;
    selectedFile: File | undefined;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleRemoveFile: () => void;
    handleGenerateNotes: () => void;
    setText: (text: string) => void;    
}


export function UploadModeContent({ 
    mode, 
    selectedFile,  
    handleFileChange, 
    handleDrop, 
    handleDragOver, 
    handleRemoveFile,
    handleGenerateNotes,
    setText
}: UploadModeContentProps) {
    
    

    return (
        <>
            <div className="mt-[30px] px-2 pt-[10px] pb-[20px] border-b border-white">
                <UploadDescription mode={mode}/>
            </div>
            <div className="mt-[40px]">
                <UploadBox 
                    mode={mode} 
                    selectedFile={selectedFile}
                    handleFileChange={handleFileChange} 
                    handleDrop={handleDrop} 
                    handleDragOver={handleDragOver} 
                    handleRemoveFile={handleRemoveFile}
                    setText={setText}
                />
                <div className="flex justify-center">
                    <AIButton className="mt-12 text-xl px-[64px]" onClick={handleGenerateNotes}>Generate Notes</AIButton>
                </div>
            </div>
        </>
    )
}

export default UploadModeContent