interface TextSeparatorProps {
    text: string
    className?: string
  }
  
  export function TextSeparator({ text, className = "" }: TextSeparatorProps) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink px-4 text-gray-600">{text}</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    )
  }
  
  