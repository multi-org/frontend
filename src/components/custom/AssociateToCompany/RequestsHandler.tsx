import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import CompanyRegisterRequestCard from "./CompanyRegisterRequestCard";
import CompanyRegisterForm from "./CompanyRegisterForm";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import AssociateToCompanyCard from "./AssociateToCompanyCard";
import LegalResponsibleUserRequestCard from "./LegalResponsibleUserRequestCard";
import { useCompanies } from "@/hooks/companies-hooks";
import { useAssociateToCompany } from "@/hooks/associateToCompany-hooks";

type requestsHandlerProps = {
    className?: string;
}

export default function RequestsHandler({
    className,
    ...props
}: requestsHandlerProps) {

    const [companyRegisterStep, setCompanyRegisterStep] = useState(0)
    const {
        companyRegisterRequests,
        getCompanyRegisterRequests,
    } = useCompanies()
    const {
        associateToCompanyRequests,
        legalResponsibleUserRequests,
        getAssociateToCompanyRequests,
        getLegalResponsibleUserRequests,
    } = useAssociateToCompany()

    useEffect(() => {
        getCompanyRegisterRequests()
        getAssociateToCompanyRequests()
        getLegalResponsibleUserRequests()
    }, [])

    return (
        <>
            <header>
                <div className="flex flex-col items-center justify-center py-6">
                    <h1 className="text-3xl text-center font-bold">
                        Solicitações em pendência
                    </h1>
                </div>
            </header>
            <div className={cn("flex flex-col gap-6 p-6", className)} {...props}>
                <Tabs defaultValue="associate">
                    <div className="flex justify-center max-[620px]:flex-col">
                        <TabsList
                            className="bg-orange-100 text-orangeLight max-[880px]:flex-col truncate h-full"
                        >
                            <TabsTrigger value="associate">Associações</TabsTrigger>
                            <TabsTrigger
                                value="companyRegiter"
                            >
                                Cadastro de institução
                            </TabsTrigger>
                            <TabsTrigger
                                value="legalResponsibleUser"
                            >
                                Cadastro de responsáveis legais
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="associate">
                        {associateToCompanyRequests.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                {associateToCompanyRequests.map((associateToCompanyRequest) => {
                                    return (
                                        <AssociateToCompanyCard
                                            key={associateToCompanyRequest.customisedId}
                                            associateToCompanyRequest={associateToCompanyRequest}
                                        />
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="flex justify-center w-full text-center py-4">
                                <p>
                                    Nenhuma solicitação de associação com instituição no momemnto
                                </p>
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="companyRegiter">
                        {companyRegisterStep === 0 && (
                            <>
                                <div className="flex justify-end max-[640px]:justify-center px-6 pt-4">
                                    <Button
                                        className="text-orangeDark hover:text-grayLight border-orangeLight hover:bg-yellowDark truncate"
                                        variant={"outline"}
                                        onClick={() => setCompanyRegisterStep(1)}
                                    >
                                        <SquarePen />
                                        Cadastrar instituição
                                    </Button>
                                </div>
                                {companyRegisterRequests.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2">
                                        {companyRegisterRequests.map((companyRegisterRequest) => {
                                            // const uniqueKey = `${request.cnpj}-${request.email}`;
                                            return (
                                                <CompanyRegisterRequestCard
                                                    key={companyRegisterRequest.customisedId}
                                                    company={companyRegisterRequest}
                                                />
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex justify-center w-full text-center py-4">
                                        <p>
                                            Nenhuma solicitação cadastro de instituição no momemnto
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                        {companyRegisterStep === 1 && (
                            <CompanyRegisterForm
                                onBack={() => setCompanyRegisterStep(0)}
                            />
                        )}
                    </TabsContent>
                    <TabsContent value="legalResponsibleUser">
                        {legalResponsibleUserRequests.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                {legalResponsibleUserRequests.map((legalResponsibleUserRequest) => {
                                    return (
                                        <LegalResponsibleUserRequestCard
                                            key={legalResponsibleUserRequest.customisedId}
                                            legalResponsibleUserRequest={legalResponsibleUserRequest}
                                        />
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="flex justify-center w-full text-center py-4">
                                <p>
                                    Nenhuma solicitação de responsável legal por instituição no momemnto
                                </p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export { RequestsHandler }