import { Accordion } from "@/components/ui/accordion"
import AskedQuestion from "./AskedQuestion"
import { Button } from "@/components/ui/button"
import { useAskedQuestions } from "@/hooks/askedQuestions-hooks";
import { useEffect, useState } from "react";

type FrequentlyAskedQuestionsProps = {
    onNext: () => void;
}

export default function FrequentlyAskedQuestions({
    onNext
}: FrequentlyAskedQuestionsProps) {

    const { askedQuestions, getAskedQuestions } = useAskedQuestions();
    const [storedUserRoles, setStoredUserRoles] = useState<string[]>([])

    useEffect(() => {
        const storedUserRoles = JSON.parse(localStorage.getItem("userRoles") || "[]");
        setStoredUserRoles(storedUserRoles)
    }, [])

    useEffect(() => {
        getAskedQuestions()
    }, [])

    useEffect(() => {
        console.log("Dúvidas retornadas:", askedQuestions)
    }, [askedQuestions])

    const isAdmin = storedUserRoles.includes("adminSystemUser");

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
                {isAdmin ? (
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="item-1"
                    >
                        {askedQuestions.length > 0 ? (
                            askedQuestions.map((askedQuestion) => {
                                return (
                                    <AskedQuestion
                                        key={askedQuestion.id}
                                        askedQuestion={askedQuestion}
                                    />
                                )
                            })
                        ) : (
                            <p>
                                Nenhuma dúvida registrada até o momento.
                            </p>
                        )}
                    </Accordion>
                ) : (
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        defaultValue="item-1"
                    >
                        {askedQuestions.length > 0 ? (
                            askedQuestions.map((askedQuestion) => {
                                if (askedQuestion.answer !== null) {
                                    return (
                                        <AskedQuestion
                                            key={askedQuestion.id}
                                            askedQuestion={askedQuestion}
                                        />
                                    )
                                }
                            })
                        ) : (
                            <p>
                                Nenhuma dúvida registrada até o momento.
                            </p>
                        )}
                    </Accordion>
                )}
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