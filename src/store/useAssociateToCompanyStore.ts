import { AssociateToCompanyType } from "@/types/AssociateToCompanyType";
import { create } from "zustand";

interface AssociateToCompanyProps {
    associateToCompanyRequests: AssociateToCompanyType[];
    associationToCompany: AssociateToCompanyType[];
    createAssociateToCompanyRequest: (request: AssociateToCompanyType) => void,
    createAssociationToCompany: (association: AssociateToCompanyType) => void,
    setAssociateToCompanyRequests: (requests: AssociateToCompanyType[]) => void;
    deleteAssociateToCompanyRequestByCustomisedId: (customisedId: string) => void;
    getAssociateToCompanyRequestByCustomisedId: (customisedId: string) => AssociateToCompanyType | null;
}

export const useAssociateToCompanyStore = create<AssociateToCompanyProps>()((set, get) => ({

    associateToCompanyRequests: [],

    associationToCompany: [],

    createAssociateToCompanyRequest: (request) =>
        set((state) => ({
            associateToCompanyRequests: [...state.associateToCompanyRequests, request]
        })),

    createAssociationToCompany: (association) =>
        set((state) => ({
            associationToCompany: [...state.associationToCompany, association]
        })),

    setAssociateToCompanyRequests: (requests) =>
        set(() => ({
            associateToCompanyRequests: requests
        })),

    deleteAssociateToCompanyRequestByCustomisedId: (customisedId) =>
        set((state) => ({
            associateToCompanyRequests: state.associateToCompanyRequests.filter((request) => request.customisedId !== customisedId)
        })),

    getAssociateToCompanyRequestByCustomisedId: (customisedId) => {
        const state = get()
        const associateToCompanyRequest = state.associateToCompanyRequests.find(
            (associateToCompanyRequest: AssociateToCompanyType) =>
                associateToCompanyRequest.customisedId === customisedId,
        )
        return associateToCompanyRequest || null
    },

}))