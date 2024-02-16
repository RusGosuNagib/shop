import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";

/**
 * Custom authentication guard to protect routes
 * @param route - The activated route snapshot
 * @param state - The router state snapshot
 * @returns True if the user is authenticated, false otherwise
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Inject the AuthService and Router
  const auth = inject(AuthService)
  const router = inject(Router)

  // Check if the user is authenticated
  if (auth.isAuthenticated()) {
    return true; // Allow access to the route
  } else {
    // Redirect to the login page if not authenticated
    router.navigate(['/admin', 'login'])
    return false; // Deny access to the route
  }
};
