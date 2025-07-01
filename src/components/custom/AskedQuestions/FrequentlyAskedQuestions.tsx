import { Accordion } from "@/components/ui/accordion"
import AskedQuestion from "./AskedQuestion"
import { Button } from "@/components/ui/button"

type FrequentlyAskedQuestionsProps = {
    onNext: () => void;
}

export default function FrequentlyAskedQuestions({
    onNext
}: FrequentlyAskedQuestionsProps) {
    return (
        <>
            <header>
                <div className="flex flex-col items-center justify-center text-center py-6">
                    <h1 className="text-3xl font-bold">
                        Perguntas frequentes
                    </h1>
                    <span className="font-medium text-center">
                        Verifique nossas perguntas frequentes e veja se alguma de nossas respostas pode te ajudar. Caso nenhuma de nossas respostas te ajude, deixe sua dúvida em nosso formulário de contato que responderemos o quanto antes.
                    </span>
                </div>
            </header>
            <div className="m-16 p-8 bg-gray-100 rounded-lg">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                >
                    <AskedQuestion />
                </Accordion>
            </div>
            <div className="text-center text-sm">
                Nenhuma das nossas respostas te ajudou? Deixe{" "}
                <Button
                    type="button"
                    className="p-0 text-blueDark hover:text-yellowDark"
                    variant="link"
                    onClick={onNext}
                >
                    aqui
                </Button>
                {" "}sua dúvida.
            </div>
        </>
    )
}

export { FrequentlyAskedQuestions }