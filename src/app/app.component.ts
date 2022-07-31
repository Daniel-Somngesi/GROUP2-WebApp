import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from './models';
import { AuthService } from './services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EasyTechWebApp';
  isLoggedIn = false;


  constructor(
     private router: Router,
     private _authService:AuthService
     ) { }

  ngOnInit() {
    this.isLoggedIn = this._authService.isSignedIn();
  }

  logout(): void {
    this._authService.signOut();
    this.router.navigate(['login']);
    return;
  }
}
