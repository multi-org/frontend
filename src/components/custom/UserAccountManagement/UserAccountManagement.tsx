import { Separator } from "@/components/ui/separator"
import UserAvatarUpload from "./UserAvatarUpload"
import UserPasswordUpdate from "./UserPasswordUpdate"


export default function UserAccountManagement() {

    return (
        <>
            <header>
                <div className="flex flex-col items-center justify-center py-6">
                    <h1 className="text-3xl text-center font-bold">
                        Minha conta
                    </h1>
                    <span className="text-center font-medium">
                        Aqui você pode gerenciar su conta e suas principais informações
                    </span>
                </div>
            </header>
            <UserAvatarUpload />
            <div className="p-6">
                <Separator />
            </div>
            <UserPasswordUpdate/>
        </>
    )
}

export { UserAccountManagement }