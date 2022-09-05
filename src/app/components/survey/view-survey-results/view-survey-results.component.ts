import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
import { SurveyResponse } from 'src/app/Interface/survey-response.types';
import { Survey, SurveyQuestion, SurveyQuestionAnswerOption } from 'src/app/Interface/survey.types';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';


@Component({
  selector: 'app-view-survey-results',
  templateUrl: './view-survey-results.component.html',
  styleUrls: ['./view-survey-results.component.css']
})
export class ViewSurveyResultsComponent implements OnInit {


  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = true;

  legendlocation = LegendPosition.Below;

  colorScheme: any = {
    domain: ['aqua', 'blue', 'chartreuse', 'crimson', 'fuchsia', 'gray',
      'green', 'indigo', 'lime', 'magenta', 'navy', 'maroon', 'olive',
      'purple', 'red', 'silver', 'teal', 'yellow']
  };

  displayProgressSpinner = false;
  survey: Survey;
  surveyResponses: SurveyResponse[] = [];
  surveyResponse: SurveyResponse;
  surveyId: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _surveyService: SurveyService,
  ) {


    this._activatedRoute.params.subscribe(params =>
      this.surveyId = params['id']
    )
  }

  ngOnInit(): void {
    this._getDataFromServer();
    this._getSurveyFromServer();
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  private _getDataFromServer() {
    this._surveyService.getSurveyResponse(this.surveyId)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.surveyResponses = event.body as SurveyResponse[];
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

  private _getSurveyFromServer() {
    this._surveyService.getSurvey(this.surveyId)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Survey;
            this.survey = res;
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


export const singleDataOption = [
  {
    "name": "Pepsi Max",
    "value": 1345
  }, {
    "name": "Coke Zero",
    "value": 3553
  }, {
    "name": "Sprite",
    "value": 2345
  }, {
    "name": "Creme Soda",
    "value": 5345
  }, {
    "name": "Fanta Orange",
    "value": 4333
  }
];
