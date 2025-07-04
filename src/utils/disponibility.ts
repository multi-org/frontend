export const hours = [
    '8h', '9h', '10h', '11h',
    '12h', '13h', '14h', '15h',
    '16h', '17h', '18h', '19h',
    '20h', '21h', '22h',
] as const

export const intervals = [
  {
    label: "De segunda a sexta",
    start: "weekdayHourStart",
    end: "weekdayHourEnd",
    optional: false,
  },
  {
    label: "Sábado (opcional)",
    start: "saturdayHourStart",
    end: "saturdayHourEnd",
    optional: true,
  },
  {
    label: "Domingo (opcional)",
    start: "sundayHourStart",
    end: "sundayHourEnd",
    optional: true,
  },
] as const