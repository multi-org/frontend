import { Separator } from "@/components/ui/separator";

export function Footer() {
    return (
        <div className="bg-blueDark flex flex-col justify-center items-center h-auto px-10 py-16 gap-6 overflow-hidden">
            <div className="flex justify-center items-center gap-4 max-[275px]:flex-col">
                <img
                    src="/src/assets/cc-logo-white.png" 
                    alt="logo-ciencia-da-computacao"
                    className="h-32 w-40 shrink-0"
                />
                <img
                    src="/src/assets/uepb-logo.png" 
                    alt="logo-ciencia-da-computacao"
                    className="h-24 w-16 filter brightness-0 invert shrink-0"
                />
            </div>
            <Separator/>
            <p className="text-grayLight">&copy; 2025 UEPB.</p>
        </div>
    )
}