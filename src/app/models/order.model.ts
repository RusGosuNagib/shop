import {ProductModel} from "./product.model";

export class OrderModel {
  name?: string
  phone?: string
  address?: string
  payment?: string
  price?: number
  date?: string
  id?: number
  products?: ProductModel[]
}

export type OrderRespModel = {
  [key: string]: OrderModel
}
