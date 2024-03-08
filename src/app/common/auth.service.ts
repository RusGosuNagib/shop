import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, tap} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.backendUrl + environment.backendPort + environment.backendUrlPassAuth}`

  /**
   * Constructor for the class.
   * @param http - The HttpClient instance to be injected.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Login function to authenticate user
   * @param user - The user model containing user credentials
   * @returns Observable of UserModel
   */
  login(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.authUrl, user)
      .pipe(
        tap(this.setToken)
      )
  }

  /**
   * Set the token in the local storage based on the response
   * @param response - The user model response containing the token information
   */
  private setToken(response: UserModel) {
    // Check if the response is valid
    if (response) {
      // Calculate the expiration date of the token
      const expiredDate = new Date(new Date().getTime() + +response.expiresIn * 1000)

      // Store the expiration date and the token in the local storage
      localStorage.setItem('fb-token-exp', expiredDate.toString())
      localStorage.setItem('fb-token', response.secureToken)
    } else {
      // Clear the local storage if the response is empty
      localStorage.clear()
    }
  }

  /**
   * Get the token from local storage and check if it's expired
   * If the token is expired, logout and return null
   * @returns {string|null} The token if it's not expired, otherwise null
   */
  get token(): string | null {
    // Get the expiration date from local storage
    const expiredDate = new Date(localStorage.getItem('fb-token-exp'));

    // Check if the token is expired
    if (new Date > expiredDate) {
      this.logout();
      return null;
    }

    // Return the token
    return localStorage.getItem('fb-token');
  }

  /**
   * Logs out the user by setting the token to null
   */
  logout(): void {
    this.setToken(null);
  }

  /**
   * Check if the user is authenticated based on the presence of a token.
   * @returns {boolean} - true if the user is authenticated, false otherwise
   */
  isAuthenticated() {
    return !!this.token
  }
}
