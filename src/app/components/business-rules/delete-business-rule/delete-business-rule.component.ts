import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusinessRule } from 'src/app/Interface/business-rules.types';
import { BusinessRulesService } from 'src/app/services/business-rules/business-rules.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddNewAcademicYearComponent } from '../../academic-years/add-new-academic-year/add-new-academic-year.component';

@Component({
  selector: 'app-delete-business-rule',
  templateUrl: './delete-business-rule.component.html',
  styleUrls: ['./delete-business-rule.component.css']
})
export class DeleteBusinessRuleComponent implements OnInit {
  displayProgressSpinner = false;
  form: FormGroup;

  record: BusinessRule;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DeleteBusinessRuleComponent>,
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
      this._businessRulesService.delete(this.record.id)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Delete", "Success");
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

      this.Name.disable();
      this.Description.disable();
      this.Value.disable();
    }
    else {
      this.openSnackBar("Could not initialise component", "Error");
    }

  }

  get Name() { return this.form.get('Name'); }
  get Description() { return this.form.get('Description'); }
  get Value() { return this.form.get('Value'); }
}
