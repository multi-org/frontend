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
import LegalResponsibleUserForm from "./LegalResponsibleUserForm";
import AssociateToCompanyCard from "./AssociateToCompanyCard";
import LegalResponsibleUserRequestCard from "./LegalResponsibleUserRequestCard";
import { useCompanies } from "@/hooks/companies-hooks";

type requestsHandlerProps = {
    className?: string;
}

export default function RequestsHandler({
    className,
    ...props
}: requestsHandlerProps) {

    const [companyRegisterStep, setCompanyRegisterStep] = useState(0)
    const { companyRegisterRequests, getCompanyRegisterRequests } = useCompanies()

    useEffect(() => {
        getCompanyRegisterRequests()
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
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <AssociateToCompanyCard />
                            <AssociateToCompanyCard />
                        </div>
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
                                        {companyRegisterRequests.map((request) => {
                                            const uniqueKey = `${request.cnpj}-${request.email}`;
                                            return (
                                                <CompanyRegisterRequestCard
                                                    key={uniqueKey}
                                                    company={request}
                                                />
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex justify-center w-full text-center py-4">
                                        <p>
                                            Nenhuma solicitação no momemnto
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                        {companyRegisterStep === 1 && (
                            <CompanyRegisterForm
                                onBack={() => setCompanyRegisterStep(0)}
                                onNext={() => setCompanyRegisterStep(2)}
                            />
                        )}
                        {companyRegisterStep === 2 && (
                            <LegalResponsibleUserForm
                                onBack={() => setCompanyRegisterStep(0)}
                            />
                        )}
                    </TabsContent>
                    <TabsContent value="legalResponsibleUser">
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <LegalResponsibleUserRequestCard />
                            <LegalResponsibleUserRequestCard />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export { RequestsHandler }