export interface ProductType {
  _id: string
  nome: string
  descricao: string
  preco: string
  categoria: string

  disponibilidade: [{ id: string; date: Date; hourly: string }]
}
