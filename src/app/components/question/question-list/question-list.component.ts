import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
import { QuestionService } from './../../../services/question.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionData } from 'src/app/Interface/Interface';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questionForm:any;
  questions:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  currentQuestion:any = null;
  questionIdUpdate = null;
  question_Id = null;
  question_Text : string = "";

  constructor(private route: ActivatedRoute, private formbulider: FormBuilder, private service: QuestionService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveQuestions();
    this.questionForm = this.formbulider.group({
      question_Text: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  retrieveQuestions(): void {
    this.service.getAll()
      .subscribe(
        data => {
          this.questions = data;
        },
        error => {
          console.log(error);
        });
      }

      onFormSubmit() {
        const _question = this.questionForm.value;
        this.CreateQuestion(_question);
      }

      loadQuestionToEdit(question_Id:any) {
        this.service.get(question_Id).subscribe(question => {
          this.questionIdUpdate = question.question_Id;
          this.questionForm.controls['question_Text'].setValue(question.question_Text);

        });
    }

      deleteQuestion(id: any) {
        if (confirm("Are you sure you want to delete this question?")) {
          this.service.delete(id).subscribe(() => {
            this.SavedSuccessful(2);
            this.retrieveQuestions();
            this.questionForm.reset();

          });
        }
      }

      CreateQuestion(question: QuestionData) {
        if (this.questionIdUpdate == null) {

          this.service.create(question).subscribe(
            () => {
              this.SavedSuccessful(1);
              this.retrieveQuestions();
              this.questionIdUpdate = null;
              this.questionForm.reset();
            }
          );
        } else {
          question.question_Id = this.questionIdUpdate;
          question.question_Text = this.question_Text;
          this.service.update(question.question_Id, question).subscribe(() => {
            this.SavedSuccessful(0);
            this.retrieveQuestions();
            this.questionIdUpdate = null;
            this.questionForm.reset();
          });
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
          this._snackBar.open('Record Saved Successfully!', 'Close', {
            duration: 2000,
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
    }
