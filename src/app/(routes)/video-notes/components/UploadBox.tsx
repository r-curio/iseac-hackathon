import { Upload, X, FileText } from "lucide-react";
import Image from "next/image";
import gdrive from "../../../../../public/icons/gdrive.svg";
import { Textarea } from "@/components/ui/textarea";



const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};


interface UploadBoxProps {
    mode: string;
    selectedFile: File | undefined;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleRemoveFile: () => void;
}

export default function UploadBox({ 
    mode, 
    selectedFile,  
    handleFileChange, 
    handleDrop, 
    handleDragOver, 
    handleRemoveFile 
}: UploadBoxProps) {
    

    switch(mode){
        case 'paste':
            return (
                <Textarea placeholder="Paste your notes here. AI will do the rest" className="h-[400px] bg-[#F8F7FC]/30 rounded-3xl"/>
            )

        case 'upload':
            return (
                <div
                    className="h-[400px] border-white rounded-lg flex items-center justify-center custom-dashed"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div className="flex flex-col items-center gap-4 w-full px-6">
                        {selectedFile ? (
                            <div className="w-full max-w-2xl bg-white/10 rounded-xl p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/20 rounded-lg">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold text-xl">{selectedFile.name}</p>
                                            <p className="text-[#C0B4D0] text-sm">
                                                {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Unknown type'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleRemoveFile}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <X size={20} className="text-[#C0B4D0]" />
                                    </button>
                                </div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png,.pdf,.mp4"
                                />
                                <button
                                    onClick={() => document.getElementById("fileInput")?.click()}
                                    className="mt-4 text-[#C0B4D0] text-sm hover:text-white transition-colors"
                                >
                                    Choose a different file
                                </button>
                            </div>
                        ) : (
                            <>
                                <Upload size={45} strokeWidth={8} absoluteStrokeWidth={true} />
                                <div className="mt-10">
                                    <h1 className="font-semibold text-3xl text-center">Choose a file or drag & drop it here</h1>
                                    <h2 className="text-[#C0B4D0] font-semibold text-2xl">
                                        JPEG, PNG, PDF, and MP4 formats, up to 50 MB
                                    </h2>
                                </div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".jpg,.jpeg,.png,.pdf,.mp4"
                                />
                                <button
                                    className="border-2 rounded-2xl border-[#C0B4D0] py-4 px-8 mt-5 hover:opacity-55"
                                    onClick={() => document.getElementById("fileInput")?.click()}
                                >
                                    Browse File
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )

        case 'gdrive':
            return (
                <div className="h-[400px] border-white rounded-lg flex items-center justify-center custom-dashed">       
                    <div className="flex flex-col items-center gap-4">
                        <Image src={gdrive} alt="gdrive" width={45} height={45} />
                        <div className="mt-10">
                            <h1 className="font-semibold text-3xl text-center">Select a doc or presentation from your drive</h1 >
                            <h2 className="text-[#C0B4D0] font-semibold text-2xl">Allow pop-ups for Google Drive before connecting</h2>
                        </div>
                        <button className="border-2 rounded-2xl border-[#C0B4D0] py-4 px-8 mt-5 hover:opacity-55">Select File</button>
                    </div>
                </div>
            )
    }
}