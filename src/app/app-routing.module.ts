import { AppComponent } from './app.component';
import { UserRoleListComponent } from './components/user-role/user-role-list/user-role-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeTypeListComponent } from './components/employeeType/employee-type-list/employee-type-list.component';
import { MedicalAidTypeListdComponent } from './components/medical-aid-type/medical-aid-type-listd/medical-aid-type-listd.component';

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
    path: 'employee-type',
    component: EmployeeTypeListComponent
  },
  {
    path: 'user-roles',
    component: UserRoleListComponent
  },
  {
    path: 'medical-aid-type',
    component: MedicalAidTypeListdComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
