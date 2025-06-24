import { useState } from "react";
import { AddServiceStepOne } from "./AddServiceStepOne";
import { AddServiceStepTwo } from "./AddServiceStepTwo";

type AddServiceStepZeroProps = {
    onChosenProduct: (chosenProduct: number) => void;
}

export default function AddServiceStepZero({ onChosenProduct }: AddServiceStepZeroProps) {

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
                <AddServiceStepOne 
                onNext={handleNextStep} 
                onBack={() => onChosenProduct(0)}
                />
            ) : (
                <AddServiceStepTwo
                    data={data!}
                    onBack={() => setStep(1)}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    )
}

export { AddServiceStepZero }