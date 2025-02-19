import { Upload, X, FileText } from "lucide-react";
import Image from "next/image";
import gdrive from "../../../../../public/icons/gdrive.svg";
import useDrivePicker from "react-google-drive-picker";
import RichTextbox from "@/components/ui/rich-textbox";
import EditorProvider from "@/providers/editor-provider";
import { Descendant } from "slate";

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

interface UploadBoxProps {
  mode: string;
  selectedFile: File | undefined;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleRemoveFile: () => void;
  setText: (text: Descendant[]) => void;
  text: Descendant[];
}

export default function UploadBox({
  mode,
  selectedFile,
  handleFileChange,
  handleDrop,
  handleDragOver,
  handleRemoveFile,
  setText,
  text,
}: UploadBoxProps) {
  const [openPicker] = useDrivePicker();

  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      developerKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
      viewId: "DOCS",
      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      // customViews: customViewsArray, // custom view
      callbackFunction: async (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
          return;
        }
        console.log(data);
      },
    });
  };

  switch (mode) {
    case "paste":
      return (
        <div className="flex">
          <EditorProvider contentValue={text} changeContentValue={setText}>
            <RichTextbox />
          </EditorProvider>
        </div>
        // <Textarea
        //   placeholder="Paste your notes here. AI will do the rest"
        //   className="h-[400px] rounded-3xl bg-[#F8F7FC]/30"
        //   onChange={(e) => setText(e.target.value)}
        // />
      );

    case "upload":
      return (
        <div
          className="custom-dashed flex h-[400px] items-center justify-center rounded-lg border-white"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex w-full flex-col items-center gap-4 px-6">
            {selectedFile ? (
              <div className="w-full max-w-2xl rounded-xl bg-white/10 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-white/20 p-3">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-[#C0B4D0]">
                        {formatFileSize(selectedFile.size)} •{" "}
                        {selectedFile.type || "Unknown type"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="rounded-full p-2 transition-colors hover:bg-white/10"
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
                  className="mt-4 text-sm text-[#C0B4D0] transition-colors hover:text-white"
                >
                  Choose a different file
                </button>
              </div>
            ) : (
              <>
                <Upload size={45} strokeWidth={8} absoluteStrokeWidth={true} />
                <div className="mt-10">
                  <h1 className="text-center text-3xl font-semibold">
                    Choose a file or drag & drop it here
                  </h1>
                  <h2 className="text-2xl font-semibold text-[#C0B4D0]">
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
                  className="mt-5 rounded-2xl border-2 border-[#C0B4D0] px-8 py-4 hover:opacity-55"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  Browse File
                </button>
              </>
            )}
          </div>
        </div>
      );

    case "gdrive":
      return (
        <div className="custom-dashed flex h-[400px] items-center justify-center rounded-lg border-white">
          <div className="flex flex-col items-center gap-4">
            <Image src={gdrive} alt="gdrive" width={45} height={45} />
            <div className="mt-10">
              <h1 className="text-center text-3xl font-semibold">
                Select a doc or presentation from your drive
              </h1>
              <h2 className="text-2xl font-semibold text-[#C0B4D0]"></h2>
            </div>
            <button
              className="mt-5 rounded-2xl border-2 border-[#C0B4D0] px-8 py-4 hover:opacity-55"
              onClick={handleOpenPicker}
            >
              Select File
            </button>
          </div>
        </div>
      );
  }
}
