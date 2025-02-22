'use client'
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "../ui/label"
import Markdown from "react-markdown"
import { useRouter } from "next/navigation"

interface CreateTestProps {
    id: string;
    title: string;
}

interface TestOptions {
    trueOrFalse: boolean;
    multipleChoice: boolean;
    identification: boolean;
}

export default function CreateTest({id, title}: CreateTestProps) {
    const [options, setOptions] = useState<TestOptions>({
        trueOrFalse: false,
        multipleChoice: false,
        identification: false
    });
    const router = useRouter();

    const handleOptionChange = (option: keyof TestOptions) => {
        setOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    const handleStartTest = async () => {
        const selectedOptions = Object.entries(options)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value)
            .map(([key]) => key);
            
        const response = await fetch('/api/test', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                selectedTypes: selectedOptions
            })
        })

        const data = await response.json();

        if (data.questions) {
            // Store questions in localStorage before navigation
            localStorage.setItem('testQuestions', JSON.stringify(data.questions));
            router.push(`/study-deck/${id}/test`);
        }
        
    };

    return (
        <Dialog>
            <DialogTrigger>
                <h1>Create Test</h1>
            </DialogTrigger>
            <DialogContent className="max-w-[600px]">
                <DialogTitle className="hidden">Create Test</DialogTitle>
                <div className="bg-[#00020ACC]/80 px-20 py-16 rounded-[40px]"
                    style={{
                        boxShadow: '0px 0px 20px 2px rgba(89, 29, 169, 0.50)'
                    }}
                >
                    <h3 className="text-lg font-[500]"><Markdown>{title}</Markdown></h3>
                    <h1 className="text-[35px] font-bold">Set up your test</h1>
                    <div className="mt-10 space-y-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="trueFalse" className="text-xl font-normal">True/False</Label>
                            <Switch 
                                id="trueFalse" 
                                checked={options.trueOrFalse}
                                onCheckedChange={() => handleOptionChange('trueOrFalse')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="multipleChoice" className="text-xl font-normal">Multiple Choice</Label>
                            <Switch 
                                id="multipleChoice"
                                checked={options.multipleChoice}
                                onCheckedChange={() => handleOptionChange('multipleChoice')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="identification" className="text-xl font-normal">Identification</Label>
                            <Switch 
                                id="identification"
                                checked={options.identification}
                                onCheckedChange={() => handleOptionChange('identification')}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-10"> 
                        <button 
                            onClick={handleStartTest}
                            disabled={!Object.values(options).some(Boolean)}
                            className="inline-flex min-w-fit items-center justify-center gap-2 rounded-xl bg-[radial-gradient(50%_50%_at_50%_50%,#9B77CB_0%,#591DA9_100%)] px-20 py-2 text-white transition-opacity duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="text-lg">Start Test</span>
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}