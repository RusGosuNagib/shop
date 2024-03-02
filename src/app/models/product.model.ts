export class ProductModel {
  type?: { name: string; value: string }
  title?: string
  photo?: string
  info?: string
  price?: string
  date?: string
  product?: object
  id?: string
}

export type ProductRespModel = {
  [key: string]: ProductModel
}

