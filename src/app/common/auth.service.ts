import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _firebaseUrl = `${environment.firebaseUrlPassAuth}${environment.apiKey}`
  constructor(private http: HttpClient) { }

  login(user: object){
    return this.http.post(this._firebaseUrl, user)
  }
}

// gamach666@gmail.com/123456
