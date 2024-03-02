export class ProductModel {
  id?: number
  type?:  number
  title?: string
  photo?: string
  info?: string
  price?: string
  date?: string
  product?: object
}

export type ProductRespModel = {
  [key: string]: ProductModel
}

