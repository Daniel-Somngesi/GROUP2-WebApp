import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/Interface/employee.types';

@Component({
  selector: 'app-view-employee-address',
  templateUrl: './view-employee-address.component.html',
  styleUrls: ['./view-employee-address.component.css']
})
export class ViewEmployeeAddressComponent implements OnInit {

  employee: Employee;
  constructor(
    public dialogRef: MatDialogRef<ViewEmployeeAddressComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
  ) {
    this.employee = dataFromParent.record as Employee;

  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
