import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isShow = false;

  constructor(private _router: Router) { }

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
    this._router.navigate(['all-applications']);
  }
  ongoToChildren() {
    this._router.navigate(['list-children']);
  }

  onGoToReportsDashboard() {
    this._router.navigate(['reports-dashboard']);
  }
}
