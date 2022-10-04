import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Activity } from 'src/app/Interface/activity.types';
import { UserRoleData } from 'src/app/Interface/Interface';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { UserRoleService } from 'src/app/services/user-role.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { DeleteActivityComponent } from '../../activities/delete-activity/delete-activity.component';

@Component({
  selector: 'app-delete-user-role-delete',
  templateUrl: './delete-user-role-delete.component.html',
  styleUrls: ['./delete-user-role-delete.component.css']
})
export class DeleteUserRoleDeleteComponent implements OnInit {
  displayProgressSpinner = false;
  record: UserRoleData;
  constructor(
    public dialogRef: MatDialogRef<DeleteUserRoleDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _matSnackBar: MatSnackBar,
    private _userRolesService: UserRoleService
  ) {
    this.record = dataFromParent.record as UserRoleData;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._userRolesService.delete(this.record.userRole_Id)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.displayProgressSpinner = false;

            this.openSnackBar("Delete User Role", "Success");
            this.closeDialog();
          }
        },
        error: (error) => {
          window.location.reload()
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
