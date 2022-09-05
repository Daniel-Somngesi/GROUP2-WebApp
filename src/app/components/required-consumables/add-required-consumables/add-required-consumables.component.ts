import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Class } from 'src/app/Interface/class.types';
import { Consumable } from 'src/app/Interface/consumable.types';
import { ConsumablesService } from 'src/app/services/consumables/consumables.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-add-required-consumables',
  templateUrl: './add-required-consumables.component.html',
  styleUrls: ['./add-required-consumables.component.css']
})
export class AddRequiredConsumablesComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;

  consumables: Consumable[] = [];
  record: Class;
  requiredConsumables: any[] = [];



  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddRequiredConsumablesComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _consumablesService: ConsumablesService
  ) {
    this.record = dataFromParent.record as Class;
  }

  ngOnInit(): void {
    this._getConsumablesFromServer();

  }

  onSubmit() {
    let isValid = true;

    if (this.requiredConsumables.length < 1) {
      this.openSnackBar("Add atleast one requested consumable", "Info");
      isValid = false;
    }

    if (isValid) {
      let payload: any = {};
      payload['ClassId'] = this.record.id;
      payload['RequestedConsumables'] = this.requiredConsumables;

      console.log(payload)
      this._consumablesService.addRequestedConsumables(payload)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Add Requested consumables for class", "Success");
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

  onAddToList() {
    let isValid = true;
    let consumableInList = this.requiredConsumables.filter(o => o.Name == this.ConsumableName.value);
    if (consumableInList.length > 0) {
      this.openSnackBar("Consumable already added to list", "Error");
      isValid = false;
    }
    if(this.Quantity.value == ''){
      this.openSnackBar("Quantity is required", "Error");
      isValid = false;
    }
    if (isValid) {
      let consumable = { Name: this.ConsumableName.value, Quantity: this.Quantity.value };
      this.requiredConsumables.push(consumable);
      console.log(this.requiredConsumables)
      this.form.reset();

    }
  }

  onRemoveFromList(consumable) {
    let consumableInLst = this.requiredConsumables.find(o => o.Name == consumable.Name);
    const index = this.requiredConsumables.indexOf(consumableInLst);
    if (index > -1) {
      this.requiredConsumables.splice(index, 1);
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

  private _getConsumablesFromServer() {
    this._consumablesService.getAllConsumables()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Consumable[];
            this.consumables = res;
            this._buildForm(this._formBuilder);
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

  private _buildForm(formFb: FormBuilder) {
    this.form = formFb.group({
      Quantity: ['', [Validators.required]],
      ConsumableName: ['', [Validators.required]],
    });
  }

  get Quantity() { return this.form.get('Quantity'); }
  get ConsumableName() { return this.form.get('ConsumableName'); }
}
