'use client'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react";
import { Textarea } from "../ui/modified-textarea";

export default function Flashcardmodal() {

    return (
        <Dialog>
            <DialogTrigger  >
                <div className="flex py-[16px] px-6 gap-2 border border-white rounded-xl hover:bg-[#591DA9]/30 transition-opacity">
                    <Plus size={24} />
                    <p className="text-lg font-normal">Add Deck</p>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] lg:min-w-[1000px]">
                    <DialogTitle className="hidden">Add Deck</DialogTitle>
                    <div className="min-w-4/5 bg-secondary-900 px-14 pt-20 pb-10 rounded-3xl space-y-8" 
                    style={{boxShadow: "0px 0px 20px 2px rgba(89, 29, 169, 0.50)"}}>
                        <h1 className="text-5xl font-bold">Add Card</h1>
                        <div className=" px-[40px] border border-white rounded-2xl">
                            <input 
                                type="text" 
                                placeholder="Enter Term" 
                                className="bg-transparent text-white resize-none text-2xl font-normal w-full py-4 border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none whitespace-pre-wrap break-words placeholder:text-[#C0B4D0]"
                            />                                
                        </div>
                        <div className=" px-[40px] border border-white rounded-2xl min-h-[140px]">
                            <Textarea
                                placeholder="Enter Definition" 
                                className="bg-transparent text-white resize-none text-2xl font-normal w-full py-4 border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none whitespace-pre-wrap break-words placeholder:text-[#C0B4D0]"
                            />                                
                        </div>
                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <button className="flex py-[16px] px-6 border border-white rounded-xl hover:bg-[#591DA9]/30 transition-opacity">
                                    <p>Cancel</p>
                                </button>
                            </DialogClose>
                            <button className="bg-[radial-gradient(50%_50%_at_50%_50%,#9B77CB_0%,#591DA9_100%)] hover:opacity-90 transition-opacity flex py-[16px] px-6 rounded-xl"
                            style={{boxShadow: "0px 2px 1px 0px rgba(255, 255, 255, 0.25) inset, 0px -4px 2px 0px rgba(0, 0, 0, 0.25) inset, 0px 0px 1px 4px rgba(255, 255, 255, 0.10)"}}>
                                <p>Add Card</p>
                            </button>
                        </div>
                    </div>
            </DialogContent>
        </Dialog>
    )
}