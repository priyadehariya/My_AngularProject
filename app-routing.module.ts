import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { HomeComponent } from './home/home.component';
import { PracticeComponent } from './practice/practice.component';
import { AddEmployeeComponent } from './owner/add-employee/add-employee.component';

const routes: Routes = [

  { path:'' , redirectTo: '/home', pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'calculator',component:CalculatorComponent},
  {path:'practice', component:PracticeComponent},
  {path:'employee_details', component:EmployeeDetailsComponent},
  {path:'employee_attendance', component:EmployeeAttendanceComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'addemployee', component:AddEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
