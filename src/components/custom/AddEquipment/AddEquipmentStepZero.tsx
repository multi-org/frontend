import { useState } from "react";
import AddEquipmentStepOne, { StepOneData } from "./AddEquipmentStepOne";
import AddEquipmentStepTwo, { StepTwoData } from "./AddEquipmentStepTwo";
import { toast } from "@/hooks/use-toast";
import { CircleCheck } from "lucide-react";
import AddEquipmentStepThree from "./AddEquipmentStepThree";
import { useProducts } from "@/hooks/products-hooks";

type AddEquipmentStepZeroProps = {
    onChosenProduct: (chosenProduct: number) => void;
}

export default function AddEquipmentStepZero({ onChosenProduct }: AddEquipmentStepZeroProps) {

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
        const weeklyAvailability: Record<string, { start: string; end: string }> = {
            monday: { start: weekdayHourStart, end: weekdayHourEnd },
            tuesday: { start: weekdayHourStart, end: weekdayHourEnd },
            wednesday: { start: weekdayHourStart, end: weekdayHourEnd },
            thursday: { start: weekdayHourStart, end: weekdayHourEnd },
            friday: { start: weekdayHourStart, end: weekdayHourEnd },
        };

        if (saturdayHourStart && saturdayHourEnd) {
            weeklyAvailability.saturday = { start: saturdayHourStart, end: saturdayHourEnd };
        }

        if (sundayHourStart && sundayHourEnd) {
            weeklyAvailability.sunday = { start: sundayHourStart, end: sundayHourEnd };
        }

        const {
            brand,
            model,
            specifications,
            stock,
            ...restStepOne
        } = stepOneData;

        const equipmentDetails = {
            brand: brand,
            model: model,
            specifications: specifications,
            stock: stock,
        }

        // Criar objeto final no formato esperado
        const fullData = {
            ...restStepOne,
            ...restStepTwo, // contém: chargingModel, hourlyPrice, dailyPrice
            equipmentDetails,
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
                            Equipamento cadastrado com sucesso
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