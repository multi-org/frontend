export interface AssociateToCompanyType {
    customisedId: string,
    userId: {
        alert: string,
        email: string,
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
    documentUrl: string,
    requiredAt: string;
}