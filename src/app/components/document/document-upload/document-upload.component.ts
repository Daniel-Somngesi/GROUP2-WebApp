import { DocumentData } from './../../../Interface/Interface';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { DeleteDocumentComponent } from '../delete-document/delete-document.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent {
  @Input()
  requiredFileType!: string;

  endpointBase = environment.apiUrl;
  displayProgressSpinner = false;
  uploadErrorMessage;

  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  fileName = '';
  uploadProgress!: any;
  uploadSub!: any;
  name!: string;
  size!: string;
  response!: { dbPath: '' };
  document: any;
  documents: DocumentData[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  descr: any;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getDocuments();
  }

  onCreate = () => {
    this.document = {
      Name: this.name,
      DocPath: this.response,
      Description: this.descr
    }

    let isValid = true;
    if (this.document.Description == undefined) {
      this.openSnackBar("Please provide file description", "Error");
      isValid = false;
    }
    if (isValid) {
      this.http.post(this.endpointBase.concat("Document"), this.document, { reportProgress: true, observe: 'events', headers: this.headers })
        .subscribe({
          next: (event) => {
            if (event.type == HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.getDocuments();
              this.SavedSuccessful(1);
              window.location.reload()

            }
          },
          error: (error) => {
            this.displayProgressSpinner = false;
            this._openErrorMessageSnackBar(error.error.message);
          }
        });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    let isValid = true;

    if (file) {
      let formData = this.validateUpload(file);
      if (formData == undefined) {
        isValid = false;
        return; //Don't procced. validateUpload() returned an error.
      }

      if (isValid) {
        this.fileName = file.name;
        this.name = file.name;
        this.size = "File size: " + (file.size / 1000).toFixed(2) + " KB";

        let uploadEndpoint = this.http.post(this.endpointBase.concat("UploadDocs"), formData, { reportProgress: true, observe: 'events', headers: this.headers })
        this.uploadSub = uploadEndpoint
          .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round(100 * event.loaded / event.total);
            }
            if (event.type === HttpEventType.Response) {
              let res = event.body as any;
              this.response = res.dbPath;
            }
          }, error => {
            this._openErrorMessageSnackBar(error.error.message);
          });
      }
    }
    else {
      this.openSnackBar("Select a file to upload", "Error");
    }
  }

  private getDocuments = () => {
    this.http.get(this.endpointBase.concat("Document"), { reportProgress: true, observe: 'events', headers: this.headers })
      .subscribe({
        next: (res) => {
          if (res.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (res.type == HttpEventType.Response) {
            this.documents = res.body as DocumentData[]
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

  SavedSuccessful(isUpdate: any) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 1) {
      this._snackBar.open('Document Data Saved Successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onDeleteValue(value: DocumentData) {
    let dialogRef = this._matDialog.open(DeleteDocumentComponent, {
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getDocuments();
    });
  }

  private _openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._snackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      }
    });
  }

  private validateUpload(files) {
    let hasUploadError = false;
    if (files.length === 0) {
      hasUploadError = true;
      return;
    }

    let fileToUpload = <File>files;
    if (validFileExtensionsWithoutZip.includes(fileToUpload.type) == false) {
      this.openSnackBar("Accepted formats [.pdf,.docx]", "Error")
      hasUploadError = true;
      return;
    }

    if (fileToUpload.size > maxUploadSize) {
      this.uploadErrorMessage = "Error: File too big.";
      this.openSnackBar("File too big. File cannot be more than 20MB", "Error")
      hasUploadError = true;
      return;
    }

    if (!hasUploadError) {
      let formData = new FormData();
      // formData.append('file', fileToUpload, fileToUpload.name);
      formData.append("thumbnail", fileToUpload);
      return formData;
    }
  }
}

export let validFileExtensionsWithoutZip = [
  "application/pdf",
  ".doc",
  ".docx",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

export let maxUploadSize = 20000000; //20MB
