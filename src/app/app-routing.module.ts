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


const routes: Routes = [
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
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
