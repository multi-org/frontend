import { Clock, ClipboardList, SquareUser, ArrowDownToLine } from "lucide-react"
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

type AssociateToCompanyCardProps = {
    className?: string;
    // associateToCompany: AssociateToCompanyType;
}

export default function AssociateToCompanyCard({
    className,
    ...props
}: AssociateToCompanyCardProps) {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const documentUrl = "link-para-pdf.com"; // substitua pela variável real

    const handleProceed = () => {
        console.log("Associação aprovada!")
    }

    const handleReject = () => {
        console.log("Associação rejeitada!")
        setIsDeleteDialogOpen(true)
    }

    return (
        <div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
            <Card className="w-full max-w-2xl mx-auto overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between max-[400px]:flex-col">
                        <div className="flex items-center gap-2">
                            <SquareUser className="h-5 w-5 text-blueDark shrink-0" />
                            <CardTitle
                                className="text-lg"
                            >
                                Solicitação de associação com instituição
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
                                    Nome
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    João Silva
                                    {/* {name} */}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    CPF
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    123.123.123-23
                                    {/* {cpf} */}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Instituição
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    Universidade Estadual da Paraíba - UEPB
                                    {/* {legalName} */}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Comprovante de vínculo
                                </label>
                                {documentUrl ? (
                                    <p
                                        className="text-sm text-gray-900">
                                        <a
                                            href={documentUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex justify-start text-sm text-blueLight underline hover:text-blueDark"
                                            download
                                        >
                                            <ArrowDownToLine className="h-5 w-5" />
                                            Baixar comprovante
                                            {/* {document} */}
                                        </a>
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-900">Não disponível</p>
                                )}
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

export { AssociateToCompanyCard }