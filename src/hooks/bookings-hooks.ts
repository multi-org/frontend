import api from "@/apis/api"
import { useBookingStore } from "@/store/bookings-store"
import { BookingType } from "@/types/Booking"
import { mapBackendBookingToBookingType } from "@/utils/bookingTypeMapper"
import { useState } from "react"

export const useBookings = () => {
    const {
        bookings,
        create,
        setBookings,
    } = useBookingStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getBookings = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get(`rentals/my-rentals/`)
            console.log("Resposta do getBookings:", response.data);
            const rawBookings = response.data.rentals ?? [];
            const mappedBookings: BookingType[] = rawBookings.map((b: any) =>
                mapBackendBookingToBookingType(b)
            )
            console.log("Reservas mapeadas:", mappedBookings)
            setBookings(mappedBookings)
            return mappedBookings
        } catch (err) {
            const message = "Erro na tentativa de buscar reservas";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const createBooking = async (booking: BookingType) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post(`/rentals/request/${booking.productId}`, booking)
            console.log("Resposta da requisição:", response.data)
            const newBooking: BookingType = mapBackendBookingToBookingType(response.data.data);
            create(newBooking)
            return newBooking
        } catch (err: any) {
            console.error("Erro completo:", err)
            console.error("Erro response:", err.response)
            console.error("Erro response.data:", err.response?.data)

            const message = err.response?.data?.message || "Erro na tentativa de solicitar reserva"
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    return {
        bookings,
        loading,
        error,
        createBooking,
        getBookings
    }

}