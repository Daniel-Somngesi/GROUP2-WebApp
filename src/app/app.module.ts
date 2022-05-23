import { ConsumablesService } from './services/consumables.service';
import { MedicalAidTypeService } from './services/medical-aid-type.service';
import { DeleteUserRoleDeleteComponent } from './components/user-role/delete-user-role-delete/delete-user-role-delete.component';
import { EditUserRoleDialogComponent } from './components/user-role/edit-user-role-dialog/edit-user-role-dialog.component';
import { AddUserRoleDialogComponent } from './components/user-role/add-user-role-dialog/add-user-role-dialog.component';
import { UserRoleService } from './services/user-role.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRoleListComponent } from './components/user-role/user-role-list/user-role-list.component';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
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
import { ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
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
  ],
  imports: [
    MatSortModule,
    MatDialogModule,
    BrowserModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule,
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
    CommonModule,
  ],
  providers: [EmployeeService, UserRoleService, MedicalAidTypeService, ConsumablesService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
