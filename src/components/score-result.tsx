import ResultCard from "./result-card";
import StatsCard from "./stats-card";
import CircleProgress from "./circle-progress";

interface ScoreResultProps {
    score: number;
    totalQuestions: number;
    questions: {
        question: string;
        choices: string[];
        answer: string;
        selectedAnswer: string;
    }[];
}

export default function ScoreResult({ score, totalQuestions, questions }: ScoreResultProps) {
    const isPassed = score >= (totalQuestions * 0.75);

    return (
        <div className="w-full h-full">
            <div className="w-full min-h-screen flex justify-center pt-14">
                <div>
                    <ResultCard 
                        isPassed={isPassed}
                        score={score}
                        totalQuestions={totalQuestions}
                    />
                    <div className="flex items-center gap-8 mt-8">
                        <div className="w-[180px] h-[150px] rounded-[30px] flex items-center justify-center"
                            style={{
                                backgroundColor: "rgba(6, 2, 19, 0.10)",
                                boxShadow: "0px 5px 25px 0px #6A34B2 inset, 0px 72px 96px 0px #120622 inset, 0px 3px 9px 0px rgba(89, 29, 169, 0.10) inset"
                            }}>
                            <CircleProgress progress={(score / totalQuestions) * 100} />
                        </div>
                        <StatsCard 
                            value={score}
                            label="Correct"
                            isCorrect={isPassed}
                        />
                        <StatsCard 
                            value={totalQuestions - score}
                            label="Incorrect"
                        />
                    </div>
                </div>
            </div>
            <div>
                {questions.map((question, index) => (
                    <div key={index} className="w-full bg-[#0C101780] p-8 mt-8 rounded-lg">
                        <h3 className="text-2xl font-semibold">{question.question}</h3>
                        <div className="mt-4">
                            <p className="text-xl font-normal">Your Answer: {question.selectedAnswer}</p>
                            <p className="text-xl font-normal">Correct Answer: {question.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}