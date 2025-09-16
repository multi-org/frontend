import api from "@/apis/api"
import { useLegalResponsibleUserStore } from "@/store/useLegalResponsibleUserStore"
import { LegalResponsibleUserType } from "@/types/LegalResponsibleUserType"
import { useState } from "react"

export const useLegalResponsibleUser = () => {
    const {
        legalResponsibleUserRequests,
        create,
        setLegalResponsibleUserRequests,
    } = useLegalResponsibleUserStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createLegalResponsibleUserRequest = async (request: {
        name: string,
        userCpf: string,
        email: string,
        phoneNumber: string,
        companyName: string,
        companyId: string,
        position: string,
        document: File,
    }) => {
        setLoading(true)
        setError(null)
        try {
            // const response = await api.post(`/users/rota`, {
            //     ...request
            // })
            const formData = new FormData()
            formData.append("name", request.name)
            formData.append("userCpf", request.userCpf)
            formData.append("phoneNumber", request.phoneNumber)
            formData.append("email", request.email)
            formData.append("companyName", request.companyName)
            formData.append("position", request.position)
            formData.append("raw", request.document)

            const response = await api.post(
                `/users/uma-rota-aí`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            create(response.data)
            return response.data
        } catch (err) {
            setError("Erro na tentativa de solicitar usuário responsável legal")
            throw error
        } finally {
            setLoading(false)
        }
    }

    const getLegalResponsibleUserRequest = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get<LegalResponsibleUserType[]>("/users/rota")
            setLegalResponsibleUserRequests(response.data)
        } catch (err) {
            setError("Erro na busca por solicitações de usuário responsável legal")
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        legalResponsibleUserRequests,
        create,
        setLegalResponsibleUserRequests,
        createLegalResponsibleUserRequest,
        getLegalResponsibleUserRequest,
    }

}