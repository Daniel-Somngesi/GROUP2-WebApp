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
import {SurveymanagementComponent} from './components/survey/surveymanagement/surveymanagement.component';
import { HomeComponent } from './components/home/home/home.component';
import { ListAllApplicationsComponent } from './components/applications/list-all-applications/list-all-applications.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
 
  {
    path: 'user-roles',
    component: UserRoleListComponent
  },
  {
    path: 'employees',
    component: EmployeeListComponent
  },
  {
    path: 'employee-types',
    component: EmployeeTypeListComponent
  },

  {
    path: 'medical-aid-types',
    component: MedicalAidTypeListdComponent
  },
  {
    path: 'consumables',
    component: ConsumablesListComponent
  },

  {
    path: 'booking-management',
    component: BookingManagementComponent
  },
  {
    path: 'booking-type-list',
    component: BookingTypeListComponent
  },
  {
    path: 'add-booking-type',
    component: BookingTypeListComponent
  },
  {
    path: 'edit-booking-type',
    component: BookingTypeListComponent
  },
  {
    path: 'user-management',
    component: UserManagementComponent
  },
  {
    path: 'employee-management',
    component: EmployeeManagementComponent
  },
  {
    path: 'slot-types',
    component: SlotTypeListComponent
  },
  {
    path: 'document',
    component: DocumentUploadComponent
  },
  {
    path: 'fee-type',
    component: FeeTypeListComponent
  },
  {
    path: 'allergy',
    component: AllergyListComponent
  },
  {
    path: 'question',
    component: QuestionListComponent
  },
  {
    path: 'survey',
    component: SurveyListComponent
  },
  {
    path: 'fee-management',
    component: FeeManagementComponent
  },
  {
    path: 'fee',
    component: FeeListComponent
  },
  {
    path: 'survey-management',
    component: SurveymanagementComponent
  },
  {
    path: 'scheduling-management',
    component: SchedulingManagementComponent
  },
  {
    path: 'all-applications',
    component: ListAllApplicationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
