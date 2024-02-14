import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _firebaseUrl = `${environment.firebaseUrlPassAuth}${environment.apiKey}`

  constructor(private http: HttpClient) {
  }

  login(user: UserModel) {
    return this.http.post<UserModel>(this._firebaseUrl, user)
      .pipe(
        tap(this.setToken)
      )
  }

  private setToken(response: UserModel) {
    if (response) {
      const expiredDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expiredDate.toString())
      localStorage.setItem('fb-token', response.idToken)
    } else {
      localStorage.clear()
    }
  }

  get token() {
    const expiredDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date > expiredDate) {
      this.logout()
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated() {
    return !!this.token
  }
}
