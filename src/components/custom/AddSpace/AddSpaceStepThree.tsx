import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import { SummaryItem } from "../SummaryItem";

type AddSpaceStepThreeProps = {
    data: {
        title: string;
        description: string;
        capacity: number;
        area: number;
        category: string;
        image: File[];
        chargingModel: string;
        pricePerHour?: number;
        pricePerDay?: number;
        weekdayHourStart: string;
        weekdayHourEnd: string;
        saturdayHourStart?: string;
        saturdayHourEnd?: string;
        sundayHourStart?: string;
        sundayHourEnd?: string;
    };
    onBack: () => void;
    onConfirm: () => void;
};

export default function AddSpaceStepThree({
    data,
    onBack,
    onConfirm
}: AddSpaceStepThreeProps) {

    if (!data) {
        return <p>Dados não disponíveis.</p>;
    }

    return (
        <>
            {/* ETAPA 3: resumo dos dados */}
            <Card className="bg-orangeDark text-grayLight m-6">
                <CardContent className="flex flex-col gap-6 p-6 md:p-8">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Confirme as informações</h1>
                        <p className="text-balance">Revise os dados antes de confirmar o cadastro.</p>
                        <p className="text-balance font-semibold">Etapa 3/3</p>
                    </div>

                    <div className="grid gap-4 text-grayLight">
                        <SummaryItem label="Título" value={data.title} />
                        <SummaryItem label="Descrição" value={data.description} />
                        <SummaryItem label="Capacidade" value={`${data.capacity} pessoas`} />
                        <SummaryItem label="Área (m²)" value={`${data.area} m²`} />
                        <SummaryItem label="Categoria" value={data.category} />

                        {data.chargingModel === "por_hora" || data.chargingModel === "ambos" ? (
                            <SummaryItem
                                label="Preço por hora"
                                value={`R$ ${data.pricePerHour?.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}`} />
                        ) : null}

                        {data.chargingModel === "por_dia" || data.chargingModel === "ambos" ? (
                            <SummaryItem
                                label="Preço por dia"
                                value={`R$ ${data.pricePerDay?.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}`} />
                        ) : null}

                        <div className="flex flex-col gap-4">
                            {data.weekdayHourStart && data.weekdayHourEnd && (
                                <SummaryItem label="Seg à Sex" value={`${data.weekdayHourStart} às ${data.weekdayHourEnd}`} />
                            )}
                            {data.saturdayHourStart && data.saturdayHourEnd && (
                                <SummaryItem label="Sábado" value={`${data.saturdayHourStart} às ${data.saturdayHourEnd}`} />
                            )}
                            {data.sundayHourStart && data.sundayHourEnd && (
                                <SummaryItem label="Domingo" value={`${data.sundayHourStart} às ${data.sundayHourEnd}`} />
                            )}
                        </div>

                        <SummaryItem label="Imagens" value={`${data.image.length} selecionada(s)`} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onBack}
                            className="w-full text-orangeDark hover:text-orangeLight"
                        >
                            Voltar
                        </Button>
                        <Button
                            type="button"
                            onClick={onConfirm}
                            className="w-full bg-success hover:bg-successLight"
                        >
                            Confirmar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export { AddSpaceStepThree }