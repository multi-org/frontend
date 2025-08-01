export interface CompanyType {
    id: string,
    popularName: string,
    legalName: string,
    description: string,
    cnpj: string,
    zipCode: string,
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    email: string,
    phone: string,
    isMicroenterprise: boolean,
    legalResponsiblePerson: string,
}

export type CompanyRegisterRequestType = CompanyType & {
  customisedId: string;
  requiredAt: string;
  requestedByUser: {
    name: string;
    userId: string;
    email: string;
  };
}