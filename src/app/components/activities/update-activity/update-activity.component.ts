import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Activity } from 'src/app/Interface/activity.types';
import { Company } from 'src/app/Interface/company.types';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { UpdateCompanyComponent } from '../../companies/update-company/update-company.component';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent implements OnInit {
  displayProgressSpinner = false;
  record: Activity;
  activityFormGroup: FormGroup;
  companies: Company[] = [];

  start: Date = new Date();
  end: Date = new Date();
  minDate: any = new Date().toISOString().slice(0, 10);

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateActivityComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _activitiesServie: ActivitiesService,
    private _companyService: CompanyService
  ) {
    this.record = dataFromParent.record as Activity;
  }

  ngOnInit(): void {
    this._getCompaniesFromServer();
  }

  onSubmit() {
    let payload: any = {};
    payload['Name'] = this.ActivityName.value;
    payload['CompanyId'] = this.CompanyId.value;
    payload['Start'] = this.start;
    payload['End'] = this.end;

    let valid = true;
    let currentDateTime = new Date().toJSON();

    if (JSON.stringify(this.end) <= JSON.stringify(this.start)) {
      this.openSnackBar("To date time should be greater than From date time", "Error");
      valid = false;
    }

    if (valid) {

      this._activitiesServie.update(this.record.id,payload)
        .subscribe({
          next: (event => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }

            if (event.type === HttpEventType.Response) {
              this.openSnackBar("Update Activity", "Success");
              this.displayProgressSpinner = false;
              // window.location.reload();
              this.closeDialog();
            }
          }),
          error: (error => {
            this.displayProgressSpinner = false;
            this._openErrorMessageSnackBar(error.error.message);
          }),
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

  private _buildActivityForm() {
    this.activityFormGroup = this._formBuilder.group({
      ActivityName: [this.record.name, [Validators.required]],
      CompanyId: [this.record.companyId, [Validators.required]],
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
    });
    this.start = this.record.start as any;
    this.end = this.record.end as any;
  }

  get ActivityName() { return this.activityFormGroup.get('ActivityName'); }
  get CompanyId() { return this.activityFormGroup.get('CompanyId'); }

  private _getCompaniesFromServer() {
    this._companyService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.companies = event.body as Company[];
            this.displayProgressSpinner = false;
            this._buildActivityForm();
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
