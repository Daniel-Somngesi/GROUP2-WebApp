import { EmployeeManagementComponent } from './components/employee/employee-management/employee-management.component';
import { UserManagementComponent } from './components/user-role/user-management/user-management.component';
import { EditBookingTypeComponent } from './components/booking-type/edit-booking-type/edit-booking-type.component';
import { AddBookingTypeComponent } from './components/booking-type/add-booking-type/add-booking-type.component';
import { ConsumablesListComponent } from './components/consumables/consumables-list/consumables-list.component';
import { AppComponent } from './app.component';
import { UserRoleListComponent } from './components/user-role/user-role-list/user-role-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeTypeListComponent } from './components/employeeType/employee-type-list/employee-type-list.component';
import { MedicalAidTypeListdComponent } from './components/medical-aid-type/medical-aid-type-listd/medical-aid-type-listd.component';
import { BookingManagementComponent } from './components/booking-type/booking-management/booking-management.component';
import { BookingTypeListComponent } from './components/booking-type/booking-type-list/booking-type-list.component';

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
    path: 'medical-aid-type',
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
    component: AddBookingTypeComponent
  },
  {
    path: 'edit-booking-type',
    component: EditBookingTypeComponent
  },
  {
    path: 'user-management',
    component: UserManagementComponent
  },
  {
    path: 'employee-management',
    component: EmployeeManagementComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
