import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import { SummaryItem } from "../SummaryItem";

type AddServiceStepTwoProps = {
    data: {
        title: string;
        description: string;
        category: string;
        price: number;
        image: File[];
        day: string[];
        hour: string[];
    };
    onBack: () => void;
    onConfirm: () => void;
};

export default function AddServiceStepTwo({
    data,
    onBack,
    onConfirm
}: AddServiceStepTwoProps) {
    return (
        <>
            {/* ETAPA 2: resumo dos dados */}
            <Card className="bg-blueDark text-grayLight m-6">
                <CardContent className="flex flex-col gap-6 p-6 md:p-8">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Confirme as informações</h1>
                        <p className="text-balance">Revise os dados antes de confirmar o cadastro.</p>
                        <p className="text-balance font-semibold">Etapa 2/2</p>
                    </div>

                    <div className="grid gap-4 text-grayLight">
                        <SummaryItem label="Título" value={data.title} />
                        <SummaryItem label="Descrição" value={data.description} />
                        <SummaryItem label="Categoria" value={data.category} />
                        <SummaryItem label="Preço" value={`R$ ${data.price}`} />
                        <SummaryItem label="Dias disponíveis" value={data.day.join(", ")} />
                        <SummaryItem label="Horários disponíveis" value={data.hour.join(", ")} />
                        <SummaryItem label="Imagens" value={`${data.image.length} selecionada(s)`} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onBack}
                            className="w-full text-blueDark hover:text-blueLight"
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

export { AddServiceStepTwo }