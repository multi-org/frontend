import { useState } from "react";
import AddEquipmentStepOne, { StepOneData } from "./AddEquipmentStepOne";
import AddEquipmentStepTwo, { StepTwoData } from "./AddEquipmentStepTwo";
import { toast } from "@/hooks/use-toast";
import { CircleCheck } from "lucide-react";
import AddEquipmentStepThree from "./AddEquipmentStepThree";

type AddEquipmentStepZeroProps = {
    onChosenProduct: (chosenProduct: number) => void;
}

export default function AddEquipmentStepZero({ onChosenProduct }: AddEquipmentStepZeroProps) {

    const [step, setStep] = useState(1);
    const [data, setData] = useState<any>(null);
    const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
    const [stepTwoData, setStepTwoData] = useState<StepTwoData | null>(null);

    const handleNextStepOne = (formStepOneData: StepOneData) => {
        setStepOneData(formStepOneData)
        setStep(2)
    }

    const handleNextStepTwo = (formStepTwoData: StepTwoData) => {
        const fullData = {
            ...stepOneData!,
            ...formStepTwoData,
        };
        setStepTwoData(formStepTwoData)
        setData(fullData);
        setStep(3)
    }

    const handleConfirm = () => {
        const fullData = {
            ...stepOneData!,
            ...stepTwoData!,
        };
        if (!fullData) return
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
        onChosenProduct(0)
    }

    return (
        <div>
            {step === 1 && (
                <AddEquipmentStepOne
                    onNext={handleNextStepOne}
                    onBack={() => onChosenProduct(0)}
                />
            )}
            {step === 2 && (
                <AddEquipmentStepTwo
                    onNext={handleNextStepTwo}
                    onBack={() => setStep(1)}
                />
            )}
            {step === 3 && (
                <AddEquipmentStepThree
                    data={data}
                    onConfirm={handleConfirm}
                    onBack={() => setStep(2)}
                />
            )}
        </div>
    )
}

export { AddEquipmentStepZero }