import { ReducedBookingConfirmationCard } from "../RentalBooking"

export default function BrowseBookings() {
    return (
        <div className="max-[550px]:mx-auto">
            <header>
                <div className="flex flex-col items-center justify-center py-6">
                    <h1 className="text-3xl text-center font-bold">
                        Minhas reservas
                    </h1>
                </div>
            </header>
            <div className="p-6 max-[390px]:w-80 max-[350px]:w-64">
                <ReducedBookingConfirmationCard
                    booking={{
                        confirmationNumber: "RES-2024-001234",
                        productName: "Auditório Premium",
                        productType: "espaco",
                        productCategory: "Auditório",
                        productImage: "/assets/multi-prod-serv.png",
                        startDate: new Date(2024, 11, 20),
                        endDate: new Date(2024, 11, 22),
                        rentalType: "dia",
                        totalPrice: 3600.0,
                        status: "confirmado",
                        activityTitle: "Palestra sobre Inovação Tecnológica",
                    }}
                    onViewDetails={(id: string) => console.log("Ver detalhes:", id)}
                    onCancel={(id: string) => console.log("Cancelar:", id)}
                    onModify={(id: string) => console.log("Modificar:", id)}
                />
            </div>
        </div>
    )
}

export { BrowseBookings }