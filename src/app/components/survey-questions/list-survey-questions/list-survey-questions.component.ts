import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SurveyQuestion } from 'src/app/Interface/survey.types';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { DeleteSurveyQuestionComponent } from '../delete-survey-question/delete-survey-question.component';
import { UpdateSurveyQuestionComponent } from '../update-survey-question/update-survey-question.component';

@Component({
  selector: 'app-list-survey-questions',
  templateUrl: './list-survey-questions.component.html',
  styleUrls: ['./list-survey-questions.component.css']
})
export class ListSurveyQuestionsComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['surveyName', 'text','answersCount', 'actions'];

  surveyQuestions: SurveyQuestion[] = [];
  surveyQuestion: SurveyQuestion;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _surveyService: SurveyService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._getDataFromServer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAdd() {
    this._router.navigate(['add-survey']);
  }

  onUpdateValue(value: SurveyQuestion) {
    let dialogRef = this._matDialog.open(UpdateSurveyQuestionComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  onDeleteValue(value: SurveyQuestion) {
    let dialogRef = this._matDialog.open(DeleteSurveyQuestionComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  private _getDataFromServer() {
    this._surveyService.getAllSurveyQuestions()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as SurveyQuestion[];
            this.surveyQuestions = res;
            this.dataSource = new MatTableDataSource<SurveyQuestion>(this.surveyQuestions);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
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

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 2000,
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
