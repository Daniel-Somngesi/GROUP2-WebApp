import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';

import { UserRoleListComponent } from './components/user-role/user-role-list/user-role-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-role',
    component: UserRoleListComponent
  },
  {
    path: '',
    component: AddEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
