import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  createProduct,
  getProductById,
  loadProducts,
  removeProduct,
  successCreateProduct, successGetProductById,
  successLoadProducts,
  successRemoveProduct,
  successUpdateProduct,
  updateProduct
} from "./product.actions";
import {OrderActions} from "./order.actions";
import {ProductModel} from "../models/product.model";
import {OrderModel} from "../models/order.model";
import {CartActions} from "./cart.actions";
//import { increment, decrement, reset } from './product.actions';

export const initialState:ProductModel[] = [];
export const orderInitialState:OrderModel[] = [];
export const cartInitialState:ProductModel[] = [];

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => state),
  on(successLoadProducts, (state, {products}) => products),
  on(removeProduct, (state, {id}) => state.filter(product => product.id !== id)),
  on(successRemoveProduct, (state, {id}) => state.filter(product => product.id !== id)),
  on(getProductById, (state, {id}) => state),
  on(successGetProductById, (state, {product}) => state),
  on(createProduct, (state, {product}) => [ product]),
  on(successCreateProduct, (state, {product}) => [...state, product]),
  on(updateProduct, (state, {product}) => [ product]),
  on(successUpdateProduct, (state, {product}) => [...state, product]),

);


export const orderReducer= createReducer(
  orderInitialState,
  on(OrderActions.loadOrders, (state) => state),
  on(OrderActions.successLoadOrders, (state, {orders}) => orders),
  on(OrderActions.createOrder, (state) => state),
  on(OrderActions.removeOrder, (state, {id}) => state.filter(order => order.id !== id)),
  on(OrderActions.successRemoveOrder, (state, {id}) => state.filter(order => order.id !== id)),
);

export const cartReducer = createReducer(
  cartInitialState,
  on(CartActions.addToCart, (state, {product}) => [...state, product]),
  on(CartActions.deleteFromCart, (state, {product}) => [...state, product]),
)
