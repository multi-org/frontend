import { Building2, MapPin, Clock, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { CompanyType } from "@/types/Company"

type companyRegisterRequestCardProps = {
    className?: string;
    company: CompanyType;
}

export default function CompanyRegisterRequestCard({
    company: {
        id,
        popularName,
        legalName,
        description,
        cnpj,
        zipCode,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        country,
        email,
        phone,
        isMicroenterprise,
    },
    className,
    ...props
}: companyRegisterRequestCardProps) {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const handleProceed = () => {
        console.log("Instituição aprovada!")
    }

    const handleReject = () => {
        console.log("Instituição rejeitada!")
        setIsDeleteDialogOpen(true)
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
                            {/* ID: REQ-001 */}
                            ID: {id}
                        </span>
                        <span>•</span>
                        <span>
                            Solicitado em 15/12/2024
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Separator />
                    {/* Informações burocráticas */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-700">
                            <ClipboardList className="h-5 w-5 text-orangeLight" />
                            <span className="font-medium">Dados</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Nome fantasia
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* UEPB - Campus Patos */}
                                    {popularName}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Nome jurídico
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* Universidade Estadual da Paraíba - UEPB */}
                                    {legalName}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    E-mail
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* uepb@email.com */}
                                    {email}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Telefone
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* 83 9 3421-1560 */}
                                    {phone}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 text-gray-700 px-6">
                            <label
                                className="text-sm font-medium text-gray-600">
                                Descrição
                            </label>
                            <p
                                className="text-sm text-gray-900">
                                {/* Instituição voltada para o campo das ciências exatas */}
                                {description}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    CNPJ
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* 00.000.000/0000-00 */}
                                    {cnpj}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Microempresa?
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* não */}
                                    {isMicroenterprise}
                                </p>
                            </div>
                        </div>
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
                                    {/* 01234-567 */}
                                    {zipCode}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600">
                                    Rua
                                </label>
                                <p className="text-sm text-gray-900">
                                    {/* Rua das Flores, 123 */}
                                    {street}, {number}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Complemento
                                </label>
                                <p className="text-sm text-gray-900">
                                    {/* Bloco A - Campus Principal */}
                                    {complement}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Bairro
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* Centro */}
                                    {neighborhood}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Cidade
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* São Paulo */}
                                    {city}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Estado
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* São Paulo */}
                                    {state}, {country}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                        onClick={handleReject}
                        variant="outline"
                        className="flex-1 text-orangeDark hover:text-orangeLight border-orangeLight bg-transparent hover:bg-orange-50 truncate"
                    >
                        Rejeitar
                    </Button>
                    <Button
                        onClick={handleProceed}
                        className="flex-1 bg-success hover:bg-successLight truncate"
                    >
                        Prosseguir
                    </Button>
                </CardFooter>
            </Card>

            {/* Dialog para deleção! */}
            <AlertDialog open={isDeleteDialogOpen} >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza que quer rejeitar a solicitação?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ao rejeitar a solicitação, esta será deletada do sistema.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-500 text-grayLight"
                        >
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export { CompanyRegisterRequestCard }