import { useState } from "react";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import AddAskedQuestion from "./AddAskedQuestion";

export default function AskedQuestionsHandler() {

    const [step, setStep] = useState(1);

    return (
        <div>
            {step === 1 ? (
                <FrequentlyAskedQuestions
                    onNext={() => { setStep(2) }}
                />
            ) : (
                <AddAskedQuestion
                    onBack={() => setStep(1)}
                />
            )}
        </div>
    )
}

export { AskedQuestionsHandler }