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
        deleteCompanyRegisterRequest,
    } = useCompanyStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Menaging companies
    const getCompanies = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get<CompanyType[]>("/companies/all")
            setCompanies(response.data)
        } catch (err) {
            setError("Erro na busca por instituições")
            throw new Error()
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
            setError("Erro na tentativa de criar instituição")
            throw new Error()
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
            setError("Erro na tentativa de alterar instituição")
            throw new Error()
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
            setError("Erro na tentativa de deletar instituição")
            throw new Error()
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
            setError("Erro na busca por instituições")
            throw new Error()
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
            setError("Erro na tentativa de criar instituição")
            throw new Error()
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
            const response = await api.post("/companies/confirm/:cnpj", {
                ...company
            })
            create(response.data)
            return response.data
        } catch (err) {
            setError("Erro na tentativa de criar instituição")
            throw new Error()
        } finally {
            setLoading(false)
        }
    }

    const deleteCompanyRegisterRequestById = async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            await api.delete(`/companies/${id}`)
            deleteCompany(id)
        } catch (err) {
            setError("Erro na tentativa de deletar instituição")
            throw new Error()
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
        deleteCompanyRegisterRequestById,
        deleteCompanyRegisterRequest,
    }

}