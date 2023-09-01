import { Component, OnInit } from '@angular/core';
import { AuthService } from '../appServices/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerUserData: any = {}

  constructor(private _auth: AuthService, private router: Router, private auth: SocialAuthService) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/employee'])
      },
      err => console.log(err)
    )
    // this.router.navigate(['/employee'])
  }

  googleSignup() {
    this.auth.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      console.log(data);

      this._auth.googleLogin(data).subscribe(res => {
        console.log(res.token);

        localStorage.setItem('token', res.token)
        this.router.navigate(['/employee'])
      })

    })
  }

}
