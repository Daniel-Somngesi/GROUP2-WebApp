import { SlotTypeService } from './services/slot-type.service';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SlotTypeListComponent } from './components/slot-type/slot-type-list/slot-type-list.component';
import { AddSlotTypeDialogComponent } from './components/slot-type/add-slot-type-dialog/add-slot-type-dialog.component';
import { EditSlotTypeDialogComponent } from './components/slot-type/edit-slot-type-dialog/edit-slot-type-dialog.component';
import { DeleteSlotTypeDialogComponent } from './components/slot-type/delete-slot-type-dialog/delete-slot-type-dialog.component';
import { DocumentUploadComponent } from './components/document/document-upload/document-upload.component';
import { FeeTypeListComponent } from './components/feeType/fee-type-list/fee-type-list.component';
import { AddFeeTypeDialogComponent } from './components/feeType/add-fee-type-dialog/add-fee-type-dialog.component';
import { EditFeeTypeDialogComponent } from './components/feeType/edit-fee-type-dialog/edit-fee-type-dialog.component';
import { DeleteFeeTypeDialogComponent } from './components/feeType/delete-fee-type-dialog/delete-fee-type-dialog.component';
import { FeeTypeService } from './services/fee-type.service';
import { AllergyListComponent } from './components/allergy/allergy-list/allergy-list.component';
import { AllergyService } from './services/allergy.service';
import { AddAllergyDialogComponent } from './components/allergy/add-allergy-dialog/add-allergy-dialog.component';
import { EditAllergyDialogComponent } from './components/allergy/edit-allergy-dialog/edit-allergy-dialog.component';
import { DeleteAllergyDialogComponent } from './components/allergy/delete-allergy-dialog/delete-allergy-dialog.component';
import { AddEmployeeTypeDialogComponent } from './components/employeeType/add-employee-type-dialog/add-employee-type-dialog.component';
import { EditEmployeeTypeDialogComponent } from './components/employeeType/edit-employee-type-dialog/edit-employee-type-dialog.component';
import { DeleteEmployeeTypeDialogComponent } from './components/employeeType/delete-employee-type-dialog/delete-employee-type-dialog.component';
import { EmployeeTypeService } from './services/employee-type.service';


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
    SlotTypeListComponent,
    AddSlotTypeDialogComponent,
    EditSlotTypeDialogComponent,
    DeleteSlotTypeDialogComponent,
    DocumentUploadComponent,
    FeeTypeListComponent,
    AddFeeTypeDialogComponent,
    EditFeeTypeDialogComponent,
    DeleteFeeTypeDialogComponent,
    AllergyListComponent,
    AddAllergyDialogComponent,
    EditAllergyDialogComponent,
    DeleteAllergyDialogComponent,
    AddEmployeeTypeDialogComponent,
    EditEmployeeTypeDialogComponent,
    DeleteEmployeeTypeDialogComponent,
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
    FormsModule
  ],
  providers: [EmployeeService, UserRoleService, MedicalAidTypeService, ConsumablesService, SlotTypeService, FeeTypeService, AllergyService, EmployeeTypeService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
