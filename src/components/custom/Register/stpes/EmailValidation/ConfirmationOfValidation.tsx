import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmationOfValidation() {
    return (
        <Card className="w-full max-w-md border-white">
            <CardHeader className="flex flex-col items-center">
            <CheckCircle2 className="text-green-500 w-16 h-16 mb-2 animate-rote-in" />
                <CardTitle className="text-center">
                    E-mail validado com sucesso!
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <p className="text-muted-foreground text-center">
                    Seu endereço de e-mail foi confirmado. Agora você pode acessar todos os recursos da plataforma.
                </p>
                
            </CardContent>
        </Card>
    );
};