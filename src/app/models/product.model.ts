export class ProductModel {
  type?: string
  title?: string
  photo?: string
  info?: string
  price?: string
  date?: string
  name?: string
  product?: object
  id?: string
}

export type ProductRespModel =   {
  [key: string]: ProductModel
}

