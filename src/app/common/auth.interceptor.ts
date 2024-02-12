import {inject, Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  if (auth.isAuthenticated()){
    req = req.clone({
      setParams:{
        auth: auth.token
      }
    })

  }
  return next(req).pipe(
    catchError(error =>{

      if (error.status === 401){
        auth.logout();
        router.navigate(['/admin', 'login'])
      }
      return throwError(() => new Error(error))
    })
  );
};
