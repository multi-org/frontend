import { useBookings } from "@/hooks/bookings-hooks"
import { BookingConfirmationCard, ReducedBookingConfirmationCard } from "../RentalBooking"
import { useEffect, useState } from "react"
import { BookingType } from "@/types/Booking";

export default function BrowseBookings() {

    const { bookings, getBookings } = useBookings();
    const [bookingViewStep, setBookingViewStep] = useState(0);
    const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(null);

    useEffect(() => {
        getBookings()
    }, [])

    return (
        <div>
            <header>
                <div className="flex flex-col items-center justify-center py-6">
                    <h1 className="text-3xl text-center font-bold">
                        Minhas reservas
                    </h1>
                </div>
            </header>
            <div className="flex flex-col gap-4 p-6 max-[390px]:w-80 max-[350px]:w-64">
                {bookingViewStep === 0 && (
                    <>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <ReducedBookingConfirmationCard
                                    booking={booking}
                                    onViewDetails={() => {
                                        setSelectedBooking(booking)
                                        setBookingViewStep(1)
                                    }}
                                    onCancel={(id: string) => console.log("Cancelar:", id)}
                                    onModify={(id: string) => console.log("Modificar:", id)}
                                />
                            ))
                        ) : (
                            <p className='col-start-2 text-center max-[750px]:col-span-2'>
                                Nenhuma reserva encontrada
                            </p>
                        )}
                    </>
                )}
                {bookingViewStep === 1 && selectedBooking && (
                    <BookingConfirmationCard
                        bookingData={selectedBooking}
                        onBack={() => setBookingViewStep(0)}
                    />
                )}
            </div>
        </div>
    )
}

export { BrowseBookings }