import api from "@/apis/api"
import { useAssociateToCompanyStore } from "@/store/useAssociateToCompanyStore"
import { AssociateToCompanyType } from "@/types/AssociateToCompanyType"
import { useState } from "react"

export const useAssociateToCompany = () => {
    const {
        associateToCompanyRequests,
        associationToCompany,
        createAssociateToCompanyRequest,
        createAssociationToCompany,
        setAssociateToCompanyRequests,
        deleteAssociateToCompanyRequestByCustomisedId,
        getAssociateToCompanyRequestByCustomisedId,
    } = useAssociateToCompanyStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createAssociateToCompany = async (request: {
        userCpf: string,
        document: File,
        companyId: {
            id: string,
            name: string,
        },
    }) => {
        setLoading(true)
        setError(null)
        try {
            const formData = new FormData()
            formData.append("userCpf", request.userCpf)
            formData.append("companyName", request.companyId.name)
            formData.append("document", request.document)

            const response = await api.post(
                `/users/request/association/${request.companyId.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            console.log("Resposta recebida na criação:", response.data)
            createAssociateToCompanyRequest(response.data)
            return response.data
        } catch (err) {
            const message = "Erro na tentativa de solicitar associação com instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const getAssociateToCompanyRequests = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get<AssociateToCompanyType[]>("/users/all/associations/request")
            setAssociateToCompanyRequests(response.data)
        } catch (err) {
            const message = "Erro na busca por solicitações de associação com instiuição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const confirmAssociateToCompanyRequest = async (request: {
        userCpf: string,
        documentUrl: string,
        companyId: {
            alert: string,
            id: string,
            name: string,
            status: string,
        },
        userId: {
            alert: string;
            email: string;
            id: string;
            name: string;
            status: string;
        };
    }) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post(
                `/users/association/confirmation/${request.userId.id}/${request.companyId.id}`,
                {
                    ...request
                })
            createAssociationToCompany(response.data)
            return response.data
        } catch (err) {
            const message = "Erro na confirmação de associação com instiuição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const deleteAssociateToCompanyRequest = async (request: {
        customisedId: string,
        companyId: {
            id: string,
        },
        userId: {
            id: string;
        };
    }) => {
        setLoading(true)
        setError(null)
        try {
            await api.delete(
                `/users/association/reject/${request.userId.id}/${request.companyId.id}`
            )
            deleteAssociateToCompanyRequestByCustomisedId(request.customisedId)
        } catch (err) {
            const message = "Erro na tentativa de deletar solicitação de associação com instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const deleteAllAssociateToCompanyRequests = async () => {
        setLoading(true)
        setError(null)
        try {
            await api.delete("/users/all/association/reject")
        } catch (err) {
            const message = "Erro na tentativa de deletar todas as solicitações de associção com instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        associationToCompany,
        associateToCompanyRequests,
        createAssociateToCompanyRequest,
        createAssociationToCompany,
        setAssociateToCompanyRequests,
        createAssociateToCompany,
        getAssociateToCompanyRequests,
        confirmAssociateToCompanyRequest,
        deleteAssociateToCompanyRequest,
        deleteAllAssociateToCompanyRequests,
        getAssociateToCompanyRequestByCustomisedId,
    }
}