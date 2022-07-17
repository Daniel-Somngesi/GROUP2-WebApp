import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Application } from 'src/app/Interface/Interface';

@Component({
  selector: 'app-view-application-details',
  templateUrl: './view-application-details.component.html',
  styleUrls: ['./view-application-details.component.css']
})
export class ViewApplicationDetailsComponent implements OnInit {

  application: Application;
  constructor(
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
  ) {
    this.application = dataFromParent.application;
  }

  ngOnInit(): void {
  }

}
