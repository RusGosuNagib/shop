import {createAction, emptyProps, props} from '@ngrx/store';
import {ProductModel} from "../models/product.model";

export const loadProducts = createAction('[Dashboard Component] loadProducts');
export const successLoadProducts = createAction('[Dashboard Component] successLoadProducts', props<{ products: ProductModel[] }>());
export const removeProduct = createAction('[Dashboard Component] removeProduct', props<{ id: string }>());
export const successRemoveProduct = createAction('[Dashboard Component] successRemoveProduct', props<{ id: string }>());
export const getProductById = createAction('[Dashboard Component] getProductById', props<{ id: string }>());
export const successGetProductById = createAction('[Dashboard Component] successGetProductById', props<{ product: ProductModel}>());
export const createProduct = createAction('[Dashboard Component] createProduct', props<{ product: ProductModel }>());
export const successCreateProduct = createAction('[Dashboard Component] successCreateProduct', props<{ product: ProductModel }>());
export const updateProduct = createAction('[Dashboard Component] updateProduct', props<{ product: ProductModel }>());
export const successUpdateProduct = createAction('[Dashboard Component] successUpdateProduct', props<{ product: ProductModel }>());

