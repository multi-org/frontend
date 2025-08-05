import {
    Clock,
    ClipboardList,
    UserCog,
    ArrowDownToLine,
    CircleX,
    CircleCheck,
    Loader
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
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
import { LegalResponsibleUserType } from "@/types/LegalResponsibleUserType"
import { toast } from "@/hooks/use-toast"
import { useAssociateToCompany } from "@/hooks/associateToCompany-hooks"

type LegalResponsibleUserRequestCardProps = {
    className?: string;
    legalResponsibleUserRequest: LegalResponsibleUserType;
}

export default function LegalResponsibleUserRequestCard({
    legalResponsibleUserRequest,
    className,
    ...props
}: LegalResponsibleUserRequestCardProps) {

    const {
        loading,
        confirmLegalResponsibleUserRequest,
        deleteLegalResponsibleUserRequest,
        getLegalResponsibleUserRequestByCustomisedId,
    } = useAssociateToCompany()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const documentUrl = legalResponsibleUserRequest.documentUrl;

    legalResponsibleUserRequest.customisedId = `${legalResponsibleUserRequest?.userId?.id ?? ""}-${legalResponsibleUserRequest?.companyId?.id ?? ""}`;

    console.log("Dados recebidos no LegalResponsibleUserRequestCard:", legalResponsibleUserRequest) //teste temporário

    const handleProceed = async () => {
        const {
            requiredAt,
            ...legalResponsibleUserRequestData
        } = legalResponsibleUserRequest
        try {
            const result = await confirmLegalResponsibleUserRequest(legalResponsibleUserRequestData)
            if (result) {
                console.log("Solicitação de usuário responsável legal por instituição aprovada!")
                console.log("Dados enviados:", legalResponsibleUserRequestData) //teste temporário
                toast({
                    description: (
                        <div className="flex items-center gap-2">
                            <CircleCheck className="text-white" size={20} />
                            Usuário responsável legal cadastrado com sucesso
                        </div>
                    ),
                    variant: 'default',
                    style: {
                        backgroundColor: "#4E995E",
                        color: "#FFFFFF",
                    },
                })
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado";
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleX className="text-white" size={20} />
                        {message}
                    </div>
                ),
                variant: 'destructive'
            })
        }
    }

    const handleReject = async () => {
        const {
            requiredAt,
            userCpf,
            documentUrl,
            ...legalResponsibleUserRequestData
        } = legalResponsibleUserRequest
        try {
            await deleteLegalResponsibleUserRequest(legalResponsibleUserRequestData)
            const result = getLegalResponsibleUserRequestByCustomisedId(legalResponsibleUserRequest.customisedId)
            if (!result) {
                console.log("Solicitação de responsável legal por instituição deletada com sucesso!")
                toast({
                    description: (
                        <div className="flex items-center gap-2">
                            <CircleCheck className="text-white" size={20} />
                            Solicitação de responsável legal por instituição deletada com sucesso
                        </div>
                    ),
                    variant: 'default',
                    style: {
                        backgroundColor: "#4E995E",
                        color: "#FFFFFF",
                    },
                })
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado";
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleX className="text-white" size={20} />
                        {message}
                    </div>
                ),
                variant: 'destructive'
            })
        }
    }

    return (
        <div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
            <Card className="w-full max-w-2xl mx-auto overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between max-[400px]:flex-col">
                        <div className="flex items-center gap-2">
                            <UserCog className="h-5 w-5 text-blueDark shrink-0" />
                            <CardTitle
                                className="text-lg"
                            >
                                Solicitação de usuário responsável legal por instituição
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-orangeLight">
                                <Clock className="h-3 w-3" />
                                Pendente
                            </div>
                        </div>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                        <span>
                            Solicitado em {legalResponsibleUserRequest.requiredAt}
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
                                    {/* João Silva */}
                                    {legalResponsibleUserRequest?.userId?.name ?? "...Carregando"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    CPF
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* 123.123.123-23 */}
                                    {legalResponsibleUserRequest.userCpf}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Email
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* joao@silva.com */}
                                    {legalResponsibleUserRequest?.userId?.email ?? "...Carregando"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Telefone
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* (83) 99876-7654 */}
                                    {legalResponsibleUserRequest?.userId?.phone ?? "...Carregando"}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-2 text-gray-700 px-6">
                            <label
                                className="text-sm font-medium text-gray-600">
                                Instituição
                            </label>
                            <p
                                className="text-sm text-gray-900">
                                {/* Universidade Estadual da Paraíba - UEPB */}
                                {legalResponsibleUserRequest?.companyId?.name ?? "...Carregando"}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                            <div className="space-y-1">
                                <label
                                    className="text-sm font-medium text-gray-600">
                                    Cargo
                                </label>
                                <p
                                    className="text-sm text-gray-900">
                                    {/* Assistente administrativo */}
                                    {legalResponsibleUserRequest.position}
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
                        onClick={() => { setIsDeleteDialogOpen(true) }}
                        variant="outline"
                        className="flex-1 text-orangeDark hover:text-orangeLight border-orangeLight hover:bg-orange-50 truncate"
                    >
                        Rejeitar
                    </Button>
                    <Button
                        onClick={handleProceed}
                        className="flex-1 bg-success hover:bg-successLight truncate"
                    >
                        {loading
                            ? <Loader className="animate-spin" />
                            : "Prosseguir"
                        }
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
                            onClick={handleReject}
                            className="bg-red-600 hover:bg-red-500 text-grayLight"
                        >
                            {loading
                                ? <Loader className="animate-spin" />
                                : "Confirmar"
                            }
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export { LegalResponsibleUserRequestCard }