export const hours = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00',
] as const

export const intervals = [
  {
    label: "De segunda a sexta",
    start: "weekdayHourStart",
    end: "weekdayHourEnd",
    optional: false,
    required: true,
  },
  {
    label: "Sábado (opcional)",
    start: "saturdayHourStart",
    end: "saturdayHourEnd",
    optional: true,
    required: false,
  },
  {
    label: "Domingo (opcional)",
    start: "sundayHourStart",
    end: "sundayHourEnd",
    optional: true,
    required: false,
  },
] as const