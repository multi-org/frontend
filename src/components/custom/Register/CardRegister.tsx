import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft } from 'lucide-react';
import StepEmail from './stpes/StepEmail';
import CodeValidation from './stpes/EmailValidation/CodeValidation';
import StepPersonalData from './stpes/StepPersonalData';
import ConfirmationOfValidation from './stpes/EmailValidation/ConfirmationOfValidation';
import AddressAutoFillForm from './stpes/SetpAddressAutoFillForm';
import api from '@/apis/api';

export enum AssociationType {
  local = 1,
  equipment = 2,
  service = 3,
}

type Registerschema = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  cpf: string;
  birthDate: string;
  zipcode?: string;
  street?: string;
  city?: string;
  state?: string;
  code: string;
  preference?: AssociationType[];
  association?: string;
  isEmailVerified: boolean;
};

const CardRegister: React.FC = () => {
  const [step, setStep] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();
  const [formData, setFormData] = useState<Registerschema>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    cpf: '',
    birthDate: '',
    zipcode: '',
    street: '',
    city: '',
    state: '',
    code: '',
    preference: [],
    association: '',
    isEmailVerified: false,
  });

  const updateForm = (field: keyof Registerschema, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    console.log('[LOG] Dados atuais do formulário:', formData);
  }, [formData]);

  const next = () => {
    if (validarStepAtual()) setStep(prev => prev + 1);
  };

  const back = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

const validarStepAtual = (): boolean => {
  const errors: { [key: string]: string } = {};

  if (step === 0 && !formData.email) {
    toast({ variant: "destructive", description: 'Por favor, digite um e-mail.' });
    return false;
  }

  if (step === 3) {
    if (!formData.name) errors.name = 'Por favor, digite seu nome.';
    if (!formData.phoneNumber) errors.phoneNumber = 'Por favor, digite seu telefone.';
    if (!formData.cpf) errors.cpf = 'Por favor, digite seu CPF.';
    if (!formData.birthDate) errors.birthDate = 'Por favor, digite sua data de nascimento.';
    if (!formData.password) errors.password = 'Por favor, digite sua senha.';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'As senhas não coincidem.';
  }

  setFieldErrors(errors);

  if (Object.keys(errors).length > 0) {
    toast({ variant: "destructive", description: Object.values(errors)[0] });
    return false;
  }
  return true;
};


  const handleSubmit = async () => {
    try {
      const response = await api.post('/usuarios/register', formData);
      toast({ description: 'Cadastro realizado com sucesso!' });

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        cpf: '',
        birthDate: '',
        zipcode: '',
        street: '',
        city: '',
        state: '',
        association: '',
        code: '',
        preference: [],
        isEmailVerified: false,
      });
      setStep(0);
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.response?.data?.error || 'Erro ao cadastrar usuário.'
      });
    }
  };
  
 const handleVerifyEmail = async () => {
  if (!formData.email) {
    toast({
      variant: "destructive",
      description: "Por favor, insira um e-mail antes de verificar.",
    });
    return;
  }

  try {
    console.log("[LOG] Verificando e-mail:", formData.email);
    const response = await api.post("/users/sendCode-email", { email: formData.email });
    toast({ description: "E-mail verificado com sucesso!" });
    console.log("[LOG] Sucesso:", response.data);
    setFormData(prev => ({ ...prev, isEmailVerified: true }));
    next();
  } catch (error: any) {
    console.error("[ERRO]", error.response || error.message || error);
    toast({
      variant: "destructive",
      description:
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Erro ao verificar e-mail.",
    });
  }
};
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepEmail
            email={formData.email}
            onEmailChange={(value: string) => updateForm('email', value)}
            onNext={next}
          />
        );
      case 1:
        return (
          <CodeValidation
            onValidate={(code: string) => updateForm('code', code)}
          />
        );
      case 2:
        return <ConfirmationOfValidation />;
      case 3:
        return (
          <StepPersonalData
            name={formData.name}
            phoneNumber={formData.phoneNumber}
            cpf={formData.cpf}
            birthDate={formData.birthDate}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            onChange={(field, value) => updateForm(field, value)}
            fieldErrors={fieldErrors}
          />
        );
      case 4:
        return (
          <AddressAutoFillForm
              formData={{
                zipcode: formData.zipcode ?? "",
                street: formData.street ?? "",
                city: formData.city ?? "",
                state: formData.state ?? "",
              }}
              onChange={(updatedFields) =>
                setFormData((prev) => ({ ...prev, ...updatedFields }))
              }
              fieldErrors={fieldErrors}
          />

        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ffff] px-4">
      <Toaster />
      <Card className="flex flex-row w-full max-w-[800px] shadow-md rounded-md overflow-hidden bg-[#F2F2F2]">
        {/* Lado da imagem */}
        <div className="w-1/2 hidden sm:flex">
          <img
            src="src/assets/image CardRegister.png"
            alt="image CardRegister"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Conteúdo do formulário */}
        <div className="w-full sm:w-1/2 p-6 flex flex-col ">
          {step !== 2 && (
            <CardHeader className="flex flex-col items-center text-center px-0">
              <CardTitle className="text-2xl font-bold">
                {step === 1 ? 'Verificação' : 'Bem-vindo'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {step === 1
                  ? 'Digite o código de 6 dígitos enviado para seu e-mail.'
                  : 'A plataforma Multi UEPB facilita a reserva de espaços, serviços e equipamentos.'}
              </CardDescription>

              <div className="w-full flex justify-end mt-2">
                <CardDescription className="text-gray-600 flex items-center gap-1">
                  {step > 0 && (
                    <ChevronLeft className="cursor-pointer text-black" onClick={back} />
                  )}
                  <span className="font-bold text-[#36858E]">{step + 1}</span>
                  <span className="text-black">/ 5</span>
                </CardDescription>
              </div>
            </CardHeader>
          )}

          <CardContent className="flex flex-col gap-4 flex-1 px-0">
            <div className="flex-1 w-full">{renderStep()}</div>

            <div className="flex gap-2 mt-4 w-full justify-end">
              {step === 0 && ( // Adicionar chamada para função que envia a verificação de e-mail
                <Button className="bg-[#36858E] text-white" onClick={handleVerifyEmail}>
                  Verificar E-mail
                </Button>
              )}
              {step === 1 && (// Adicionar chamada para função que valida o codigo e fazer a função de validação
                <Button className="bg-[#36858E] text-white" onClick={next}>
                  Verificar Código
                </Button>
              )}
              {step > 1 && step < 4 && (
                <Button className="bg-[#36858E] text-white" onClick={next}>
                  Próximo
                </Button>
              )}
              {step === 4 && (
                <Button className="bg-[#36858E] text-white" onClick={handleSubmit}>
                  Finalizar Cadastro
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default CardRegister;
