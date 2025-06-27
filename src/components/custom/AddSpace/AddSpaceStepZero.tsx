import { useState } from "react";
import { AddSpaceStepOne } from "./AddSpaceStepOne";
import { AddSpaceStepTwo } from "./AddSpaceStepTwo";

type AddSpaceStepZeroProps = {
    onChosenProduct: (chosenProduct: number) => void;
}

export default function AddSpaceStepZero({ onChosenProduct }: AddSpaceStepZeroProps) {

    const [step, setStep] = useState(1);
    const [data, setData] = useState<any>(null);

    const handleNextStep = (formData: any) => {
        setData(formData)
        setStep(2)
    }

    const handleConfirm = () => {
        if (!data) return
        // Enviar os dados para o backend aqui
        console.log("Dados enviados:", data)
        setData(null)
        setStep(1)
    }

    return (
        <div>
            {step === 1 ? (
                <AddSpaceStepOne 
                onNext={handleNextStep} 
                onBack={() => onChosenProduct(0)}
                />
            ) : (
                <AddSpaceStepTwo
                    data={data!}
                    onBack={() => setStep(1)}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    )
}

export { AddSpaceStepZero }