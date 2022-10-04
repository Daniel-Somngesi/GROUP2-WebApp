import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Blog } from 'src/app/Interface/blog.types';
import { CommunicationsService } from 'src/app/services/communications/communications.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-view-comuunication',
  templateUrl: './view-comuunication.component.html',
  styleUrls: ['./view-comuunication.component.css']
})
export class ViewComuunicationComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;
  record: Blog;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ViewComuunicationComponent>,
    @Inject(MAT_DIALOG_DATA) dataFromParent: any,
    private _snackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _communicationService: CommunicationsService,
  ) {
    this.record = dataFromParent.record as Blog;
  }

  ngOnInit(): void {
    this._buildForm();

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

  private _buildForm() {
    this.form = this._formBuilder.group({
      Title: [this.record.title, [Validators.required]],
      Message: [this.record.message, [Validators.required]],
    });

    this.Title.disable();
    this.Message.disable();
  }

  get Title() { return this.form.get('Title'); }
  get Message() { return this.form.get('Message'); }
}
