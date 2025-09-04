export interface BookingType {
    id: string,
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
}