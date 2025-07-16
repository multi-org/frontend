import { CompanyType } from "@/types/Company";
import { create } from "zustand";

interface CompanyStoreProps {
    companies: CompanyType[],
    create: (company: CompanyType) => void;
    update: (company: CompanyType) => void;
    delete: (id: string) => void;
    setCompanies: (companies: CompanyType[]) => void;
    getCompanyById: (id: string) => CompanyType | null;
}

export const useCompanyStore = create<CompanyStoreProps>()((set, get) => ({
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

}))