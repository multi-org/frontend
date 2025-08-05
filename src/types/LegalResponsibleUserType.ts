export interface LegalResponsibleUserType {
    customisedId: string,
    userId: {
        alert: string,
        email: string,
        phone: string,
        id: string,
        name: string,
        status: string,
    },
    userCpf: string,
    companyId: {
        alert: string,
        id: string,
        name: string,
        status: string,
    },
    position: string,
    documentUrl: string,
    requiredAt: string;
}