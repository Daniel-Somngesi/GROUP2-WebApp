import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestedConsumable } from 'src/app/Interface/consumable.types';
import { Enrollment } from 'src/app/Interface/enrollment.types';
import { ConsumablesService } from 'src/app/services/consumables/consumables.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-receive-consumables',
  templateUrl: './receive-consumables.component.html',
  styleUrls: ['./receive-consumables.component.css']
})
export class ReceiveConsumablesComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;

  requestedConsumables: RequestedConsumable[] = [];
  enrollment: Enrollment;
  receivedConsumabled: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReceiveConsumablesComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _consumablesService: ConsumablesService
  ) {
    this.enrollment = dataFromParent.record as Enrollment
  }

  ngOnInit(): void {
    this._getRequestedConsumables();
  }

  onSubmit() {
    let isValid = true;

    if (this.receivedConsumabled.length != this.requestedConsumables.length) {
      console.log(this.receivedConsumabled)
      this.openSnackBar("Provide quantity for all consumables. Set zero if consumable not received", "Info");
      isValid = false;
    }

    if (isValid) {
      let payload: any = {};
      payload['ReceivedConsumables'] = this.receivedConsumabled;

      this._consumablesService.receiveConsumables(payload)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Recieve Consumables", "Success");
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

  private _getRequestedConsumables() {
    this._consumablesService.getAllRequestedConsumablesByChildId(this.enrollment.childId)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as RequestedConsumable[];
            this.requestedConsumables = res;
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

  onAddToList(recivedQuantity: any, consumable: RequestedConsumable) {
    let isValid = true;
    if (recivedQuantity < 0) {
      this.openSnackBar("Quantity cannot be less than zero", "Error");
      isValid = false;
    }
    if (isValid) {
      let consumableToAdd = {
        ConsumableId: consumable.consumableId,
        EnrollmentId: consumable.enrollmentId,
        RequestedQuantity: consumable.quantity,
        ReceivedQuantity: recivedQuantity,
      };

      let isConsumableInlist = this.receivedConsumabled.filter(o => o.ConsumableId == consumableToAdd.ConsumableId);
      if (isConsumableInlist.length == 0) {
        this.receivedConsumabled.push(consumableToAdd);
        this.openSnackBar("Quantity captured", "Info");
      }
      else {
        this.openSnackBar("Consumable quantity already captured", "Info");
      }

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
      Child: [this.enrollment.childFullName, [Validators.required]],
      Class: [this.enrollment.className, [Validators.required]],
      ChildId: [this.enrollment.childId, [Validators.required]],
      ClassId: [this.enrollment.classId, [Validators.required]],
    });

    this.Child.disable();
    this.Class.disable();
  }

  get Child() { return this.form.get('Child'); }
  get Class() { return this.form.get('Class'); }
  get ClassId() { return this.form.get('ClassId'); }
  get ChildId() { return this.form.get('ChildId'); }
}
