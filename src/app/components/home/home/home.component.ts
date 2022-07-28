import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isShow = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}
