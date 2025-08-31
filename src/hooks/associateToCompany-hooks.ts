import api from "@/apis/api"
import { useAssociateToCompanyStore } from "@/store/useAssociateToCompanyStore"
import { AssociateToCompanyType } from "@/types/AssociateToCompanyType"
import { LegalResponsibleUserType } from "@/types/LegalResponsibleUserType"
import { useState } from "react"

export const useAssociateToCompany = () => {
    const {
        // Associate to company
        associateToCompanyRequests,
        associationToCompany,
        createAssociateToCompanyRequest,
        createAssociationToCompany,
        setAssociateToCompanyRequests,
        deleteAssociateToCompanyRequestByCustomisedId,
        getAssociateToCompanyRequestByCustomisedId,

        // Legal Responsible User
        legalResponsibleUserRequests,
        legalResponsibleUser,
        createLegalResponsibleUserRequest,
        createLegalResponsibleUser,
        setLegalResponsibleUserRequests,
        deleteLegalResponsibleUserRequestByCustomisedId,
        getLegalResponsibleUserRequestByCustomisedId,
    } = useAssociateToCompanyStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Associate to company
    const createAssociateToCompany = async (request: {
        userCpf: string,
        document: File,
        companyId: {
            id: string,
            legalName: string,
        },
    }) => {
        setLoading(true)
        setError(null)
        try {
            const formData = new FormData()
            formData.append("userCpf", request.userCpf)
            formData.append("companyName", request.companyId.legalName)
            formData.append("document", request.document)

            const response = await api.post(
                `/users/request/associationOrLegalRepresentative/${request.companyId.id}?request=associate`,
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
            const response = await api.get<AssociateToCompanyType[]>("/users/all/associationOrLegalRepresentative/request?request=associate")
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
            legalName: string,
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
                `/users/associationOrLegalRepresentative/confirmation/${request.userId.id}/${request.companyId.id}?request=associate`,
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
                `/users/associationOrLegalRepresentative/reject/${request.userId.id}/${request.companyId.id}?request=associate`
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
            await api.delete("/users/all/associationOrLegalRepresentative/reject/:companyId")
        } catch (err) {
            const message = "Erro na tentativa de deletar todas as solicitações de associção com instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    // Legal Responsible User
    const createResponsibleUser = async (request: {
        userCpf: string,
        document: File,
        position: string,
        companyId: {
            id: string,
            legalName: string,
        },
    }) => {
        setLoading(true)
        setError(null)
        try {
            const formData = new FormData()
            formData.append("userCpf", request.userCpf)
            formData.append("companyName", request.companyId.legalName)
            formData.append("document", request.document)
            formData.append("position", request.position)

            const response = await api.post(
                `/users/request/associationOrLegalRepresentative/${request.companyId.id}?request=representative`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            console.log("Resposta recebida na criação:", response.data)
            createLegalResponsibleUserRequest(response.data)
            return response.data
        } catch (err) {
            const message = "Erro na tentativa de solicitar responsável legal para instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const getLegalResponsibleUserRequests = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get<LegalResponsibleUserType[]>("/users/all/associationOrLegalRepresentative/request?request=representative")
            setLegalResponsibleUserRequests(response.data)
        } catch (err) {
            const message = "Erro na busca por solicitações de usuário reponsável legal por instiuição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const confirmLegalResponsibleUserRequest = async (request: {
        userCpf: string,
        documentUrl: string,
        position: string,
        companyId: {
            alert: string,
            id: string,
            legalName: string,
            status: string,
        },
        userId: {
            alert: string;
            email: string;
            phoneNumber: string,
            id: string;
            name: string;
            status: string;
        };
    }) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post(
                `/users/associationOrLegalRepresentative/confirmation/${request.userId.id}/${request.companyId.id}?request=representative`,
                {
                    ...request
                })
            createLegalResponsibleUser(response.data)
            return response.data
        } catch (err) {
            const message = "Erro na confirmação de usuário responsável legal por instiuição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const deleteLegalResponsibleUserRequest = async (request: {
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
                `/users/associationOrLegalRepresentative/reject/${request.userId.id}/${request.companyId.id}?request=representative`
            )
            deleteLegalResponsibleUserRequestByCustomisedId(request.customisedId)
        } catch (err) {
            const message = "Erro na tentativa de deletar solicitação de associação com instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const deleteAllLegalResponsibleUserRequests = async () => {
        setLoading(true)
        setError(null)
        try {
            await api.delete("/users/all/associationOrLegalRepresentative/reject/:companyId")
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

        // Associate To Company
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

        // Legal Responsible User
        legalResponsibleUserRequests,
        legalResponsibleUser,
        createResponsibleUser,
        createLegalResponsibleUserRequest,
        createLegalResponsibleUser,
        setLegalResponsibleUserRequests,
        getLegalResponsibleUserRequests,
        confirmLegalResponsibleUserRequest,
        deleteLegalResponsibleUserRequest,
        deleteAllLegalResponsibleUserRequests,
        getLegalResponsibleUserRequestByCustomisedId,
    }
}