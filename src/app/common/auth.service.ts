import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _firebaseUrl = `${environment.firebaseUrlPassAuth}${environment.apiKey}`
  constructor(private http: HttpClient) { }

  login(user: object){
    return this.http.post(this._firebaseUrl, user)
      .pipe(
        tap(this.setToken)
      )
  }

  private setToken (response: object){
    if (response){
      const expiredDate = new Date(new Date().getTime() + +(<any>response).expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expiredDate.toString())
      localStorage.setItem('fb-token', (<any>response).idToken)
    } else {
      localStorage.clear()
    }
  }

  get token(){
    const expiredDate = new Date(localStorage.getItem('fb-token-exp'))
    if(new Date > expiredDate){
      this.logout()
      return null;
    }
    return localStorage.getItem('fb-token');
  }
  logout(){
    this.setToken(null)
  }
  isAuthenticated(){
    return !!this.token
  }
}

// gamach666@gmail.com/123456
