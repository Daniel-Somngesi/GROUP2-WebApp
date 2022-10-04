import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import { BlogService } from 'src/app/services/blog/blog.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-create-block',
  templateUrl: './create-block.component.html',
  styleUrls: ['./create-block.component.css']
})
export class CreateBlockComponent implements OnInit {

  displayProgressSpinner = false;

  richTextForm: FormGroup;
  modules = {}
  constructor(
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _blogService: BlogService,
    private _router: Router
  ) {
    this.modules = {
      blotFormatter: {
        // empty object for default behaviour.
      },
      'toolbar': {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],

          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],

          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['link', 'image'],

        ],
      }
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    let isValid = true;

    let payload = {
      Message: "",
      Title: ""
    }
    payload.Message = this.Message.value;
    payload.Title = this.Title.value;

    if (payload.Title.length == 0) {
      isValid = false;
      this.openSnackBar("Error", "Please provide a title");
      return;
    }

    if (payload.Message.length == 0) {
      isValid = false;
      this.openSnackBar("Error", "Please provide message");
      return;
    }

    if (isValid) {
      this._blogService.create(payload)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;

              this.openSnackBar("Write new blog", "Success");
              this._router.navigate(['list-blogs']);

            }
          },
          error: (error) => {
            this.displayProgressSpinner = false;
            this._openErrorMessageSnackBar(error.error.message);
          }
        });
    }

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


  private buildForm() {
    this.richTextForm = this._formBuilder.group({
      Title: [""],
      Message: ['']
    });
  }

  get Message() {
    return this.richTextForm.get('Message') as FormControl;
  }
  get Title() {
    return this.richTextForm.get('Title') as FormControl;
  }

}
