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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { NgModule } from "@angular/core";

@NgModule({
  imports: [
    MatListModule,
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
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,

  ],
  exports: [
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
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
  ],
  providers: [],
  schemas: []
})
export class MaterialModule { }
