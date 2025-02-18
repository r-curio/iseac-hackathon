'use client'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { NotebookPen, PenLine } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'


interface Notes {
    id: string;
    title: string;
    content: string;
}

export default function Notes() {

    const pathName = usePathname();
    const id = pathName.split('/').pop();
    const [notes, setNotes] = useState<Notes>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const supabase = createClient();
                const { data: userData } = await supabase.auth.getUser();

                if (!userData.user) {
                    throw new Error('User not found');
                }

                const { data, error } = await supabase
                    .from('notes')
                    .select('*')
                    .eq('id', id)
                    .eq('user_id', userData.user.id)
                    .single();

                if (error) {
                    throw error;
                }

                setNotes(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    
    return (
        <div className="w-full px-4">
            <div className="sticky top-0 bg-black/95 backdrop-blur-sm z-10">
                <div className="flex items-center justify-between py-4 border-b border-white/20">
                    <div className="text-2xl font-semibold">
                        <Markdown>{notes?.title}</Markdown>
                    </div>
                    <div className="flex gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="inline-flex items-center justify-center px-4 py-2 gap-2
                                text-white rounded-xl bg-[radial-gradient(50%_50%_at_50%_50%,#9B77CB_0%,#591DA9_100%)] 
                                hover:opacity-90 transition-opacity duration-200">
                                <NotebookPen size={18} />
                                <span>Study Deck</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-black border-purple-600 text-white">
                                <DropdownMenuItem className="hover:bg-gradient-to-r from-[#9B77CB] to-[#591DA9] hover:text-white focus:bg-gradient-to-r focus:from-[#9B77CB] focus:to-[#591DA9] focus:text-white">
                                    Study
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gradient-to-r from-[#9B77CB] to-[#591DA9] hover:text-white focus:bg-gradient-to-r focus:from-[#9B77CB] focus:to-[#591DA9] focus:text-white">
                                    Quiz
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gradient-to-r from-[#9B77CB] to-[#591DA9] hover:text-white focus:bg-gradient-to-r focus:from-[#9B77CB] focus:to-[#591DA9] focus:text-white">
                                    Flashcards
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <button className="flex justify-center items-center p-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors duration-200">
                            <PenLine size={24} />
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-6 prose prose-invert max-w-none">
                <Markdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                        h2: ({...props}) => <h2 className="text-2xl font-semibold mt-8 mb-4" {...props} />,
                        p: ({...props}) => <p className="my-4 leading-relaxed" {...props} />,
                        ul: ({...props}) => <ul className="my-4 space-y-2" {...props} />,
                        li: ({...props}) => (
                            <li className="ml-4 pl-2 text-white" {...props}>
                                <span className="ml-2">{props.children}</span>
                            </li>
                        ),
                        strong: ({...props}) => <strong className="font-semibold" {...props} />,
                        em: ({...props}) => <em className="italic" {...props} />,
                    }}
                >
                    {notes?.content}
                </Markdown>
            </div>
        </div>
    )
}