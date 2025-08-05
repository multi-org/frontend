import api from "@/apis/api"
import { useCompanyStore } from "@/store/useCompanyStore"
import { CompanyType, CompanyRegisterRequestType } from "@/types/Company"
import { useState } from "react"

export const useCompanies = () => {
    const {
        companies,
        create,
        update,
        delete: deleteCompany,
        setCompanies,
        getCompanyById,
        companyRegisterRequests,
        setCompanyRegisterRequests,
        getCompanyRegisterRequestByCustomisedId,
        deleteCompanyRegisterRequest,
    } = useCompanyStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Managing companies

    const getCompanies = async (): Promise<CompanyType[]> => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get("/companies/all")
            const data = response.data.companies
            setCompanies(data)
            return data
        } catch (err) {
            const message = "Erro na busca por instituições";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const createCompany = async (company: {
        popularName: string
        legalName: string
        description: string
        cnpj: string
        zipCode: string
        street: string
        number: string
        complement?: string
        neighborhood: string
        city: string
        state: string
        country: string
        email: string
        phone: string
        isMicroenterprise: boolean
    }) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post("/companies/", {
                ...company
            })
            create(response.data)
            return response.data
        } catch (err) {
            const message = "Erro na tentativa de criar instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const updateCompany = async (company: CompanyType) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.put<CompanyType>(
                `/companies/${company.id}`,
                company,
            )
            update(response.data)
            return response.data
        } catch (err) {
            const message = "Erro na tentativa de alterar instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const deleteCompanyById = async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            await api.delete(`/companies/${id}`)
            deleteCompany(id)
        } catch (err) {
            const message = "Erro na tentativa de deletar instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    // Menaging companie register requests
    const getCompanyRegisterRequests = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get<CompanyRegisterRequestType[]>("/companies/all/requests")
            setCompanyRegisterRequests(response.data)
        } catch (err) {
            const message = "Erro na busca por instituições";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const createCompanyRegisterRequest = async (company: {
        popularName: string
        legalName: string
        description: string
        cnpj: string
        zipCode: string
        street: string
        number: string
        complement?: string
        neighborhood: string
        city: string
        state: string
        country: string
        email: string
        phone: string
        isMicroenterprise: boolean
    }) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post("/companies/request/registration", {
                ...company
            })
            create(response.data)
            return response.data
        } catch (err) {
            const message = "Erro na tentativa de criar instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const confirmCompanyRegisterRequest = async (company: {
        popularName: string
        legalName: string
        description: string
        cnpj: string
        zipCode: string
        street: string
        number: string
        complement?: string
        neighborhood: string
        city: string
        state: string
        country: string
        email: string
        phone: string
        isMicroenterprise: boolean
    }) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post(`/companies/confirm/${encodeURIComponent(company.cnpj)}`, {
                ...company
            })
            create(response.data)
            return response.data
        } catch (err) {
            const message = "Erro na tentativa de criar instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const deleteCompanyRegisterRequestByCustomisedId = async (company: {
        customisedId: string
        cnpj: string
    }) => {
        setLoading(true)
        setError(null)
        try {
            await api.delete(`/companies/reject/request/${encodeURIComponent(company.cnpj)}`)
            deleteCompanyRegisterRequest(company.customisedId)
        } catch (err) {
            const message = "Erro na tentativa de deletar instituição";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    return {
        companies,
        loading,
        error,
        getCompanies,
        createCompany,
        updateCompany,
        deleteCompanyById,
        getCompanyById,
        companyRegisterRequests,
        getCompanyRegisterRequests,
        createCompanyRegisterRequest,
        confirmCompanyRegisterRequest,
        getCompanyRegisterRequestByCustomisedId,
        deleteCompanyRegisterRequestByCustomisedId,
        deleteCompanyRegisterRequest,
    }

}