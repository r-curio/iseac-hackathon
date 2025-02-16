import { ClipboardPaste, Upload } from "lucide-react";
import Image from "next/image";
import gdrive from "../../../../../public/icons/gdrive.svg";

export function UploadDescription({ mode }: { mode: string; }) {

    switch (mode) {
        case "paste":
            return (
                <div className="flex items-center gap-4">
                    <div className="bg-white w-fit p-4 aspect-square rounded-full">
                        <ClipboardPaste size={23} color="black" />
                    </div>
                    <div>
                        <h2 className="">Paste Notes</h2>
                        <p className="font-extralight text-[#A9ACB4]">Enter or paste your notes to get started.</p>
                    </div>

                </div>
            );

        case "upload":
            return (
                <div className="flex items-center gap-4">
                    <div className="bg-white w-fit p-4 aspect-square rounded-full">
                        <Upload size={23} color="black" />
                    </div>
                    <div>
                        <h2 className="">Upload Files</h2>
                        <p className="font-extralight text-[#A9ACB4]">Select and upload the files of your choice</p>
                    </div>
                </div>
            );

        case "gdrive":
            return (
                <div className="flex items-center gap-4">
                    <div className="bg-white w-fit p-4 aspect-square rounded-full">
                        <Image src={gdrive} alt="gdrive" width={23} height={23} />
                    </div>
                    <div>
                        <h2 className="">Google Drive</h2>
                        <p className="font-extralight text-[#A9ACB4]">Select and import files from your drive</p>
                    </div>
                </div>
            );
    }
}   

export default UploadDescription;