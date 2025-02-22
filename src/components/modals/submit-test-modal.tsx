'use client'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

interface SubmitModalProps {
    handleSubmit: () => void;
}


export default function SubmitModal({ handleSubmit }: SubmitModalProps) {

    return (
        <Dialog>
            <DialogTrigger className="flex items-center justify-center px-7 py-2 border-[#CB98ED] rounded-xl border">
                Submit
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
                <DialogTitle className="hidden">Submit Test</DialogTitle>
                <div className="min-w-4/5 bg-secondary-900 px-14 pt-20 pb-10 rounded-3xl space-y-8" 
                    style={{boxShadow: "0px 0px 20px 2px rgba(89, 29, 169, 0.50)"}}
                >
                    <p className="text-gray-800 text-lg">Are you sure you want to submit the test?</p>
                    <div className="flex justify-end gap-4 mt-8">
                        <DialogClose asChild>
                            <button className="flex py-[12px] px-4 border border-white rounded-xl hover:bg-[#591DA9]/30 transition-opacity">
                                Cancel
                            </button>
                        </DialogClose>
                        <DialogClose asChild>
                            <button
                                onClick={handleSubmit} 
                                className="bg-[radial-gradient(50%_50%_at_50%_50%,#9B77CB_0%,#591DA9_100%)] hover:opacity-90 transition-opacity flex py-[10px] px-4 rounded-xl"
                                style={{boxShadow: "0px 2px 1px 0px rgba(255, 255, 255, 0.25) inset, 0px -4px 2px 0px rgba(0, 0, 0, 0.25) inset, 0px 0px 1px 4px rgba(255, 255, 255, 0.10)"}}
                            >
                                Submit
                            </button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}