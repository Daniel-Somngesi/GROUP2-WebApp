import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { TokenStorageService } from './services/token-storage.service';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EasyTechWebApp';
  isLoggedIn = false;


  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.tokenStorageService.isLoggedIn();
  }

  logout(): void {
    this.tokenStorageService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
    return;
  }
}
