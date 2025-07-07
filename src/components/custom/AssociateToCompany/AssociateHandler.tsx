import { useState } from "react";
import AssociateToCompany from "./AssociateToCompany";
import CompanyRegisterRequest from "./CompanyRegisterRequest";
import LegalResponsibleUserRequest from "./LegalResponsibleUserRequest";
import CompanyRegisterRequestCard from "./CompanyRegisterRequestCard";

export default function AssociateHandler() {

    const [associateOption, setAssociateOption] = useState(1);

    return (
        <div>
            {associateOption === 1 && (
                <AssociateToCompany
                    onNext={() => { setAssociateOption(2) }}
                />)}
            {associateOption === 2 && (
                <>
                    <CompanyRegisterRequest
                        onBack={() => setAssociateOption(1)}
                        onNext={() => setAssociateOption(3)}
                    />
                    <CompanyRegisterRequestCard />
                </>
            )}
            {associateOption === 3 && (
                <LegalResponsibleUserRequest
                    onBack={() => setAssociateOption(1)}
                />
            )}
        </div>
    )
}

export { AssociateHandler }