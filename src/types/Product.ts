export interface ProductType {
  _id: string
  nome: string
  descricao: string
  preco: number
  // preco: string
  categoria: string

  disponibilidade: { _id: string; data: Date; horario: string }[]
}
