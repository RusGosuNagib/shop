import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptor} from "./common/auth.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideState, provideStore} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import {ProductEffects} from "./store/product.effects";
import {productReducer} from "./store";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(ProductEffects),
    provideState({name: 'products', reducer: productReducer})
]
};
