import { LegalResponsibleUserType } from "@/types/LegalResponsibleUserType";
import { create } from "zustand";

interface LegalResponsibleUserProps {
    legalResponsibleUserRequests: LegalResponsibleUserType[];
    create: (request: LegalResponsibleUserType) => void;
    setLegalResponsibleUserRequests: (requests: LegalResponsibleUserType[]) => void;
}

export const useLegalResponsibleUserStore = create<LegalResponsibleUserProps>()((
    set,
) => ({

    legalResponsibleUserRequests: [],

    create: (request) =>
        set((state) => ({
            legalResponsibleUserRequests: [
                ...state.legalResponsibleUserRequests, 
                request
            ],
        })),
    
    setLegalResponsibleUserRequests: (requests) =>
        set(() => ({
            legalResponsibleUserRequests: requests
        })),

}))