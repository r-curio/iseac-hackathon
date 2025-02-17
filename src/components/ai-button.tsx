import { cn } from "@/lib/utils"
import { JSX } from "react"
import { Sparkles } from "lucide-react"

export function AIButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
    return (
        <button
        className={cn(
            "inline-flex items-center justify-center px-10 py-2 gap-2 text-md font-medium text-white rounded-2xl",
            "bg-[radial-gradient(50%_50%_at_50%_50%,#9B77CB_0%,#591DA9_100%)] hover:opacity-90 transition-opacity",
            className
        )}
        {...props}
        >
            {props.children}
            <Sparkles size={20} />
        </button>
    )
}

AIButton.displayName = "AIButton"

export default AIButton