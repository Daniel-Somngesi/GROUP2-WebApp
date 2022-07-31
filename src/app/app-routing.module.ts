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
import { AuthGuard } from './helpers/auth.guard';
import { ListAllParentsComponent } from './components/parents/list-all-parents/list-all-parents.component';
import { ViewParentChildDetailsComponent } from './components/parents/view-parent-child-details/view-parent-child-details.component';
import { ListAllChildrenComponent } from './components/children/list-all-children/list-all-children.component';

const authModule = () => import('../app/auth/auth.module').then(x => x.AuthModule);
const userModule = () => import('../app/users/user/user.module').then(x => x.UserModule);


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: userModule, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: authModule },

  // otherwise redirect to home


  {
    path: 'user-roles',
    component: UserRoleListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'event',
    component: EventCalenderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-types',
    component: EmployeeTypeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medical-aid-types',
    component: MedicalAidTypeListdComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consumables',
    component: ConsumablesListComponent,
    canActivate: [AuthGuard]
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
    path: 'survey',
    component: SurveyListComponent,
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
    path: 'survey-management',
    component: SurveymanagementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'scheduling-management',
    component: SchedulingManagementComponent,
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

  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
