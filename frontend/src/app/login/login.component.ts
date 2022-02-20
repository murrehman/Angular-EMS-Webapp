import { Component, OnInit } from '@angular/core';
import { AuthService } from '../appServices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerUserData: any = {}

  constructor(private _auth: AuthService, private router: Router) { }

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

}
