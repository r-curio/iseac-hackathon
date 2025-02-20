'use client'
import { createContext, useContext, useEffect, useState } from "react";

const StudySessionContext = createContext({
  startSession: () => {},
  endSession: () => {},
  isStudying: false,
});

export const StudySessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [isStudying, setIsStudying] = useState(false);
    let inactivityTimer: NodeJS.Timeout;

    // Function to start the session
    const startSession = () => {
        console.log("Starting session");
        setIsStudying(true);
        localStorage.setItem("studyStartTime", Date.now().toString());
        resetInactivityTimer();
    };

    // Function to end the session and record the study time
    const endSession = async () => {
        console.log("Ending session");
        setIsStudying(false);
        clearTimeout(inactivityTimer);

        const startTime = localStorage.getItem("studyStartTime");
        if (!startTime) return;
        const duration = (Date.now() - parseInt(startTime)) / (1000 * 60 * 60); // hours

        try {
            // Make an API call instead of using Prisma directly
            const response = await fetch('/api/study-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    duration,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save study session');
            }
        } catch (error) {
            console.error('Error saving study session:', error);
        }

    };
  
    // Function to reset the inactivity timer
    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(endSession, 300000); // 5 minutes of inactivity
    };

    // Attach global event listeners for activity
    useEffect(() => {
        startSession();

        const handleActivity = () => resetInactivityTimer();
        document.addEventListener("mousemove", handleActivity);
        document.addEventListener("keydown", handleActivity);

        return () => {
            endSession();
            document.removeEventListener("mousemove", handleActivity);
            document.removeEventListener("keydown", handleActivity);
        };
    }, []);

    return (
        <StudySessionContext.Provider value={{ startSession, endSession, isStudying }}>
        {children}
        </StudySessionContext.Provider>
    );
};

// Custom hook for easy access
export const useStudySession = () => useContext(StudySessionContext);
