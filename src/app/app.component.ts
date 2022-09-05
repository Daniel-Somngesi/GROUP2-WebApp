import { Component, ViewChild } from '@angular/core';
import { CurrentUser } from './helpers/types/auth.types';
import { AuthService } from './services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EasyTechWebApp';

  constructor(
    private _authService: AuthService,

  ) {
    this._setUser();
  }

  ngOnInit() {
  }

  logout(): void {
    this._authService.signOut();
    return;
  }

  user: CurrentUser;
  private _setUser() {
    if (this._authService.isSignedIn()) {
      this.user = this._authService.currentUser;
    }
  }

  get isAdmin() {
    if (this._authService.isSignedIn()) {
      this.user = this._authService.currentUser;
      if (this.user.EmployeeType == 'Admin' || this.user.UserRole == 'administrator') {
        return true;
      }
      else {
        return false;
      }
    }
    return false;
  }
}
