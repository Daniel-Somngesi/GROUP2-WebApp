import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionLog } from 'src/app/Interface/logs.types';
import { BusinessRulesService } from 'src/app/services/business-rules/business-rules.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-view-log-values',
  templateUrl: './view-log-values.component.html',
  styleUrls: ['./view-log-values.component.css']
})
export class ViewLogValuesComponent implements OnInit {
  displayProgressSpinner = false;
  form: FormGroup;

  record: TransactionLog;
  oldValues;
  newValues;
  constructor(
    public dialogRef: MatDialogRef<ViewLogValuesComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar) {
    this.record = dataFromParent.record as TransactionLog;

    this.oldValues = this.record.oldValues;
    this.newValues = this.record.newValues;


  }

  ngOnInit(): void {
  }



  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private _openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._matSnackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      }
    });
  }


}
