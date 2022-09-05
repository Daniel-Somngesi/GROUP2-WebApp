import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { BusinessRule } from 'src/app/Interface/business-rules.types';
import { BusinessRulesService } from 'src/app/services/business-rules/business-rules.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { UpdateBusinessRuleComponent } from '../../business-rules/update-business-rule/update-business-rule.component';
import { Consumable } from 'src/app/Interface/consumable.types';
import { ConsumablesService } from 'src/app/services/consumables/consumables.service';

@Component({
  selector: 'app-edit-consumables-dialog',
  templateUrl: './edit-consumables-dialog.component.html',
  styleUrls: ['./edit-consumables-dialog.component.css']
})
export class EditConsumablesDialogComponent implements OnInit {
  displayProgressSpinner = false;
  form: FormGroup;

  record: Consumable;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditConsumablesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _consumablesService: ConsumablesService) {
    this.record = dataFromParent.record as Consumable;

  }

  ngOnInit(): void {
    this._buildForm(this._formBuilder);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._consumablesService.updateConsumable(this.record.id, this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Update", "Success");
              this.closeDialog();
            }
          },
          error: (error) => {
            this.displayProgressSpinner = false;
            this._openErrorMessageSnackBar(error.error.message);
          },
          complete: () => {
            this.displayProgressSpinner = false;
          }
        });
    }

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

  private _buildForm(formFb: FormBuilder) {
    if (this.record != null) {
      this.form = formFb.group({
        Name: [this.record.name, [Validators.required]],
      });
    }
    else {
      this.openSnackBar("Could not initialise component", "Error");
    }

  }

  get Name() { return this.form.get('Name'); }
}
