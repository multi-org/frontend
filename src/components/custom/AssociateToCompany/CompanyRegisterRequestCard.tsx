import { Building2, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CompanyRegisterRequestType } from "@/types/CompanyRegisterRequest"

type companyRegisterRequestCardProps = {
    className?: string;
    // companyRegisterRequest: CompanyRegisterRequestType;
}

export default function CompanyRegisterRequestCard({
    // companyRegisterRequest: {
    //     id,
    //     companyName,
    //     companyAddress,
    //     street,
    //     complement,
    //     neighborhood,
    //     city,
    //     state,
    // },
    className,
    ...props
}: companyRegisterRequestCardProps) {

    const handleProceed = () => {
        console.log("Instituição aprovada:")
    }

    const handleReject = () => {
        console.log("Instituição rejeitada:")
    }

    return (
        <div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
            <Card className="w-full max-w-2xl mx-auto overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between max-[315px]:flex-col">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-blueDark shrink-0" />
                            <CardTitle
                                className="text-lg"
                            >
                                Solicitação de Cadastro de Instituição
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Pendente
                            </div>
                        </div>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                        <span>
                            ID: REQ-001
                            {/* ID: {id} */}
                        </span>
                        <span>•</span>
                        <span>
                            Solicitado em 15/12/2024
                        </span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Nome da Instituição */}
                    <div className="space-y-2">
                        <h3
                            className="font-semibold text-lg text-gray-900"
                        >
                            Universidade Federal de Tecnologia do Brasil
                            {/* {companyName} */}
                        </h3>
                    </div>

                    <Separator />

                    {/* Informações de Endereço */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="h-5 w-5 text-orangeLight" />
                            <span className="font-medium">Endereço</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    CEP
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    01234-567
                                    {/* {companyAddress} */}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    Rua
                                </label>
                                <p className="text-sm text-gray-900">
                                    Rua das Flores, 123
                                    {/* {street} */}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Complemento
                                </label>
                                <p className="text-sm text-gray-900">
                                    Bloco A - Campus Principal
                                    {/* {complement} */}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Bairro
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    Centro
                                    {/* {neighborhood} */}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Cidade
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    São Paulo
                                    {/* {city} */}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Estado
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    São Paulo
                                    {/* {state} */}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="grid grid-cols-2 gap-4">
                    <Button
                        onClick={handleReject}
                        variant="outline"
                        className="flex-1 text-orangeDark hover:text-orangeLight border-orangeLight bg-transparent hover:bg-orange-50"
                    >
                        Rejeitar
                    </Button>
                    <Button
                        onClick={handleProceed}
                        className="flex-1 bg-success hover:bg-successLight"
                    >
                        Prosseguir
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export { CompanyRegisterRequestCard }