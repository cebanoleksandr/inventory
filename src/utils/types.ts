export type Order = {
  id: number,
  name: string,
  created_at: string,
  products: number[]
}

export type Product = {
  id: number,
  name: string,
  type: string,
  warranty_date: string,
  order_id: number,
  status: string,
  age: string,
  price: number
}
