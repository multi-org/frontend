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
import { CircleCheck, CircleX, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { useUsers } from "@/hooks/users-hooks";

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

    const { updateUserAvatar } = useUsers()
    const [userName, setUserName] = useState("")
    const [storedUserAvatar, setUserAvatar] = useState("")
    const [previewAvatar, setPreviewAvatar] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof avatarUploadSchema>>({
        resolver: zodResolver(avatarUploadSchema)
    })

    useEffect(() => {
        const storedUserName = localStorage.getItem("userName") || ""
        const storedUserAvatar = localStorage.getItem("userProfilePic") || "{}"
        setUserName(storedUserName)
        setUserAvatar(storedUserAvatar || "")
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

    const handleImageSubmit = async (data: z.infer<typeof avatarUploadSchema>) => {
        const file = data.image[0];
        console.log("Arquivo válido para envio:", file);
        try {
            const result = await updateUserAvatar([file])
            console.log("Avatar atualizado com sucesso:", result)
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleCheck className="text-white" size={20} />
                        Avatar atualizado com sucesso
                    </div>
                ),
                variant: 'default',
                style: {
                    backgroundColor: "#4E995E",
                    color: "#FFFFFF",
                },
            })
            form.reset()
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro inesperado";
            toast({
                description: (
                    <div className="flex items-center gap-2">
                        <CircleX className="text-white" size={20} />
                        {message}
                    </div>
                ),
                variant: 'destructive'
            })
        }

    };

    return (
        <div className={cn("flex flex-col gap-6 justify-center items-center", className)} {...props}>
            <Card className="m-6 w-1/2 min-w-72 overflow-hidden">
                <CardHeader className="text-center">
                    <CardTitle>Alteração de avatar</CardTitle>
                    <CardDescription
                    >
                        Carregue uma imagem para alterar
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center gap-6">
                    <FormProvider  {...form}>
                        <form onSubmit={form.handleSubmit(handleImageSubmit)}>
                            <div className="relative w-fit mx-auto">
                                <Avatar className="h-32 w-32 rounded-full border border-gray-300">
                                    <AvatarImage src={previewAvatar || storedUserAvatar} alt={userName} />
                                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                                </Avatar>
                                <div className="absolute flex justify-center items-center bg-white bottom-[-12px] left-1/2 transform -translate-x-1/2 h-9 w-9 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                                    <Pencil
                                        className="h-6 w-6 p-1 cursor-pointer"
                                        onClick={handleImageClick}
                                    />
                                </div>
                            </div>
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <div className="flex justify-center mt-6 gap-6">
                                <Button
                                    type="submit"
                                    variant={"outline"}
                                    className="hover:bg-yellowDark hover:text-grayLight"
                                >
                                    Alterar
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