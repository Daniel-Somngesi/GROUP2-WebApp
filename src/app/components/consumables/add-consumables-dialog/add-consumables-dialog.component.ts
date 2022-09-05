import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { ConsumablesService } from 'src/app/services/consumables/consumables.service';

@Component({
  selector: 'app-add-consumables-dialog',
  templateUrl: './add-consumables-dialog.component.html',
  styleUrls: ['./add-consumables-dialog.component.css']
})
export class AddConsumablesDialogComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddConsumablesDialogComponent>,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _consumablesService: ConsumablesService) { }

  ngOnInit(): void {
    this._buildForm(this._formBuilder);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.openSnackBar("Provide all required input", "Error");
    }
    else {
      this._consumablesService.createConsumable(this.form.value)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Add", "Success");
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
    this.form = formFb.group({
      Name: ['', [Validators.required]]
    });
  }
  get Name() { return this.form.get('Name'); }

}
