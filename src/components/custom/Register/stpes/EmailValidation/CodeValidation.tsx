import React, { useState, useEffect } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface CodeValidationProps {
  onValidate: (code: string) => void;
}

const CodeValidation: React.FC<CodeValidationProps> = ({ onValidate }) => {
  const [code, setCode] = useState('');

  // ✅ Chama a função onValidate automaticamente ao completar 6 dígitos
  useEffect(() => {
    if (code.length === 6) {
      onValidate(code);
    }
  }, [code, onValidate]);

  return (
    <div className="space-y-4 w-full ml-16 mt-16 items-center " >
      <InputOTP
        id="validation-code"
        maxLength={6}
        value={code}
        onChange={setCode}
      >
        <InputOTPGroup>
          <InputOTPSlot className="border-black" index={0} />
          <InputOTPSlot className="border-black" index={1} />
          <InputOTPSlot className="border-black" index={2} />
          <InputOTPSlot className="border-black" index={3} />
          <InputOTPSlot className="border-black" index={4} />
          <InputOTPSlot className="border-black" index={5} />
        </InputOTPGroup>
        
      </InputOTP>
    </div>
  );
};

export default CodeValidation;