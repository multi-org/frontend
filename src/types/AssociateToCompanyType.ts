export interface AssociateToCompanyType {
    name: string,
    cpf: string,
    companyName: string,
    document: File
}

export type AssociateToCompanyRequestType = AssociateToCompanyType & {
    requiredAt: string;
}