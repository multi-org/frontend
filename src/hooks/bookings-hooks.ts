import api from "@/apis/api"
import { useBookingStore } from "@/store/bookings-store"
import { BookingType } from "@/types/Booking"
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
            const response = await api.get<BookingType[]>('/bookings/all')
            setBookings(response.data)
        } catch (err) {
            const message = "Erro na tentativa de buscar reservas";
            setError(message)
            throw new Error(message)
        } finally {
            setLoading(false)
        }
    }

    const createBooking = async (booking: {
        productId: string,
        productTitle: string,
        productAddress: {
            street: string,
            number: string,
            neighborhood: string,
            city: string,
            state: string,
        },
        productType: "SPACE" | "EQUIPMENT" | "SERVICE",
        spaceProduct?: {
            capacity: number,
            area: number,
        },
        equipmentProduct?: {
            brand: string,
            model: string,
            specifications: string,
            stock: number,
        },
        serviceProduct?: {
            durationMinutes: number,
            requirements: string,
        },
        productCategory: string,
        productImage: string[],
        institution: {
            email: string,
            phone: string,
        },
        productDiscount: number,
        // startDate: Date | undefined,
        // endDate: Date | undefined,
        // startTime: string | undefined,
        // endTime: string | undefined,
        client: {
            name: string,
            email: string,
            phone: string,
        }
        activityTitle: string,
        activityDescription: string,
        chargingType: "POR_HORA" | "POR_DIA" | null,
        totalAmount: number,
        finalAmount: number,
        paymentDate: Date | string,
    }) => {
        setLoading(true)
        setError(null)
        try {

            console.log('FormData entries:')
            const response = await api.post(`/products/rents/request/${booking.productId}`,
                {
                    ...booking
                })
            create(response.data)
            return response.data
        } catch (err) {
            const message = "Erro na tentativa de criar reserva";
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