import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SurveyAnswersPool } from 'src/app/Interface/survey.types';
import { SurveyAnswersPoolService } from 'src/app/services/survey-answers-pool/survey-answers-pool.service';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';

@Component({
  selector: 'app-add-survey-dialog',
  templateUrl: './add-survey-dialog.component.html',
  styleUrls: ['./add-survey-dialog.component.scss']
})
export class AddSurveyDialogComponent implements OnInit {
  displayProgressSpinner = false;

  form: FormGroup;
  questionpoolFormGroup: FormGroup;
  minDate: any = new Date().toISOString().slice(0, 10);

  showAddQuestionSection = false;
  questionsList: any[] = [];
  questionIndex = 0;

  answersPool: SurveyAnswersPool[] = [];
  questionsPool: SurveyAnswersPool[] = [];
  justAnswersInPool: string[] = [];

  questionFromDropDown: string = "";

  @ViewChild('answerInput') answerInput: ElementRef;
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _surveyAnswersPoolService: SurveyAnswersPoolService,
    private _surveyService: SurveyService
  ) { }

  ngOnInit() {
    this._getAnswersFromPool();
    this._getQuestionsFromPool();
    this._buildForm(this._formBuilder);

  }

  onSubmit() {
    let isInvalid = false;
    this.questionsList.forEach(o => {
      if (o.PossibleAnswers.length < 2) {
        this._openSnackBar("All questions must have atleast 2 possible answers", "Info");
        isInvalid = true;
      }
    });

    if (this.form.invalid) {
      this._openSnackBar("Provide survey details", "Error");
      isInvalid = true;
    }
    else {
      if (this.EndDate.value <= this.StartDate.value) {
        this._openSnackBar("End date must be ahead of start date", "Error");
        isInvalid = true;
      }
    }

    if (!isInvalid) {
      let payload = {};
      payload['Name'] = this.Name.value;
      payload['StartDate'] = this.StartDate.value;
      payload['EndDate'] = this.EndDate.value;
      payload['Questions'] = this.questionsList;

      this._surveyService.create(payload)
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }
            if (event.type == HttpEventType.Response) {
              this.displayProgressSpinner = false;
              this._openSnackBar("Create Survey", "Success");
              this._router.navigate(['/list-surveys']);
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

  onShowAddNewQuestionToList() {
    if (this.form.invalid) {
      this._openSnackBar("Provide survey details", "Error");
    }
    else {
      if (this.EndDate.value <= this.StartDate.value) {
        this._openSnackBar("End date must be ahead of start date", "Error");
      }
      else {
        this.showAddQuestionSection = true;
      }
    }
  }

  onAddNewQuestionToList(newQuestionTitle: string) {
    console.log(newQuestionTitle);
    console.log(this.questionFromDropDown);
    let isValid = true;
    let questionToAdd = "";
    if (newQuestionTitle.length == 0 && this.questionFromDropDown == "") {
      this._openSnackBar("Question title is required", "Error");
      isValid = false;
      return;
    }

    if (this.questionFromDropDown != "") {
      questionToAdd = this.questionFromDropDown;
    }

    if (newQuestionTitle.length != 0) {
      let payload: any = {};
      payload["QuestionText"] = newQuestionTitle;
      this.onAddQuestionToPool(payload);
      questionToAdd = newQuestionTitle;
    }

    if (isValid) {
      if (this.questionsList.find(o => o.Title.toLowerCase() == questionToAdd.toLowerCase())) {
        this._openSnackBar("Question with same title already added", "Info");
      }
      else {
        this.showAddQuestionSection = false;
        this.questionIndex += 1;
        let questionsPayload: any = {
          Title: questionToAdd,
          PossibleAnswers: []
        }
        this.questionsList.push(questionsPayload);
      }
    }
  }

  onRemoveQuestion(questionTitle: string) {
    let elementToRemove = this.questionsList.find(o => o.Title.toLowerCase() == questionTitle.toLowerCase());
    if (elementToRemove) {
      let index = this.questionsList.indexOf(elementToRemove);
      if (index > -1) {
        this.questionsList.splice(index, 1);

        this.questionsList.forEach(item => {
          let adjustedIndex = this.questionsList.indexOf(item) + 1;
          item.Index = adjustedIndex;
        });
        this._openSnackBar("Question removed from survey questions", "Info");
      }
    }
  }

  addAnswerToPossibleAnswers(questiontext: string, answerText: string) {
    if (answerText.length == 0) {
      this._openSnackBar("answer text is required", "Error");
    }
    else {
      this.questionsList.forEach(o => {
        if (o.Title == questiontext) {
          if (o.PossibleAnswers.includes(answerText)) {
            this._openSnackBar("Answer already added to list", "Info");
          }
          else {
            o.PossibleAnswers.push(answerText);
            //clear input
            this.answerInput.nativeElement.value = "";
          }
        }
      });
    }

  }

  onRemoveAnswerFromList(questiontext: string, answerText: string) {
    this.questionsList.forEach(o => {
      if (o.Title == questiontext) {
        if (o.PossibleAnswers.includes(answerText)) {
          let index = o.PossibleAnswers.indexOf(answerText);
          if (index > -1) {
            o.PossibleAnswers.splice(index, 1);
            this._openSnackBar("Answer removed from list", "Info");
          }
        }
      }
    });
  }

  private _getAnswersFromPool() {
    this._surveyAnswersPoolService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as SurveyAnswersPool[];
            this.answersPool = res;
            this.displayProgressSpinner = false;
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

  private _getQuestionsFromPool() {
    this._surveyAnswersPoolService.questionsPoolgetAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as SurveyAnswersPool[];
            this.questionsPool = res;
            this.displayProgressSpinner = false;
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

  private _openSnackBar(message: string, action: string) {
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

  private _buildForm(formFb: FormBuilder) {
    this.form = formFb.group({
      Name: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    });
  }

  onAddQuestionToPool(payload: any) {

    this._surveyAnswersPoolService.questionsPoolcreate(payload)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.displayProgressSpinner = false;

            this.openSnackBar("New Question Added To Pool", "Success");
            this._getQuestionsFromPool();
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


  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 3000,
    });
  }

  // private _buildQuestionPoolForm() {
  //   this.questionpoolFormGroup = this._formBuilder.group({
  //     QuestionText: [''],
  //   });
  // }

  // get QuestionText() { return this.form.get('questionpoolFormGroup'); }

  get Name() { return this.form.get('Name'); }
  get StartDate() { return this.form.get('StartDate'); }
  get EndDate() { return this.form.get('EndDate'); }

}

