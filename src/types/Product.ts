export interface ProductType{
  id:string,
  name:string
  description:string,
  price:string
  category:string

  disponibility: [{id:string, date:Date, hourly:string}]
}