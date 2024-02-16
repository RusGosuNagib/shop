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

/**
 * Intercepts HTTP requests and handles authentication
 * @param req The HTTP request
 * @param next The HTTP handler
 * @returns An observable of the HTTP event stream
 */
export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // Get the authentication service
  const auth = inject(AuthService);
  // Get the router
  const router = inject(Router);

  // Check if the user is authenticated
  if (auth.isAuthenticated()) {
    // Add the authentication token to the request headers
    req = req.clone({
      setParams: {
        auth: auth.token
      }
    });
  }

  // Return the observable of the HTTP event stream
  return next(req).pipe(
    catchError(error => {
      // Handle unauthorized error
      if (error.status === 401) {
        // Log out the user and navigate to the login page
        auth.logout();
        router.navigate(['/admin', 'login']);
      }
      // Throw a new error
      return throwError(() => new Error(error));
    })
  );
};
