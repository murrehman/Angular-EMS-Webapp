import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../appServices/auth.service';
import { CookieService } from 'ngx-cookie-service';

import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { Subscription } from 'rxjs';
// import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  loginUserData: any = {}
  _user!: any;
  loggedIn!: boolean;
  cookee: any;
  subscription!: Subscription

  constructor(private _auth: AuthService, private router: Router, private auth: SocialAuthService, private cookie: CookieService) { }

  ngOnInit(): void {

    // this._auth.getToken().subscribe(res => {
    //   localStorage.setItem('token', JSON.stringify(res))
    // })

    // this.googleAuth.authState.subscribe((user) => {
    //   this._user = user;
    //   this.loggedIn = (user != null);
    //   console.log(this._user)
    //   localStorage.setItem('token', this._user)
    // });

    // this._auth.googleLogin(this.user).subscribe(res => {
    //   console.log(res);
    //   localStorage.setItem('x-auth-cookie', res.token);
    // })
    // this.cookee = this.cookie.get('x-auth-cookie');
    // console.log(this.cookee)




  }

  loginUser() {
    this.subscription = this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        sessionStorage.setItem('logged', 'true');
        localStorage.setItem('token', res.token);
        this.router.navigate(['/employee'])

        this._auth.autoLogoutUSer(res.expiresIn)
      },
      err => console.log(err));

  }

  // googleLogIn(data: any) {
  //   this._auth.googleLogin(data).subscribe(res => {
  //     console.log(res);
  //     localStorage.setItem('token', res.token);
  //     this.router.navigate(['/employee'])
  //   })
  // }

  googleSignIn() {
    this.auth.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      console.log(data);

      this._auth.googleLogin(data).subscribe(res => {
        console.log(res.token);

        localStorage.setItem('token', res.token)
        this.router.navigate(['/employee'])
      })

    })
    // this.cookee = this.cookie.get('x-auth-cookie');
    // console.log(this.cookee)
    console.log("======================333333333333333333");
    // console.log(res);

    // localStorage.setItem('token', this.cookee)

    // this._auth.google().subscribe(() => {
    //   this.cookee = this.cookie.get('x-auth-cookie');
    //   console.log(this.cookee)
    //   localStorage.setItem('token', this.cookee)
    // })

  }

  // getCookie() {
  //   this.cookee = this.cookie.get('x-auth-cookie');
  //   console.log(this.cookee)
  //   localStorage.setItem('token', this.cookee)
  // }


  // googleSignOut(): void {
  //   this.googleAuth.signOut();
  // }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}

