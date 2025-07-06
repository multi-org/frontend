import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { getUserInitials } from "@/utils/manipulateNames";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type UserAvatarUploadProps = {
    className?: string;
}

const avatarUploadSchema = z.object({
    image: z
        .custom<FileList>()
        .refine((fileList) => fileList?.length === 1, {
            message: "Selecione apenas uma imagem.",
        })
        .refine((fileList) =>
            ["image/jpeg", "image/png", "image/jpg"].includes(fileList[0]?.type), {
            message: "Apenas arquivos .jpeg, .jpg ou .png são permitidos.",
        })
        .refine((fileList) =>
            fileList[0]?.size <= 3 * 1024 * 1024, {
            message: "A imagem deve ter no máximo 3MB.",
        }),
})

export default function UserAvatarUpload({
    className,
    ...props
}: UserAvatarUploadProps) {

    const [userName, setUserName] = useState("")
    const [userAvatar, setUserAvatar] = useState("")
    const [previewAvatar, setPreviewAvatar] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof avatarUploadSchema>>({
        resolver: zodResolver(avatarUploadSchema)
    })

    useEffect(() => {
        const storedName = localStorage.getItem("userName") || ""
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
        setUserName(storedName)
        setUserAvatar(storedUser.avatar || "")
    }, [])

    const initials = getUserInitials(userName);

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            form.setValue("image", files);
            const imageUrl = URL.createObjectURL(files[0]);
            setPreviewAvatar(imageUrl);
        }
    }

    const handleImageSubmit = (data: z.infer<typeof avatarUploadSchema>) => {
        const file = data.image[0];
        console.log("Arquivo válido para envio:", file);
        // enviar imagem para o backend
    };

    return (
            <div className={cn("flex flex-col gap-6 justify-center items-center", className)} {...props}>
                <Card className="m-6 w-1/2 min-w-56 overflow-hidden">
                    <CardHeader className="text-center">
                        <CardTitle>Avatar</CardTitle>
                        <CardDescription>Carregue uma imagem para alterar</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center gap-6">
                        <FormProvider  {...form}>
                            <form onSubmit={form.handleSubmit(handleImageSubmit)}>
                                <div className="relative w-fit mx-auto">
                                    <Avatar className="h-32 w-32 rounded-full border border-gray-300">
                                        <AvatarImage src={previewAvatar || userAvatar} alt={userName} />
                                        <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                                    </Avatar>
                                    <ImageUp
                                        className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 h-6 w-6 bg-white border rounded cursor-pointer hover:bg-gray-100 transition"
                                        onClick={handleImageClick}
                                    />
                                </div>
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <div className="flex justify-center mt-6">
                                    <Button
                                        type="submit"
                                        variant={"outline"}
                                        className="hover:bg-yellowDark hover:text-grayLight"
                                    >
                                        Salvar
                                    </Button>
                                </div>
                            </form>
                        </FormProvider>
                    </CardContent>
                </Card>
            </div>
    )
}

export { UserAvatarUpload }