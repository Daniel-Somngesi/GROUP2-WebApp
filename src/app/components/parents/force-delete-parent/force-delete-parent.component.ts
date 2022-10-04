import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Parent } from 'src/app/helpers/types/parent.types';
import { ParentService } from 'src/app/services/parent/parent.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-force-delete-parent',
  templateUrl: './force-delete-parent.component.html',
  styleUrls: ['./force-delete-parent.component.css']
})
export class ForceDeleteParentComponent implements OnInit {
  displayProgressSpinner = false;
  record: Parent;
  constructor(
    public dialogRef: MatDialogRef<ForceDeleteParentComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _matSnackBar: MatSnackBar,
    private _parentService: ParentService
  ) {
    this.record = dataFromParent.record as Parent;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._parentService.delete(this.record.parent_ID)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.displayProgressSpinner = false;

            this.openSnackBar("Force Delete Parent", "Success");
            this.closeDialog();
          }
        },
        error: (error) => {window.location.reload()
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
        },
        complete: () => {
          window.location.reload()
          this.displayProgressSpinner = false;
        }
      });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
    window.location.reload()
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
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
