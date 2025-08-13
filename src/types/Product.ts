// export interface ProductType {
//   _id: string
//   nome: string
//   descricao: string
//   preco: number
//   // preco: string
//   categoria: string

//   disponibilidade: { _id: string; data: Date; horario: string }[]
// }

export interface ProductType {
  id: string,
  type: string,
  title: string,
  description: string,
  spaceDetails: {
    capacity: number,
    area: number,
  },
  // serviceDetails: {
  //   durationMinutes: string,
  //   requirements: string,
  // },
  // equipmentDetails: {
  //   brand: string,
  //   model: string,
  //   specifications: string,
  //   stock: number,
  // },
  category: string,
  images: string[],
  chargingModel: string,
  hourlyPrice: number,
  dailyPrice: number,
  weeklyAvailability: {
    monday: {
      start: string,
      end: string,
    },
    tuesday: {
      start: string,
      end: string,
    },
    wednesday: {
      start: string,
      end: string,
    },
    thursday: {
      start: string,
      end: string,
    },
    friday: {
      start: string,
      end: string,
    },
    saturday?: {
      start: string,
      end: string,
    },
    sunday?: {
      start: string,
      end: string,
    },
  }
}
