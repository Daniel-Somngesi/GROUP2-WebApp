
import { SlotTypeListComponent } from './components/slot-type/slot-type-list/slot-type-list.component';
import { ConsumablesListComponent } from './components/consumables/consumables-list/consumables-list.component';
import { AppComponent } from './app.component';
import { UserRoleListComponent } from './components/user-role/user-role-list/user-role-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeTypeListComponent } from './components/employeeType/employee-type-list/employee-type-list.component';
import { MedicalAidTypeListdComponent } from './components/medical-aid-type/medical-aid-type-listd/medical-aid-type-listd.component';
import { DocumentUploadComponent } from './components/document/document-upload/document-upload.component';

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
    path: 'user-roles',
    component: UserRoleListComponent
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
    path: 'slot-types',
    component: SlotTypeListComponent
  },
  {
    path: 'document',
    component: DocumentUploadComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
