"use client";
import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ArrowUp, Target } from "lucide-react";

// Add these imports at the top
import { cn, parseMarkdown } from "@/lib/utils";
import { Descendant } from "slate";
import EditorProvider from "@/providers/editor-provider";
import RichTextbox from "@/components/ui/rich-textbox";
import { Exam, Note, Profile } from "@prisma/client";

// Add this interface
interface ChatMessage {
  role: "user" | "model";
  text: string | Descendant[];
}

const GoalHelper = ({
  notes,
  profile,
  exams,
}: {
  exams: Exam[];
  notes: Note[];
  profile: Profile;
}) => {
  const [prompt, setPrompt] = useState("");
  const [, setResult] = useState<Descendant[]>();
  const [isLoading, setIsLoading] = useState(false);

  // Inside your GoalHelper component, add this state
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY as string,
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = useRef(
    model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    }),
  );

  const handleClick = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setPrompt(""); // Clear input after sending
    setResult([
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ]); // Clear previous result

    const result = await chat.current.sendMessage(
      `
    You are a goal-helper AI integrated into a note-taking app. 
    Your primary purpose is to help users set, track, and achieve their goals by organizing their notes and tasks effectively. 
    
    Here are the main areas you assist with:

    1. Goal Setting and Organization:
    Help users define clear, specific, and measurable goals.
    Provide suggestions for breaking down long-term goals into smaller, actionable tasks.
    Offer guidance on how to structure and organize goals within the app’s note system.
    
    2. Task Management:
    Assist users in creating, categorizing, and prioritizing tasks within their notes.
    Suggest timelines, deadlines, and steps needed to accomplish each task.
    Enable users to check off completed tasks and update their goal progress.
    
    3. Progress Tracking:
    Track the progress of ongoing goals and tasks.
    Display milestones and achievements as users progress.
    Offer periodic check-ins to review progress and suggest next steps.
    
    4. Motivation and Support:
    Provide motivational messages and encouragement based on the user’s progress.
    Suggest strategies to overcome obstacles or stay focused when motivation wanes.
    Offer reflective prompts, like "What went well today?" or "What can you improve?"
    
    5. Time Management & Reminders:
    Help users set realistic timelines for their tasks and goals.
    Set reminders for upcoming tasks, deadlines, or goal reviews.
    Offer time-blocking tips to help users manage their day more effectively.

    6. Review and Reflection:
    Encourage users to reflect on their completed tasks and goals, helping them learn from their experiences.
    Help users revise goals when priorities change or if they’re not making the desired progress.
    
    7. Personalized Assistance:
    Adapt your suggestions to match the user’s individual goals and preferences.
    Help users organize their notes in a way that suits their workflow (e.g., daily, weekly, or project-based organization).
    Offer customized tips for staying productive, whether the user is working on personal, professional, or academic goals.

    Always be supportive, positive, and adaptive. If a user provides unclear input, ask for clarification and suggest the next helpful action based on their context. 
    Your role is to ensure that users stay on track with their goals, feel motivated, and make efficient use of their notes to stay organized and focused. 
    
    The user will also have notes in the application, which you can use as a reference and provide more context and personalized assistance.

    Here are the notes in a Descendant[] form by the Slate JavaScript library  (this can be empty if the user has no notes yet):
    ${JSON.stringify(notes)}

    Also, here are the data of the user's exams in their notes: ${JSON.stringify(exams)}. The highest score is 5.

    Feel free to use these data as a reference to better provide the user with personalized assistance. 
    Also, you can definitely recommend other Zen's features such as Weekly Wrap, Study Deck, Progress Tracker, Pomodoro, and AI Notes, Flashcards, and Tests.

    If you're mentioning the notes, exams, or other features, you can use the following links to create hyperlinks for the user. 

    These are the relative links:
    - [Weekly Wrap](/weekly-wrap)
    - [Study Deck](/study-deck)
    - [Notes](/study-deck/[id]/notes)
    - [Exams](/study-deck/[id]/test)
    - [Flashcards](/study-deck/[id]/flashcard)
    - [AI Notes](/ai-notes)
    - [Progress Tracker](/progress-tracker)

    Note: Don't use a heading markdown in description for hyperlinks.

    Here is the user's prompt: ` + prompt,
    );

    setIsLoading(false);
    const text = result.response.text();
    const parsedMarkdownText = await parseMarkdown(text);

    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage?.role === "model") {
        return [
          ...prev.slice(0, -1),
          { role: "model", text: parsedMarkdownText },
        ];
      }
      return [...prev, { role: "model", text: parsedMarkdownText }];
    });
    setResult(parsedMarkdownText);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-fit w-full flex-col gap-4 rounded-xl p-8">
        <div className="mb-4 flex flex-col items-center justify-center gap-4 p-2 pt-0">
          <div className="flex items-center gap-1">
            <p className="text-3xl font-bold text-accent-200">Goal Helper AI</p>
            <Target className="h-8 w-8 text-accent-200" />
          </div>
          <p className="text-3xl font-semibold">
            Hi {profile.username}! How can I help you with your goal today?
          </p>
        </div>
        {/* <div className="flex flex-col gap-4 py-4">
          <p className="text-sm text-gray opacity-50">Suggested</p>
          <ul className="space-y-4 opacity-90">
            <li className="text-sm text-accent-100">
              Help me set a goal for today.
            </li>
            <li className="text-sm text-accent-100">
              I want to focus on a{" "}
              <span className="font-bold text-accent-200">goal</span> Can you
              help me break it down?
            </li>
            <li className="text-sm text-accent-100">
              Can you remind me of my goals for the month?
            </li>
            <li className="text-sm text-accent-100">
              How am I doing with my [goal]?
            </li>
            <li className="text-sm text-accent-100">
              Whats a good way to stay motivated today?
            </li>
          </ul>
        </div> */}

        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              `flex items-center gap-4`,
              message.role === "user"
                ? "w-fit max-w-[80%] flex-row-reverse self-end"
                : "w-fit flex-col",
            )}
          >
            {/* <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-200">
              {message.role === "user" ? (
                <User className="h-5 w-5 text-white" />
              ) : (
                <Bot className="h-5 w-5 text-white" />
              )}
            </div> */}
            {message.role === "model" && (
              <div className="flex w-full shrink-0 items-center justify-start gap-2 rounded-full">
                <Target className="h-8 w-8 text-accent-200" />
                <p className="font-semibold text-accent-200">Result</p>
              </div>
            )}
            <div
              className={cn(
                "flex-1 rounded-xl p-4 px-6",
                message.role === "user" ? "bg-primary/10" : "ml-4 pt-0",
              )}
            >
              <div
                className={cn(
                  "prose prose-invert flex h-full w-full max-w-none items-center",
                  message.role === "user" ? "text-right" : "text-left",
                )}
              >
                {typeof message.text === "string" ? (
                  <p>{message.text}</p>
                ) : (
                  <EditorProvider
                    contentValue={message.text}
                    changeContentValue={(parsedMarkdownText) =>
                      setMessages((prev) => {
                        const lastMessage = prev[prev.length - 1];
                        if (lastMessage?.role === "model") {
                          return [
                            ...prev.slice(0, -1),
                            { role: "model", text: parsedMarkdownText },
                          ];
                        }
                        return [
                          ...prev,
                          { role: "model", text: parsedMarkdownText },
                        ];
                      })
                    }
                  >
                    <RichTextbox className="!bg-transparent !p-0" readOnly />
                  </EditorProvider>
                )}
                {/* <p className="w-full text-right">{message.text}</p> */}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center gap-2 p-2 pt-0">
            <span className="flex items-center justify-center gap-3">
              <span className="h-3 w-3 animate-bounce rounded-full bg-accent-200 [animation-delay:-0.3s]" />
              <span className="h-3 w-3 animate-bounce rounded-full bg-accent-200 [animation-delay:-0.15s]" />
              <span className="h-3 w-3 animate-bounce rounded-full bg-accent-200" />
            </span>
          </div>
        )}
        {/* {isLoading && (
          <div className="flex items-center justify-center gap-2 p-2 pt-0">
            <p className="text-lg font-bold text-accent-200">Loading...</p>
          </div>
        )} */}
        {/* {result && (
          <div className="rounded-xl bg-primary/5 p-4">
            <div className="prose prose-invert max-w-none transition-all">
              <ReactMarkdown className={"transition-all"}>
                {result}
              </ReactMarkdown>
            </div>
          </div>
        )} */}
        <div className="duration-400 flex h-fit justify-between gap-4 rounded-[999px] border border-primary/20 bg-gradient-to-br from-primary/15 to-[#051960]/0 px-6 py-3 text-sm transition-all focus-within:border-primary/50">
          <textarea
            // type="text"
            onChange={(e) => setPrompt(e.target.value)}
            className="h-[36px] max-h-[200px] w-full resize-none border-none bg-transparent p-2 text-sm text-gray outline-none"
            value={prompt}
            placeholder="Ask anything to help with your goal..."
          />
          <button
            onClick={handleClick}
            className="rounded-full bg-gradient-1 px-2 py-2"
          >
            <ArrowUp className="h-5 w-5 text-white" />
            {/* <p className="font-bold text-accent-200">Submit</p> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalHelper;
