import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function AskedQuestion() {
    return (
        <AccordionItem value="item-1">
            <AccordionTrigger
                className="hover:no-underline hover:text-blueLight"
            >
                Product Information
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                    Our flagship product combines cutting-edge technology with sleek
                    design. Built with premium materials, it offers unparalleled
                    performance and reliability.
                </p>
                <p>
                    Key features include advanced processing capabilities, and an
                    intuitive user interface designed for both beginners and experts.
                </p>
            </AccordionContent>
        </AccordionItem>
    )
}

export { AskedQuestion }