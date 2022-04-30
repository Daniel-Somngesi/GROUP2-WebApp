import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';

import { UserRoleListComponent } from './components/user-role/user-role-list/user-role-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: 'user-role',
    component: UserRoleListComponent
  },
  {
    path: '',
    component: AddEmployeeComponent
  },
  {
    path: 'list',
    component: EmployeeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
