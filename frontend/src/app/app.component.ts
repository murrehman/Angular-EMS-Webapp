import { Component, OnInit } from '@angular/core';
import { AuthService } from './appServices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
    if (!sessionStorage.getItem('logged')) {
      this._authService.logoutUser();

    }
  }
}
