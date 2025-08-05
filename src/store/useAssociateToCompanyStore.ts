import { AssociateToCompanyType } from "@/types/AssociateToCompanyType";
import { LegalResponsibleUserType } from "@/types/LegalResponsibleUserType";
import { create } from "zustand";

interface AssociateToCompanyProps {
    associateToCompanyRequests: AssociateToCompanyType[];
    legalResponsibleUserRequests: LegalResponsibleUserType[];
    associationToCompany: AssociateToCompanyType[];
    legalResponsibleUser: LegalResponsibleUserType[];
    createAssociateToCompanyRequest: (request: AssociateToCompanyType) => void;
    createLegalResponsibleUserRequest: (request: LegalResponsibleUserType) => void;
    createAssociationToCompany: (association: AssociateToCompanyType) => void;
    createLegalResponsibleUser: (responsible: LegalResponsibleUserType) => void;
    setAssociateToCompanyRequests: (requests: AssociateToCompanyType[]) => void;
    setLegalResponsibleUserRequests: (requests: LegalResponsibleUserType[]) => void;
    deleteAssociateToCompanyRequestByCustomisedId: (customisedId: string) => void;
    deleteLegalResponsibleUserRequestByCustomisedId: (customisedId: string) => void;
    getAssociateToCompanyRequestByCustomisedId: (customisedId: string) => AssociateToCompanyType | null;
    getLegalResponsibleUserRequestByCustomisedId: (customisedId: string) => AssociateToCompanyType | null;
}

export const useAssociateToCompanyStore = create<AssociateToCompanyProps>()((set, get) => ({

    associateToCompanyRequests: [],

    legalResponsibleUserRequests: [],

    associationToCompany: [],

    legalResponsibleUser: [],

    createAssociateToCompanyRequest: (request) =>
        set((state) => ({
            associateToCompanyRequests: [...state.associateToCompanyRequests, request]
        })),

    createLegalResponsibleUserRequest: (request) =>
        set((state) => ({
            legalResponsibleUserRequests: [...state.legalResponsibleUserRequests, request]
        })),

    createAssociationToCompany: (association) =>
        set((state) => ({
            associationToCompany: [...state.associationToCompany, association]
        })),

    createLegalResponsibleUser: (responsible) =>
        set((state) => ({
            legalResponsibleUser: [...state.legalResponsibleUser, responsible]
        })),

    setAssociateToCompanyRequests: (requests) =>
        set(() => ({
            associateToCompanyRequests: requests
        })),

    setLegalResponsibleUserRequests: (requests) =>
        set(() => ({
            legalResponsibleUserRequests: requests
        })),

    deleteAssociateToCompanyRequestByCustomisedId: (customisedId) =>
        set((state) => ({
            associateToCompanyRequests: state.associateToCompanyRequests.filter((request) => request.customisedId !== customisedId)
        })),

    deleteLegalResponsibleUserRequestByCustomisedId: (customisedId) =>
        set((state) => ({
            legalResponsibleUserRequests: state.legalResponsibleUserRequests.filter((request) => request.customisedId !== customisedId)
        })),

    getAssociateToCompanyRequestByCustomisedId: (customisedId) => {
        const state = get()
        const associateToCompanyRequest = state.associateToCompanyRequests.find(
            (associateToCompanyRequest: AssociateToCompanyType) =>
                associateToCompanyRequest.customisedId === customisedId,
        )
        return associateToCompanyRequest || null
    },

    getLegalResponsibleUserRequestByCustomisedId: (customisedId) => {
        const state = get()
        const legalResponsibleUserRequest = state.legalResponsibleUserRequests.find(
            (legalResponsibleUserRequest: LegalResponsibleUserType) =>
                legalResponsibleUserRequest.customisedId === customisedId,
        )
        return legalResponsibleUserRequest || null
    },

}))