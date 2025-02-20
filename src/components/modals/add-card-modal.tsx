import React, { useEffect, useState } from "react";
import GlowButton from "../ui/glow-button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const AddCardModal = ({ isOpen, onClose }: AddCardModalProps) => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <dialog
      open={isOpen}
      className={cn(
        "fixed left-0 top-0 z-50 flex h-full w-full bg-[#00020A]/80 opacity-100 backdrop-blur-sm transition-all",
        !isOpen && "-z-50 opacity-0",
      )}
    >
      <div
        className={cn(
          "absolute left-1/2 top-1/2 flex h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 flex-col gap-4 rounded-3xl bg-[#00020A]/90 p-8 text-white opacity-0 shadow-[0px_0px_20px_2px_rgba(89,_29,_169,_0.50)] transition-all duration-200",
          isOpen && "scale-100 opacity-100",
        )}
      >
        <div className="flex w-full items-center justify-between pb-4">
          <p className="text-2xl font-bold 2xl:text-3xl">Add Card</p>
          <button
            onClick={() => {
              onClose();
            }}
          >
            <X className="h-6 w-6 text-gray" />
          </button>
        </div>
        <div className="flex h-full flex-col gap-6">
          <div className="flex rounded-lg border border-gray">
            <input
              type="text"
              placeholder="Enter front text"
              className="h-fit w-full bg-transparent p-4"
            />
          </div>
          <div className="flex flex-1 rounded-lg border border-gray">
            <textarea
              placeholder="Enter back text"
              className="h-full w-full resize-none bg-transparent p-4 outline-none focus:outline-none"
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-4">
          <Button
            className="rounded-full bg-transparent p-6"
            variant={"outline"}
          >
            <p>Cancel</p>
          </Button>
          <GlowButton showIcon={false}>Add Card</GlowButton>
        </div>
      </div>
    </dialog>
  );
};

export default AddCardModal;
