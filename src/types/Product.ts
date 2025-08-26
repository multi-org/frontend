// export interface ProductType {
//   id: string,
//   type: string,
//   title: string,
//   description: string,
//   spaceDetails: {
//     capacity: number,
//     area: number,
//   },
//   serviceDetails: {
//     durationMinutes: number,
//     requirements: string,
//   },
//   equipmentDetails: {
//     brand: string,
//     model: string,
//     specifications: string,
//     stock: number,
//   },
//   category: string,
//   images: string[],
//   chargingModel: string,
//   hourlyPrice: number,
//   dailyPrice: number,
//   weeklyAvailability: {
//     monday: {
//       start: string,
//       end: string,
//     },
//     tuesday: {
//       start: string,
//       end: string,
//     },
//     wednesday: {
//       start: string,
//       end: string,
//     },
//     thursday: {
//       start: string,
//       end: string,
//     },
//     friday: {
//       start: string,
//       end: string,
//     },
//     saturday?: {
//       start: string,
//       end: string,
//     },
//     sunday?: {
//       start: string,
//       end: string,
//     },
//   }
// }

export interface ProductType { // em teste
  id: string,
  // type: string,
  type: "SPACE" | "EQUIPMENT" | "SERVICE",
  title: string,
  owner: {
    address: {
      street: string,
      number: string,
      neighborhood: string,
      city: string,
      state: string,
    },
  },
  description: string,
  category: string,
  imagesUrls: string[],
  chargingModel: string,
  discountPercentage?: number,
  hourlyPrice: number,
  dailyPrice: number,
  spaceProduct?: {
    capacity: number,
    area: number,
  },
  servicesProduct?: {
    durationMinutes: number,
    requirements: string,
  },
  equipamentProduct?: {
    brand: string,
    model: string,
    specifications: string,
    stock: number,
  },
  ProductWeeklyAvailability: {
    monday: { start: string, end: string },
    tuesday: { start: string, end: string },
    wednesday: { start: string, end: string },
    thursday: { start: string, end: string },
    friday: { start: string, end: string },
    saturday?: { start: string, end: string },
    sunday?: { start: string, end: string },
  }
}

export type GetProductsResponse = {
  success: boolean
  message: string
  data: ProductType[]
  statistics: {
    totalProducts: number
    spaceCount: number
    serviceCount: number
    equipmentCount: number
  }
}

