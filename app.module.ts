import { MatSortModule } from '@angular/material/sort';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { PracticeComponent } from './practice/practice.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule}  from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import{MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import{MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './owner/add-employee/add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'});
import { NgChartsModule } from 'ng2-charts';
import { TrimPipe } from './trim.pipe';


import Swal from 'sweetalert2';


// import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    PracticeComponent,
    HomeComponent,
    EmployeeDetailsComponent,
    EmployeeAttendanceComponent,
    DashboardComponent,
    AddEmployeeComponent,
    TrimPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatDialogModule,
    MatTableModule,
    MatProgressBarModule,
    MatInputModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatTabsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    ReactiveFormsModule,
    MatCardModule,
    NgChartsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
