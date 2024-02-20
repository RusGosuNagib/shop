import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  createProduct,
  getProductById,
  loadProducts,
  removeProduct,
  successCreateProduct,
  successLoadProducts,
  successRemoveProduct,
  successUpdateProduct,
  updateProduct
} from "./product.actions";
import {OrderActions} from "./order.actions";
import {ProductModel} from "../models/product.model";
import {OrderModel} from "../models/order.model";
//import { increment, decrement, reset } from './product.actions';

export const initialState:ProductModel[] = [];
export const orderInitialState:OrderModel[] = [];

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => state),
  on(successLoadProducts, (state, {products}) => products),
  on(successRemoveProduct, (state, {id}) => state.filter(product => product.id !== id)),
  on(getProductById, (state, {id}) => state),
  on(successRemoveProduct, (state, {id}) => state.filter(product => product.id !== id)),
  on(createProduct, (state, {product}) => [ product]),
  on(successCreateProduct, (state, {product}) => [...state, product]),
  on(updateProduct, (state, {product}) => [ product]),
  on(successUpdateProduct, (state, {product}) => [...state, product]),

);


export const orderReducer= createReducer(
  orderInitialState,
  on(OrderActions.loadOrders, (state) => {
    console.log(state)
    return state
  }),
  on(OrderActions.createOrder, (state) => state)
);
