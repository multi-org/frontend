// import { BookingType } from "@/types/Booking";

// export function mapBackendBookingToBookingType(data: any): BookingType {
//   // transformar dates [{date, hour}] → reservations [{date, hours[]}]
//   const reservations = data.dates.reduce((acc: any[], d: any) => {
//     const existing = acc.find(r => r.date === d.date);
//     if (existing) {
//       existing.hours.push(d.hour);
//     } else {
//       acc.push({ date: d.date, hours: [d.hour] });
//     }
//     return acc;
//   }, []);

//   return {
//     id: data.id,
//     status: data.status,
//     productId: data.product.productId,
//     productTitle: data.product.productTitle,
//     productAddress: {
//       street: data.product?.address?.street ?? "",
//       number: data.product?.address?.number ?? "",
//       neighborhood: data.product?.address?.neighborhood ?? "",
//       city: data.product?.address?.city ?? "",
//       state: data.product?.address?.state ?? "",
//     },
//     productType: data.product.productType,
//     spaceProduct: data.product.spaceProduct ?? undefined,
//     equipmentProduct: data.product.equipmentProduct ?? undefined,
//     serviceProduct: data.product.serviceProduct ?? undefined,
//     productCategory: data.product.productCategory,
//     productImage: data.product.productImage,
//     institution: {
//       email: data.companyThatOwnsProduct?.email ?? "",
//       phone: data.companyThatOwnsProduct?.phone ?? "",
//     },
//     productDiscount: Number(data.product.productDiscount ?? 0),
//     client: {
//       name: data.client.name,
//       email: data.client.email,
//       phone: data.client.phone,
//     },
//     reservations,
//     activityTitle: data.activityTitle,
//     activityDescription: data.activityDescription,
//     chargingType: data.pricing.chargingType ?? null,
//     totalAmount: data.pricing.baseAmount,
//     finalAmount: data.pricing.totalAmount,
//     paymentDate: new Date(), // ou ajuste se backend devolver a data de pagamento
//   };
// }

// import { BookingType } from "@/types/Booking";

// const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;

// export function mapBackendBookingToBookingType(data: any): BookingType {
//   // transformar dates [string] → reservations [{date, hours[]}]
//   const reservations = (data.dates ?? []).reduce((acc: any[], d: string) => {
//     const dateObj = new Date(d);
//     const date = dateObj.toISOString().split("T")[0]; // ex: "2025-09-29"
//     const hour = dateObj.toISOString().split("T")[1].slice(0, 5); // ex: "08:00"

//     const existing = acc.find(r => r.date === date);
//     if (existing) {
//       existing.hours.push(hour);
//     } else {
//       acc.push({ date, hours: [hour] });
//     }

//     return acc;
//   }, []);

//   return {
//     id: data.id,
//     status: validStatuses.includes(data.status) ? data.status : "PENDING",
//     productId: data.product.productId,
//     productTitle: data.product.productTitle,
//     productAddress: {
//       street: data.product?.address?.street ?? "",
//       number: data.product?.address?.number ?? "",
//       neighborhood: data.product?.address?.neighborhood ?? "",
//       city: data.product?.address?.city ?? "",
//       state: data.product?.address?.state ?? "",
//     },
//     productType: data.product.productType,
//     spaceProduct: data.product.spaceProduct ?? undefined,
//     equipmentProduct: data.product.equipmentProduct ?? undefined,
//     serviceProduct: data.product.serviceProduct ?? undefined,
//     productCategory: data.product.productCategory,
//     productImage: data.product.productImage,
//     institution: {
//       email: data.companyThatOwnsProduct?.email ?? "",
//       phone: data.companyThatOwnsProduct?.phone ?? "",
//     },
//     productDiscount: Number(data.product.productDiscount ?? 0),
//     client: {
//       name: data.client?.name ?? "",
//       email: data.client?.email ?? "",
//       phone: data.client?.phone ?? "",
//     },
//     reservations,
//     activityTitle: data.activityTitle,
//     activityDescription: data.activityDescription,
//     chargingType: data.pricing.chargingType ?? null,
//     totalAmount: Number(data.pricing.baseAmount ?? 0),
//     finalAmount: Number(data.pricing.totalAmount ?? 0),
//     paymentDate: new Date(), // ou ajuste se backend devolver a data de pagamento
//   };
// }

import { BookingType } from "@/types/Booking";

const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;

function parseDateHour(entry: any): { date: string; hour: string } | null {
  if (!entry) return null;

  // 1) entry é uma string ISO
  if (typeof entry === "string") {
    const d = new Date(entry);
    if (isNaN(d.getTime())) return null;
    const iso = d.toISOString();
    return { date: iso.split("T")[0], hour: iso.split("T")[1].slice(0, 5) };
  }

  // 2) entry é um objeto { date, hour } (ou similar)
  if (typeof entry === "object") {
    const maybeDate = entry.date ?? entry.datetime ?? entry.timestamp ?? null;
    const maybeHour = entry.hour ?? entry.time ?? null;

    // Se date é Date instance
    if (maybeDate instanceof Date) {
      const iso = maybeDate.toISOString();
      return { date: iso.split("T")[0], hour: (maybeHour && String(maybeHour).slice(0,5)) || iso.split("T")[1].slice(0,5) };
    }

    // Se date é string
    if (typeof maybeDate === "string") {
      let dateObj = new Date(maybeDate);
      // se dateObj inválido, mas temos hour separado (ex: date = "2025-09-29", hour = "08:00"), combine
      if (isNaN(dateObj.getTime()) && typeof maybeDate === "string" && maybeHour) {
        // combine (assume hour formato "HH:mm")
        const combined = `${maybeDate}T${String(maybeHour).slice(0,5)}:00Z`;
        dateObj = new Date(combined);
      }
      if (!isNaN(dateObj.getTime())) {
        const iso = dateObj.toISOString();
        return { date: iso.split("T")[0], hour: (maybeHour && String(maybeHour).slice(0,5)) || iso.split("T")[1].slice(0,5) };
      }
    }

    // 3) fallback: talvez entry itself tenha hour-like info (rare). Não quebremos — retornar null
    return null;
  }

  return null;
}

export function mapBackendBookingToBookingType(data: any): BookingType {
  // defensive defaults
  const rawDates = data?.dates ?? [];

  // parse todos os itens e filtramos os inválidos
  const parsed = (rawDates as any[])
    .map(parseDateHour)
    .filter(Boolean) as { date: string; hour: string }[];

  // agrupar horas por data (usando Set para evitar duplicatas)
  const grouped: Record<string, Set<string>> = {};
  for (const p of parsed) {
    if (!p) continue;
    const { date, hour } = p;
    if (!grouped[date]) grouped[date] = new Set();
    if (hour) grouped[date].add(hour);
  }

  // montar reservations no formato desejado
  const reservations = Object.keys(grouped)
    .sort() // ordena as datas
    .map((date) => ({
      date,
      hours: Array.from(grouped[date]).sort(), // horas ordenadas
    }));

  // montar objeto final (com muitos fallbacks para evitar crashes)
  return {
    id: data?.id ?? "",
    status: validStatuses.includes(data?.status) ? data.status : "PENDING",
    productId: data?.product?.productId ?? data?.productId ?? "",
    productTitle: data?.product?.productTitle ?? data?.productTitle ?? "",
    productAddress: {
      street: data.product?.address?.street ?? data.productAddress?.street ?? "",
      number: data.product?.address?.number ?? data.productAddress?.number ?? "",
      neighborhood: data.product?.address?.neighborhood ?? data.productAddress?.neighborhood ?? "",
      city: data.product?.address?.city ?? data.productAddress?.city ?? "",
      state: data.product?.address?.state ?? data.productAddress?.state ?? "",
    },
    productType: data?.product?.productType ?? data?.productType ?? "EQUIPMENT",
    spaceProduct: data?.product?.spaceProduct ?? data?.spaceProduct ?? undefined,
    equipmentProduct: data?.product?.equipmentProduct ?? data?.equipmentProduct ?? undefined,
    serviceProduct: data?.product?.serviceProduct ?? data?.serviceProduct ?? undefined,
    productCategory: data?.product?.productCategory ?? data?.productCategory ?? "",
    productImage: data?.product?.productImage ?? data?.productImage ?? [],
    institution: {
      email: data?.companyThatOwnsProduct?.email ?? data?.institution?.email ?? "",
      phone: data?.companyThatOwnsProduct?.phone ?? data?.institution?.phone ?? "",
    },
    productDiscount: Number(data?.product?.productDiscount ?? data?.productDiscount ?? 0),
    client: {
      name: data?.client?.name ?? data?.clientName ?? "",
      email: data?.client?.email ?? data?.clientEmail ?? "",
      phone: data?.client?.phone ?? data?.clientPhone ?? "",
    },
    reservations,
    activityTitle: data?.activityTitle ?? "",
    activityDescription: data?.activityDescription ?? "",
    chargingType: data?.pricing?.chargingType ?? data?.chargingType ?? null,
    totalAmount: Number(data?.pricing?.baseAmount ?? data?.totalAmount ?? 0),
    finalAmount: Number(data?.pricing?.totalAmount ?? data?.finalAmount ?? 0),
    // se backend enviar paymentDate/paidAt use isso, senão tenta createdAt, senão now
    paymentDate: data?.paymentDate ?? data?.paidAt ?? data?.createdAt ?? new Date().toISOString(),
  };
}