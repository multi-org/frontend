export interface LegalResponsibleUserType {
    name: string,
    cpf: string,
    email: string,
    phoneNumber: string,
    companyName: string,
    position: string,
    document: File,
    requiredAt: string,
}

// export type LegalResponsibleUserRequestType = LegalResponsibleUserType & {
//     requiredAt: string,
// }