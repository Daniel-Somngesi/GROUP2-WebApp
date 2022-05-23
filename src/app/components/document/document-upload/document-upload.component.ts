import { DocumentData, DocumentToCreate } from './../../../Interface/Interface';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DocumentService } from 'src/app/services/document.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent  {


  @Input()
    requiredFileType!:string;

    isCreate!: boolean;
    fileName = '';
    uploadProgress!:any;
    uploadSub!: any;
    name!:string;
    size!:string;
    response!: {dbPath: ''};
    document: any;
    documents: DocumentData[] = [];
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

    ngOnInit(){
      this.getDocuments();
      this.isCreate = true;
    }

    onCreate = () => {
      this.document = {
        document_Name: this.name,
        docPath: this.response
      }
      this.http.post('https://localhost:44341/api/Document/', this.document)
    .subscribe({
      next: _ => {
        this.getDocuments();
        this.isCreate = false;
        this.SavedSuccessful(1);
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
    }

    private getDocuments = () => {
      this.http.get('https://localhost:44341/api/Document/')
      .subscribe({
        next: (res) => this.documents = res as DocumentData[],
        error: (err: HttpErrorResponse) => console.log(err)
      });
    }

    returnToCreate = () => {
      this.isCreate = true;
      this.name = '';
      this.fileName = '';
    }

    public createDocPath = (serverPath: string) => {
      return `https://localhost:44341/${serverPath}`;
    }


    onFileSelected(event:any) {
        const file:File = event.target.files[0];

        if (file) {
            this.fileName = file.name;
            this.name = file.name;
            this.size = "File size: " + (file.size/1000).toFixed(2) + " KB";
            const formData = new FormData();
            formData.append("thumbnail", file);

            const upload$ = this.http.post("https://localhost:44341/api/UploadDocs", formData, {
                reportProgress: true,
                observe: 'events'
            })
            .pipe(
                finalize(() => this.reset())
            );

            this.uploadSub = upload$.subscribe((event:any) => {
              if (event.type == HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total));

              }
              if (event.type === HttpEventType.Response) {
                console.log(event.body);
                this.response = event.body.dbPath;
                console.log(this.response);
              }
            })
        }
    }

    SavedSuccessful(isUpdate:any) {
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
}
