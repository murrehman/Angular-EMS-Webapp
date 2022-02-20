import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/users/register"
  private _loginUrl = "http://localhost:3000/users/login"
  private _googleUrl = "https://localhost:5000/google"
  // private gAuthUrl = "https://localhost:5000/auth"
  private gAuthUrl = "http://localhost:3000/auth"

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user)
  }

  google() {
    // return this.http.get(this._googleUrl)
    // window.open("https://localhost:5000/google")
    return this.http.get(this._googleUrl)
  }

  googleLogin(user: any) {
    return this.http.post<any>(this.gAuthUrl, user);
  }

  // getToken() {
  //   return this.http.get('https://localhost:5000/google/callback')
  // }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }
}
