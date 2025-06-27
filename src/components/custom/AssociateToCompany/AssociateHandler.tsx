import { useState } from "react";
import AssociateToCompany from "./AssociateToCompany";
import CompanyRegisterRequest from "./CompanyRegisterRequest";

export default function AssociateHandler() {

    const [step, setStep] = useState(1);

    return (
        <div>
            {step === 1 ? (
                <AssociateToCompany
                    onNext={() => { setStep(2) }}
                />
            ) : (
                <CompanyRegisterRequest
                    onBack={() => setStep(1)}
                />
            )}
        </div>
    )
}

export { AssociateHandler }