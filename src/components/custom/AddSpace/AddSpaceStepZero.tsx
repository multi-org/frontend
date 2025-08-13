import { useState } from "react";
import { AddSpaceStepOne, StepOneData } from "./AddSpaceStepOne";
import { AddSpaceStepTwo, StepTwoData } from "./AddSpaceStepTwo";
import { toast } from "@/hooks/use-toast";
import { CircleCheck } from "lucide-react";
import AddSpaceStepThree from "./AddSpaceStepThree";
import { useProducts } from "@/hooks/products-hooks";

type AddSpaceStepZeroProps = {
    onChosenProduct: (chosenProduct: number) => void;
}

export default function AddSpaceStepZero({ onChosenProduct }: AddSpaceStepZeroProps) {

    const { createProduct, error } = useProducts()
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

    const handleConfirm = async () => {
        if (!stepOneData || !stepTwoData) return;

        // Extrair horários
        const {
            weekdayHourStart,
            weekdayHourEnd,
            saturdayHourStart,
            saturdayHourEnd,
            sundayHourStart,
            sundayHourEnd,
            ...restStepTwo
        } = stepTwoData;

        // Montar disponibilidade semanal no formato esperado
        const weeklyAvailability = {
            monday: { start: weekdayHourStart, end: weekdayHourEnd },
            tuesday: { start: weekdayHourStart, end: weekdayHourEnd },
            wednesday: { start: weekdayHourStart, end: weekdayHourEnd },
            thursday: { start: weekdayHourStart, end: weekdayHourEnd },
            friday: { start: weekdayHourStart, end: weekdayHourEnd },
            saturday: { start: saturdayHourStart ?? "", end: saturdayHourEnd ?? "" },
            sunday: { start: sundayHourStart ?? "", end: sundayHourEnd ?? "" },
        };

        const {
            capacity,
            area,
            ...restStepOne
        } = stepOneData;

        const spaceDetails = {
            capacity: capacity,
            area: area,
        }

        // Criar objeto final no formato esperado
        const fullData = {
            ...restStepOne,
            ...restStepTwo, // contém: chargingModel, hourlyPrice, dailyPrice
            spaceDetails,
            hourlyPrice: restStepTwo.hourlyPrice ?? 0,
            dailyPrice: restStepTwo.dailyPrice ?? 0,
            weeklyAvailability,
            images: stepOneData?.images as File[], // garante que image é do tipo File
        };

        console.log("Dados enviados:", fullData);

        try {
            const result = await createProduct(fullData);

            if (result) {
                toast({
                    description: (
                        <div className="flex items-center gap-2">
                            <CircleCheck className="text-white" size={20} />
                            Espaço cadastrado com sucesso
                        </div>
                    ),
                    variant: 'default',
                    style: {
                        backgroundColor: "#4E995E",
                        color: "#FFFFFF",
                    },
                });
                setData(null);
                onChosenProduct(0);
            }
        } catch {
            toast({
                title: `${error}`,
                variant: 'destructive',
            });
        }
    };

    return (
        <div>
            {step === 1 && (
                <AddSpaceStepOne
                    onNext={handleNextStepOne}
                    onBack={() => onChosenProduct(0)}
                />
            )}
            {step === 2 && (
                <AddSpaceStepTwo
                    onNext={handleNextStepTwo}
                    onBack={() => setStep(1)}
                />
            )}
            {step === 3 && (
                <AddSpaceStepThree
                    data={data!}
                    onBack={() => setStep(2)}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    )
}

export { AddSpaceStepZero }