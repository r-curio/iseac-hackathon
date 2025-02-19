import AIButton from "@/components/ai-button";
import UploadDescription from "./UploadDescription";
import UploadBox from "./UploadBox";
import { Descendant } from "slate";

interface UploadModeContentProps {
  mode: string;
  selectedFile: File | undefined;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleRemoveFile: () => void;
  handleGenerateNotes: () => void;
  setText: (text: Descendant[]) => void;
  text: Descendant[];
}

export function UploadModeContent({
  mode,
  selectedFile,
  handleFileChange,
  handleDrop,
  handleDragOver,
  handleRemoveFile,
  handleGenerateNotes,
  setText,
  text,
}: UploadModeContentProps) {
  return (
    <>
      <div className="mt-[30px] border-b border-white px-2 pb-[20px] pt-[10px]">
        <UploadDescription mode={mode} />
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
          text={text}
        />
        <div className="flex justify-center">
          <AIButton
            className="mt-12 px-[64px] text-xl"
            onClick={handleGenerateNotes}
          >
            Generate Notes
          </AIButton>
        </div>
      </div>
    </>
  );
}

export default UploadModeContent;
