import { useState } from "react";
import { AddSpaceStepOne } from "./AddSpaceStepOne";
import { AddSpaceStepTwo } from "./AddSpaceStepTwo";
import { toast } from "@/hooks/use-toast";
import { CircleCheck } from "lucide-react";

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
        toast({
            description: (
                <div className="flex items-center gap-2">
                    <CircleCheck className="text-white" size={20} />
                    Cadastro de equipamento realizado com sucesso
                </div>
            ),
            variant: 'default',
            style: {
                backgroundColor: "#4E995E",
                color: "#FFFFFF",
            },
        })
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