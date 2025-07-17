import { CompanyType, CompanyRegisterRequestType } from "@/types/Company";
import { create } from "zustand";

interface CompanyStoreProps {
    // instituições
    companies: CompanyType[],
    create: (company: CompanyType) => void;
    update: (company: CompanyType) => void;
    delete: (id: string) => void;
    setCompanies: (companies: CompanyType[]) => void;
    getCompanyById: (id: string) => CompanyType | null;

    // solicitações de instituições
    companyRegisterRequests: CompanyRegisterRequestType[];
    setCompanyRegisterRequests: (requests: CompanyRegisterRequestType[]) => void;
    deleteCompanyRegisterRequest: (id: string) => void;
}

export const useCompanyStore = create<CompanyStoreProps>()((set, get) => ({

    // instituições
    companies: [],

    create: (company) =>
        set((state) => ({
            companies: [...state.companies, company]
        })),

    update: (updatedCompany) =>
        set((state) => ({
            companies: state.companies.map((company) =>
                company.id === updatedCompany.id ? updatedCompany : company
            ),
        })),

    delete: (id) =>
        set((state) => ({
            companies: state.companies.filter((company) => company.id !== id),
        })),

    setCompanies: (companies) =>
        set(() => ({
            companies,
        })),

    getCompanyById: (id: string) => {
        const state = get()
        const company = state.companies.find(
            (company: CompanyType) => company.id === id,
        )
        return company || null
    },

    // solicitações de instituições
    companyRegisterRequests: [],

    setCompanyRegisterRequests: (requests) =>
        set(() => ({
            companyRegisterRequests: requests
        })),

    deleteCompanyRegisterRequest: (id) =>
        set((state) => ({
            companyRegisterRequests: state.companyRegisterRequests.filter((request) => request.id !== id),
        })),

}))