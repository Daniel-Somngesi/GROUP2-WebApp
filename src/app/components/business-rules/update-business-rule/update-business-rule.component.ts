import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessRule } from 'src/app/Interface/business-rules.types';
import { BusinessRulesService } from 'src/app/services/business-rules/business-rules.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-update-business-rule',
  templateUrl: './update-business-rule.component.html',
  styleUrls: ['./update-business-rule.component.css']
})
export class UpdateBusinessRuleComponent implements OnInit {
  displayProgressSpinner = false;
  form: FormGroup;

  record: BusinessRule;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateBusinessRuleComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _businessRulesService: BusinessRulesService) {
    this.record = dataFromParent.record as BusinessRule;

  }

  ngOnInit(): void {
    this._buildForm(this._formBuilder);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._businessRulesService.update(this.record.id, this.form.value)
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
        Description: [this.record.description, [Validators.required]],
        Value: [this.record.value, [Validators.required]],
      });
    }
    else {
      this.openSnackBar("Could not initialise component", "Error");
    }

  }

  get Name() { return this.form.get('Name'); }
  get Description() { return this.form.get('Description'); }
  get Value() { return this.form.get('Value'); }
}
