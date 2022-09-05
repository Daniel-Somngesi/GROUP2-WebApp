import { EventCalenderComponent } from './components/event/event-calender/event-calender.component';
import { SchedulingManagementComponent } from './components/slot-type/scheduling-management/scheduling-management.component';
import { FeeListComponent } from './components/fee/fee-list/fee-list.component';
import { SurveyListComponent } from './components/survey/survey-list/survey-list.component';
import { EmployeeManagementComponent } from './components/employee/employee-management/employee-management.component';
import { UserManagementComponent } from './components/user-role/user-management/user-management.component';
import { SlotTypeListComponent } from './components/slot-type/slot-type-list/slot-type-list.component';
import { ConsumablesListComponent } from './components/consumables/consumables-list/consumables-list.component';
import { UserRoleListComponent } from './components/user-role/user-role-list/user-role-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeTypeListComponent } from './components/employeeType/employee-type-list/employee-type-list.component';
import { MedicalAidTypeListdComponent } from './components/medical-aid-type/medical-aid-type-listd/medical-aid-type-listd.component';
import { BookingManagementComponent } from './components/booking-type/booking-management/booking-management.component';
import { BookingTypeListComponent } from './components/booking-type/booking-type-list/booking-type-list.component';
import { DocumentUploadComponent } from './components/document/document-upload/document-upload.component';
import { FeeTypeListComponent } from './components/feeType/fee-type-list/fee-type-list.component';
import { AllergyListComponent } from './components/allergy/allergy-list/allergy-list.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { FeeManagementComponent } from './components/feeType/fee-management/fee-management.component';
import { SurveymanagementComponent } from './components/survey/surveymanagement/surveymanagement.component';
import { HomeComponent } from './components/home/home/home.component';
import { ListAllApplicationsComponent } from './components/applications/list-all-applications/list-all-applications.component';

import { ListAllAcademicYearsComponent } from './components/academic-years/list-all-academic-years/list-all-academic-years.component';
import { ListAllAttendanceLogsComponent } from './components/attendance-log/list-all-attendance-logs/list-all-attendance-logs.component';
import { AdminGuard, AuthGuard } from './helpers/auth.guard';
import { ListAllParentsComponent } from './components/parents/list-all-parents/list-all-parents.component';
import { ViewParentChildDetailsComponent } from './components/parents/view-parent-child-details/view-parent-child-details.component';
import { ListAllChildrenComponent } from './components/children/list-all-children/list-all-children.component';
import { ListAllUsersComponent } from './components/users/list-all-users/list-all-users.component';
import { ReportsDashboardComponent } from './components/reports/reports-dashboard/reports-dashboard.component';
import { ViewClassAttendanceReportComponent } from './components/reports/child-attendance-reporting/view-class-attendance-report/view-class-attendance-report.component';
import { ViewApplicationsReportComponent } from './components/reports/applications-reporting/view-applications-report/view-applications-report.component';
import { ViewBookingsReportComponent } from './components/reports/bookings-reporting/view-bookings-report/view-bookings-report.component';
import { ListBookingsComponent } from './components/bookings/list-bookings/list-bookings.component';
import { ListSlotsComponent } from './components/slots/list-slots/list-slots.component';
import { ListBusinessRulesComponent } from './components/business-rules/list-business-rules/list-business-rules.component';
import { ListTransactionLogsComponent } from './components/logs/list-transaction-logs/list-transaction-logs.component';
import { AddSurveyDialogComponent } from './components/survey/add-survey-dialog/add-survey-dialog.component';
import { ListSurveyQuestionsComponent } from './components/survey-questions/list-survey-questions/list-survey-questions.component';
import { SurveyQuestionAnswerOptionsComponent } from './components/survey-question-answer-options/survey-question-answer-options/survey-question-answer-options.component';
import { ListSurveyAnswersPoolComponent } from './components/survey/pool/list-survey-answers-pool/list-survey-answers-pool.component';
import { ViewSurveyResultsComponent } from './components/survey/view-survey-results/view-survey-results.component';
import { ManageTreeComponent } from './components/tree/manage-tree/manage-tree.component';
import { ListClassesComponent } from './components/classes/list-classes/list-classes.component';
import { ListEnrollmentsComponent } from './components/enrollments/list-enrollments/list-enrollments.component';
import { ListRequestedConsumablesComponent } from './components/consumables/list-requested-consumables/list-requested-consumables.component';
import { ListReceivedConsumablesComponent } from './components/consumables/list-received-consumables/list-received-consumables.component';
import { SchoolEvaluationReportComponent } from './components/reports/school-evaluation-report/school-evaluation-report.component';
import { ViewConsumablesByClassReportComponent } from './components/reports/consumables-by-class/view-consumables-by-class-report/view-consumables-by-class-report.component';
import { ViewWeeklyAttendanceReportComponent } from './components/reports/child-attendance-reporting/view-weekly-attendance-report/view-weekly-attendance-report.component';
import { ConsumablesByChildReportComponent } from './components/reports/consumables-by-child-report/consumables-by-child-report.component';

const authModule = () => import('../app/auth/auth.module').then(x => x.AuthModule);
const userModule = () => import('../app/users/user/user.module').then(x => x.UserModule);


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: userModule, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: authModule },

  {
    path: 'user-roles',
    component: UserRoleListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'list-users',
    component: ListAllUsersComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'schedule/:academic-year',
    component: EventCalenderComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'employee-types',
    component: EmployeeTypeListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'medical-aid-types',
    component: MedicalAidTypeListdComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consumables',
    component: ConsumablesListComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  {
    path: 'booking-management',
    component: BookingManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'booking-type-list',
    component: BookingTypeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-booking-type',
    component: BookingTypeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-booking-type',
    component: BookingTypeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-management',
    component: EmployeeManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'slot-types',
    component: SlotTypeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'document',
    component: DocumentUploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fee-type',
    component: FeeTypeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'allergy',
    component: AllergyListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'question',
    component: QuestionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fee-management',
    component: FeeManagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fee',
    component: FeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-slots',
    component: ListSlotsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all-applications',
    component: ListAllApplicationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all-academic-calendars',
    component: ListAllAcademicYearsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'attendance-log',
    component: ListAllAttendanceLogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-parents',
    component: ListAllParentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-children',
    component: ListAllChildrenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'parent-details/:email',
    component: ViewParentChildDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports-dashboard',
    component: ReportsDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'class-attendance-report',
    component: ViewClassAttendanceReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'applications-report',
    component: ViewApplicationsReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bookings-report',
    component: ViewBookingsReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-bookings',
    component: ListBookingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-settings',
    component: ListBusinessRulesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-transaction-logs',
    component: ListTransactionLogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'survey-management',
    component: SurveymanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-surveys',
    component: SurveyListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-survey',
    component: AddSurveyDialogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-survey-questions',
    component: ListSurveyQuestionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-survey-question-answer-options',
    component: SurveyQuestionAnswerOptionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-survey-answers-Pool',
    component: ListSurveyAnswersPoolComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-survey-results/:id',
    component: ViewSurveyResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-tree',
    component: ManageTreeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-class',
    component: ListClassesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-enrollments',
    component: ListEnrollmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'requested-consumables',
    component: ListRequestedConsumablesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'received-consumables',
    component: ListReceivedConsumablesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'school-evaluation-report',
    component: SchoolEvaluationReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consumables-by-class-report',
    component: ViewConsumablesByClassReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'weekly-class-attendance-report',
    component: ViewWeeklyAttendanceReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consumables-by-child-report',
    component: ConsumablesByChildReportComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
