export interface LegalResponsibleUserType {
    name: string,
    userCpf: string,
    email: string,
    phoneNumber: string,
    companyName: string,
    companyId: string,
    position: string,
    document: File,
}

export type LegalResponsibleUserRequestType = LegalResponsibleUserType & {
    requiredAt: string,
}