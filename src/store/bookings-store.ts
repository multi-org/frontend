import { BookingType } from "@/types/Booking";
import { create } from "zustand";

interface bookingStoreProps {
    bookings: BookingType[];
    create: (booking: BookingType) => void;
    update: (booking: BookingType) => void;
    delete: (id: string) => void;
    setBookings: (bookings: BookingType[]) => void;
    getBookingBtId: (id: string) => BookingType | null;
}

export const useBookingStore = create<bookingStoreProps>()((set, get) => ({
    bookings: [],

    create: (booking) =>
        set((state) => ({
            bookings: [...state.bookings, booking]
        })),

    update: (updatedBooking) =>
        set((state) => ({
            bookings: state.bookings.map((booking) =>
                booking.id === updatedBooking.id ? updatedBooking : booking,
            )
        })),

    delete: (id) =>
        set((state) => ({
            bookings: state.bookings.filter((booking) => booking.id !== id),
        })),

    setBookings: (bookings) =>
        set(() => ({
            bookings,
        })),

    getBookingBtId: (id: string) => {
        const state = get()
        const booking = state.bookings.find(
            (booking: BookingType) => booking.id === id,
        )
        return booking || null
    }

}))