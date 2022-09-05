import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'custom-error-snack-bar',
  templateUrl: './custom-error-snack-bar.component.html',
  styleUrls: ['./custom-error-snack-bar.component.scss']
})
export class CustomErrorSnackBarComponent {
  errorMessage: string = "";
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data) {
    this.errorMessage = data.parent;
  }

  dismiss() {
    this.data.preClose();
  }
}
