
import { DeleteUserRoleDeleteComponent } from './components/user-role/delete-user-role-delete/delete-user-role-delete.component';
import { EditUserRoleDialogComponent } from './components/user-role/edit-user-role-dialog/edit-user-role-dialog.component';
import { AddUserRoleDialogComponent } from './components/user-role/add-user-role-dialog/add-user-role-dialog.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRoleListComponent } from './components/user-role/user-role-list/user-role-list.component';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeTypeListComponent } from './components/employeeType/employee-type-list/employee-type-list.component';
import { AddDialogComponent } from './components/employee/add-dialog/add-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { EditDialogComponent } from './components/employee/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './components/employee/delete-dialog/delete-dialog.component';
import { MedicalAidTypeListdComponent } from './components/medical-aid-type/medical-aid-type-listd/medical-aid-type-listd.component';
import { AddMedicalAidTypeDialogComponent } from './components/medical-aid-type/add-medical-aid-type-dialog/add-medical-aid-type-dialog.component';
import { EditMedicalAidTypeDialogComponent } from './components/medical-aid-type/edit-medical-aid-type-dialog/edit-medical-aid-type-dialog.component';
import { DeleteMedicalAidTypeDialogComponent } from './components/medical-aid-type/delete-medical-aid-type-dialog/delete-medical-aid-type-dialog.component';
import { ConsumablesListComponent } from './components/consumables/consumables-list/consumables-list.component';
import { AddConsumablesDialogComponent } from './components/consumables/add-consumables-dialog/add-consumables-dialog.component';
import { EditConsumablesDialogComponent } from './components/consumables/edit-consumables-dialog/edit-consumables-dialog.component';
import { DeleteConsumablesDialogComponent } from './components/consumables/delete-consumables-dialog/delete-consumables-dialog.component';
import { BookingTypeListComponent } from './components/booking-type/booking-type-list/booking-type-list.component';
import { AddBookingTypeComponent } from './components/booking-type/add-booking-type/add-booking-type.component';
import { EditBookingTypeComponent } from './components/booking-type/edit-booking-type/edit-booking-type.component';
import { DeleteBookingTypeComponent } from './components/booking-type/delete-booking-type/delete-booking-type.component';
import { BookingManagementComponent } from './components/booking-type/booking-management/booking-management.component';
import { EmployeeManagementComponent } from './components/employee/employee-management/employee-management.component';
import { UserManagementComponent } from './components/user-role/user-management/user-management.component';
import { SlotTypeListComponent } from './components/slot-type/slot-type-list/slot-type-list.component';
import { AddSlotTypeDialogComponent } from './components/slot-type/add-slot-type-dialog/add-slot-type-dialog.component';
import { EditSlotTypeDialogComponent } from './components/slot-type/edit-slot-type-dialog/edit-slot-type-dialog.component';
import { DeleteSlotTypeDialogComponent } from './components/slot-type/delete-slot-type-dialog/delete-slot-type-dialog.component';
import { DocumentUploadComponent } from './components/document/document-upload/document-upload.component';
import { FeeTypeListComponent } from './components/feeType/fee-type-list/fee-type-list.component';
import { AddFeeTypeDialogComponent } from './components/feeType/add-fee-type-dialog/add-fee-type-dialog.component';
import { EditFeeTypeDialogComponent } from './components/feeType/edit-fee-type-dialog/edit-fee-type-dialog.component';
import { DeleteFeeTypeDialogComponent } from './components/feeType/delete-fee-type-dialog/delete-fee-type-dialog.component';
import { AllergyListComponent } from './components/allergy/allergy-list/allergy-list.component';
import { AddAllergyDialogComponent } from './components/allergy/add-allergy-dialog/add-allergy-dialog.component';
import { EditAllergyDialogComponent } from './components/allergy/edit-allergy-dialog/edit-allergy-dialog.component';
import { DeleteAllergyDialogComponent } from './components/allergy/delete-allergy-dialog/delete-allergy-dialog.component';
import { AddEmployeeTypeDialogComponent } from './components/employeeType/add-employee-type-dialog/add-employee-type-dialog.component';
import { EditEmployeeTypeDialogComponent } from './components/employeeType/edit-employee-type-dialog/edit-employee-type-dialog.component';
import { DeleteEmployeeTypeDialogComponent } from './components/employeeType/delete-employee-type-dialog/delete-employee-type-dialog.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { AddSurveyDialogComponent } from './components/survey/add-survey-dialog/add-survey-dialog.component';
import { SurveyListComponent } from './components/survey/survey-list/survey-list.component';
import { DeleteSurveyDialogComponent } from './components/survey/delete-survey-dialog/delete-survey-dialog.component';
import { EditSurveyDialogComponent } from './components/survey/edit-survey-dialog/edit-survey-dialog.component';
import { FeeManagementComponent } from './components/feeType/fee-management/fee-management.component';
import { FeeListComponent } from './components/fee/fee-list/fee-list.component';
import { AddFeeDialogComponent } from './components/fee/add-fee-dialog/add-fee-dialog.component';
import { EditFeeDialogComponent } from './components/fee/edit-fee-dialog/edit-fee-dialog.component';
import { DeleteFeeDialogComponent } from './components/fee/delete-fee-dialog/delete-fee-dialog.component';
import { SurveymanagementComponent } from './components/survey/surveymanagement/surveymanagement.component';
import { HomeComponent } from './components/home/home/home.component';
import { SchedulingManagementComponent } from './components/slot-type/scheduling-management/scheduling-management.component';

import { ListAllApplicationsComponent } from './components/applications/list-all-applications/list-all-applications.component';
import { ViewApplicationDetailsComponent } from './components/applications/view-application-details/view-application-details.component';
import { AppOverlayModule } from './shared/Overlay/Overlay.module';
import { ProgressSpinnerModule } from './shared/loaders/progress-spinner/progress-spinner.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './components/alert/alert/alert.component';
import { AddEditComponent } from './users/add-edit/add-edit.component';
import { LayoutComponent } from './users/layout/layout/layout.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventCalenderComponent } from './components/event/event-calender/event-calender.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilsModule } from '../utilis/module';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ListAllAcademicYearsComponent } from './components/academic-years/list-all-academic-years/list-all-academic-years.component';
import { AddNewAcademicYearComponent } from './components/academic-years/add-new-academic-year/add-new-academic-year.component';
import { ListAllAttendanceLogsComponent } from './components/attendance-log/list-all-attendance-logs/list-all-attendance-logs.component';
import { ListAllParentsComponent } from './components/parents/list-all-parents/list-all-parents.component';
import { environment } from 'src/environments/environment';
import { ViewParentChildDetailsComponent } from './components/parents/view-parent-child-details/view-parent-child-details.component';
import { ListAllChildrenComponent } from './components/children/list-all-children/list-all-children.component';
import { ListAllUsersComponent } from './components/users/list-all-users/list-all-users.component';
import { ReportsDashboardComponent } from './components/reports/reports-dashboard/reports-dashboard.component';
import { GenerateChildAttendanceReportDialogComponent } from './components/reports/child-attendance-reporting/generate-child-attendance-report-dialog/generate-child-attendance-report-dialog.component';
import { ViewClassAttendanceReportComponent } from './components/reports/child-attendance-reporting/view-class-attendance-report/view-class-attendance-report.component';
import { ViewApplicationsReportComponent } from './components/reports/applications-reporting/view-applications-report/view-applications-report.component';
import { GenerateApplicationsReportComponent } from './components/reports/applications-reporting/generate-applications-report/generate-applications-report.component';
import { GenerateBookingsReportComponent } from './components/reports/bookings-reporting/generate-bookings-report/generate-bookings-report.component';
import { ViewBookingsReportComponent } from './components/reports/bookings-reporting/view-bookings-report/view-bookings-report.component';
import { ListBookingsComponent } from './components/bookings/list-bookings/list-bookings.component';
import { ListSlotsComponent } from './components/slots/list-slots/list-slots.component';
import { UpdateSlotComponent } from './components/slots/update-slot/update-slot.component';
import { ListBusinessRulesComponent } from './components/business-rules/list-business-rules/list-business-rules.component';
import { AddBusinessRuleComponent } from './components/business-rules/add-business-rule/add-business-rule.component';
import { UpdateBusinessRuleComponent } from './components/business-rules/update-business-rule/update-business-rule.component';
import { DeleteBusinessRuleComponent } from './components/business-rules/delete-business-rule/delete-business-rule.component';
import { CustomErrorSnackBarComponent } from './shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { ListTransactionLogsComponent } from './components/logs/list-transaction-logs/list-transaction-logs.component';
import { ViewLogValuesComponent } from './components/logs/view-log-values/view-log-values.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListSurveyQuestionsComponent } from './components/survey-questions/list-survey-questions/list-survey-questions.component';
import { UpdateSurveyQuestionComponent } from './components/survey-questions/update-survey-question/update-survey-question.component';
import { DeleteSurveyQuestionComponent } from './components/survey-questions/delete-survey-question/delete-survey-question.component';
import { SurveyQuestionAnswerOptionsComponent } from './components/survey-question-answer-options/survey-question-answer-options/survey-question-answer-options.component';
import { UpdateSurveyQuestionAnswerOptionComponent } from './components/survey-question-answer-options/update-survey-question-answer-option/update-survey-question-answer-option.component';
import { ListSurveyAnswersPoolComponent } from './components/survey/pool/list-survey-answers-pool/list-survey-answers-pool.component';
import { ViewSurveyResultsComponent } from './components/survey/view-survey-results/view-survey-results.component';
import { NgxChartsModule, TooltipModule } from '@swimlane/ngx-charts';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment';
import { IdleAlertComponent } from './components/alert/idle-alert/idle-alert.component';
import { ManageTreeComponent } from './components/tree/manage-tree/manage-tree.component'; // optional, provides moment-style pipes for date formatting
import { MatTreeModule } from '@angular/material/tree';
import { ListClassesComponent } from './components/classes/list-classes/list-classes.component';
import { AddClassComponent } from './components/classes/add-class/add-class.component';
import { UpdateClassComponent } from './components/classes/update-class/update-class.component';
import { DeleteClassComponent } from './components/classes/delete-class/delete-class.component';
import { ListEnrollmentsComponent } from './components/enrollments/list-enrollments/list-enrollments.component';
import { AddEnrollmentComponent } from './components/enrollments/add-enrollment/add-enrollment.component';
import { DeleteEnrollmentComponent } from './components/enrollments/delete-enrollment/delete-enrollment.component';
import { AddRequiredConsumablesComponent } from './components/required-consumables/add-required-consumables/add-required-consumables.component';
import { ReceiveConsumablesComponent } from './components/enrollments/receive-consumables/receive-consumables.component';
import { ListRequestedConsumablesComponent } from './components/consumables/list-requested-consumables/list-requested-consumables.component';
import { ListReceivedConsumablesComponent } from './components/consumables/list-received-consumables/list-received-consumables.component';
import { ModalModule } from 'ngx-modal-bootstrap';
import { SchoolEvaluationReportComponent } from './components/reports/school-evaluation-report/school-evaluation-report.component';
import { GenerateConsumablesByClassReportComponent } from './components/reports/consumables-by-class/generate-consumables-by-class-report/generate-consumables-by-class-report.component';
import { ViewConsumablesByClassReportComponent } from './components/reports/consumables-by-class/view-consumables-by-class-report/view-consumables-by-class-report.component';
import { ViewWeeklyAttendanceReportComponent } from './components/reports/child-attendance-reporting/view-weekly-attendance-report/view-weekly-attendance-report.component';
import { ConsumablesByChildReportComponent } from './components/reports/consumables-by-child-report/consumables-by-child-report.component';
import { ResetAccountPasswordComponent } from './components/user-account/reset-account-password/reset-account-password.component';
import { ViewEmployeeAddressComponent } from './components/employee/view-employee-address/view-employee-address.component';
import { UpdateUserComponent } from './components/users/update-user/update-user.component';
import { DeleteUserComponent } from './components/users/delete-user/delete-user.component';
import { ForceDeleteParentComponent } from './components/parents/force-delete-parent/force-delete-parent.component';
import { ListCompaniesComponent } from './components/companies/list-companies/list-companies.component';
import { AddCompanyComponent } from './components/companies/add-company/add-company.component';
import { UpdateCompanyComponent } from './components/companies/update-company/update-company.component';
import { DeleteCompanyComponent } from './components/companies/delete-company/delete-company.component';
import { ListActivitiesComponent } from './components/activities/list-activities/list-activities.component';
import { UpdateActivityComponent } from './components/activities/update-activity/update-activity.component';
import { DeleteActivityComponent } from './components/activities/delete-activity/delete-activity.component';
import { ListEventsComponent } from './components/event/list-events/list-events.component';
import { UpdateEventComponent } from './components/event/update-event/update-event.component';
import { DeleteEventComponent } from './components/event/delete-event/delete-event.component';
import { QuillModule } from 'ngx-quill';
import { ListBlogComponent } from './components/blog/list-blog/list-blog.component';
import { CreateBlockComponent } from './components/blog/create-block/create-block.component';
import { DeleteBlockComponent } from './components/blog/delete-block/delete-block.component';
import { ViewBlogComponent } from './components/blog/view-blog/view-blog.component';
import { UpdateAcademicYearComponent } from './components/academic-years/update-academic-year/update-academic-year.component';
import { DeleteAcademicYearComponent } from './components/academic-years/delete-academic-year/delete-academic-year.component';
import { ListCommunicationsComponent } from './components/communication/list-communications/list-communications.component';
import { AddCommunicationComponent } from './components/communication/add-communication/add-communication.component';
import { DeleteCommunicationComponent } from './components/communication/delete-communication/delete-communication.component';
import { ViewComuunicationComponent } from './components/communication/view-comuunication/view-comuunication.component';
import { ViewMixpanelComponent } from './components/helpers/view-mixpanel/view-mixpanel.component';
import { DeleteDocumentComponent } from './components/document/delete-document/delete-document.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    UserRoleListComponent,
    EmployeeListComponent,
    EmployeeTypeListComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddUserRoleDialogComponent,
    DeleteUserRoleDeleteComponent,
    EditUserRoleDialogComponent,
    MedicalAidTypeListdComponent,
    AddMedicalAidTypeDialogComponent,
    EditMedicalAidTypeDialogComponent,
    DeleteMedicalAidTypeDialogComponent,
    ConsumablesListComponent,
    AddConsumablesDialogComponent,
    EditConsumablesDialogComponent,
    DeleteConsumablesDialogComponent,
    BookingTypeListComponent,
    AddBookingTypeComponent,
    EditBookingTypeComponent,
    DeleteBookingTypeComponent,
    BookingManagementComponent,
    EmployeeManagementComponent,
    UserManagementComponent,
    SlotTypeListComponent,
    AddSlotTypeDialogComponent,
    EditSlotTypeDialogComponent,
    DeleteSlotTypeDialogComponent,
    DocumentUploadComponent,
    FeeTypeListComponent,
    AddFeeTypeDialogComponent,
    EditFeeTypeDialogComponent,
    DeleteFeeTypeDialogComponent,
    AllergyListComponent,
    AddAllergyDialogComponent,
    EditAllergyDialogComponent,
    DeleteAllergyDialogComponent,
    AddEmployeeTypeDialogComponent,
    EditEmployeeTypeDialogComponent,
    DeleteEmployeeTypeDialogComponent,
    QuestionListComponent,
    AddSurveyDialogComponent,
    SurveyListComponent,
    DeleteSurveyDialogComponent,
    EditSurveyDialogComponent,
    FeeManagementComponent,
    FeeListComponent,
    AddFeeDialogComponent,
    EditFeeDialogComponent,
    DeleteFeeDialogComponent,
    SurveymanagementComponent,
    HomeComponent,
    SchedulingManagementComponent,
    ListAllApplicationsComponent,
    ViewApplicationDetailsComponent,
    AlertComponent,
    AddEditComponent,
    LayoutComponent,
    EventCalenderComponent,
    ListAllAcademicYearsComponent,
    AddNewAcademicYearComponent,
    ListAllAttendanceLogsComponent,
    ListAllParentsComponent,
    ViewParentChildDetailsComponent,
    ListAllChildrenComponent,
    ListAllUsersComponent,
    ReportsDashboardComponent,
    GenerateChildAttendanceReportDialogComponent,
    ViewClassAttendanceReportComponent,
    ViewApplicationsReportComponent,
    GenerateApplicationsReportComponent,
    GenerateBookingsReportComponent,
    ViewBookingsReportComponent,
    ListBookingsComponent,
    ListSlotsComponent,
    UpdateSlotComponent,
    ListBusinessRulesComponent,
    AddBusinessRuleComponent,
    UpdateBusinessRuleComponent,
    DeleteBusinessRuleComponent,
    CustomErrorSnackBarComponent,
    ListTransactionLogsComponent,
    ViewLogValuesComponent,
    ListSurveyQuestionsComponent,
    UpdateSurveyQuestionComponent,
    DeleteSurveyQuestionComponent,
    SurveyQuestionAnswerOptionsComponent,
    UpdateSurveyQuestionAnswerOptionComponent,
    ListSurveyAnswersPoolComponent,
    ViewSurveyResultsComponent,
    IdleAlertComponent,
    ManageTreeComponent,
    ListClassesComponent,
    AddClassComponent,
    UpdateClassComponent,
    DeleteClassComponent,
    ListEnrollmentsComponent,
    AddEnrollmentComponent,
    DeleteEnrollmentComponent,
    AddRequiredConsumablesComponent,
    ReceiveConsumablesComponent,
    ListRequestedConsumablesComponent,
    ListReceivedConsumablesComponent,
    SchoolEvaluationReportComponent,
    GenerateConsumablesByClassReportComponent,
    ViewConsumablesByClassReportComponent,
    ViewWeeklyAttendanceReportComponent,
    ConsumablesByChildReportComponent,
    ResetAccountPasswordComponent,
    ViewEmployeeAddressComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    ForceDeleteParentComponent,
    ListCompaniesComponent,
    AddCompanyComponent,
    UpdateCompanyComponent,
    DeleteCompanyComponent,
    ListActivitiesComponent,
    UpdateActivityComponent,
    DeleteActivityComponent,
    ListEventsComponent,
    UpdateEventComponent,
    DeleteEventComponent,
    ListBlogComponent,
    CreateBlockComponent,
    DeleteBlockComponent,
    ViewBlogComponent,
    UpdateAcademicYearComponent,
    DeleteAcademicYearComponent,
    ListCommunicationsComponent,
    AddCommunicationComponent,
    DeleteCommunicationComponent,
    ViewComuunicationComponent,
    ViewMixpanelComponent,
    DeleteDocumentComponent,
  ],

  imports: [
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    UtilsModule,
    MatSortModule,
    MatDialogModule,
    BrowserModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    MatTreeModule,
    ModalModule.forRoot(),
    QuillModule.forRoot(),


    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMenuModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatToolbarModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule,
    FormsModule,
    AppOverlayModule,
    ProgressSpinnerModule,
    NgbModule,
    NgbModalModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.apiUrl.replace("/api/", "")],
      }
    }),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
