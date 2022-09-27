import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/helpers/types/auth.types';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isShow = false;
  displayProgressSpinner = false;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _matSnackBar: MatSnackBar
  ) {
    this.displayProgressSpinner = false;
    this._setUser();
  }

  ngOnInit(): void {
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  onGoToSchedule() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    this._router.navigate(['schedule', currentYear]);
  }

  onGoToApplications() {
    if (!this.isAdmin) {
      this.openSnackBar("Only Admins can perform this operation", "Info");
    }
    else {
      this._router.navigate(['all-applications']);
    }
  }

  ongoToChildren() {
    this._router.navigate(['list-children']);
  }

  onGoToReportsDashboard() {
    this._router.navigate(['reports-dashboard']);
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 3000,
    });
  }

  user: CurrentUser;
  private _setUser() {
    if (this._authService.isSignedIn()) {
      this.user = this._authService.currentUser;
    }
    else {
      this._authService.signOut();
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
