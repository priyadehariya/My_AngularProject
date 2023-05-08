import Swal from 'sweetalert2';

import { attendance } from './../models/attendance';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceService } from '../services/attendance.service';
import { CompanyMaster } from '../models/CompanyMaster';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { timeout } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' });

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css'],
})
export class EmployeeAttendanceComponent implements OnInit {
  companies!: CompanyMaster[];
  FilterClockDate!: Date;
  FilterCompanyID!: number;
  Att: attendance[] = [];
  public displayedColumns = [
    'employeeId',
    'employeeName',
    'ClockDate',
    'TimeIn',
    'TimeOut',
    'Remarks',
  ];

  public dataSource = new MatTableDataSource<attendance>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  maxDate!: Date;
  companyId!: number;
  attendancedatalist: attendance[] = [];
  Date!: string;
  attendance!: attendance;
  employeeId!: string;
  showTable: boolean = false;
  FormGroup: any;
  Attendanceform!: FormGroup;
  DisableBtn!: boolean;
  emp_id!: string;

  mat: any;

  InvalidData = new Array<string>();
  InvalidTime = new Array<string>();
  ValidData = new Array<string>();
  invalidData!: string;
  validData: string = '';
  invalidtime!: string;
  constructor(public attendanceService: AttendanceService) {}
  ngOnInit(): void {
    this.DisableBtn = true;
    this.maxDate = new Date();
    this.GetCompanyMaster();

    this.Attendanceform = new FormGroup({
      FilterClockDate: new FormControl('', [Validators.required]),
      FilterCompanyID: new FormControl('', [Validators.required]),
    });
  }
  public myError = (controlName: string, errorName: string) => {
    return this.Attendanceform.controls[controlName].hasError(errorName);
  };
  @ViewChild(MatSort)
  sort!: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  GetCompanyMaster() {
    this.attendanceService.GetCompanyMaster().subscribe((data) => {
      this.companies = data as CompanyMaster[];
    });
  }
  GetEmployeeAttendance() {
    this.attendanceService
      .GetEmployeeAttendance(
        this.FilterClockDate.toLocaleDateString(),
        this.FilterCompanyID
      )
      .subscribe((data) => {
        this.attendancedatalist = data as attendance[];
        this.dataSource.data = this.attendancedatalist;
        this.Att = data as attendance[];
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  Load() {
    this.Attendanceform.markAllAsTouched();
    if (this.Attendanceform.valid) {
      this.DisableBtn = false;
      this.showTable = true;
      this.GetEmployeeAttendance();
      return;
    } else {
      Swal.fire({
        title: 'Alert',
        text: 'Date & Company Both are require',
        icon: 'warning',
      });
    }
  }
  save() {
    let listAttendance = new Array<attendance>();
    this.InvalidData = new Array<string>();
    this.InvalidTime = new Array<string>();
    this.ValidData = Array<string>();

    this.attendancedatalist = this.dataSource.data;
    this.attendancedatalist.forEach((item, index) => {
      if (
        (item.timeIn != '' && item.timeOut == '' && item.remarks == '') ||
        (item.timeIn == '' && item.timeOut != '' && item.remarks == '') ||
        (item.timeIn == '' && item.timeOut == '' && item.remarks != '') ||
        (item.timeIn != '' && item.timeOut != '' && item.remarks == '') ||
        (item.timeIn == '' && item.timeOut != '' && item.remarks != '') ||
        (item.timeIn != '' && item.timeOut == '' && item.remarks != '')
      ) {
        this.invalidData = item.employeeId;
        this.InvalidData.push(this.invalidData);
      } else {
        if (item.timeIn != '' && item.timeOut != '' && item.remarks != '') {
          if (item.timeIn > item.timeOut) {
            this.invalidtime = item.employeeId;
            this.InvalidTime.push(this.invalidtime);
          } else {
            this.ValidData.push(item.employeeId);
            let Attendance = new attendance();
            Attendance.employeeKey = item.employeeKey;
            Attendance.clockDate = item.clockDate;
            console.log(this.FilterClockDate);
            Attendance.timeIn = item.clockDate + 'T' + item.timeIn;
            Attendance.timeOut = item.clockDate + 'T' + item.timeOut;
            Attendance.remarks = item.remarks;
            Attendance.creationDate = item.creationDate;
            listAttendance.push(Attendance);
          }
        }
        // if(item.timeIn>item.timeOut){
        // this. invalidtime = item.employeeId;
        // this.InvalidTime .push(this.invalidtime);
        //  }
        //  if (item.timeIn == ''&& item.timeOut == ''&& item.remarks == ''){
        //   // Swal.fire({
        //   //   title: 'Alert',
        //   //   text: 'Fill The Required Field ',
        //   //   icon: 'warning',
        //   // });
        //  }
      }
    });

    if (this.ValidData.length == 0) {
      this.Validation();
    } else {
      this.attendanceService
        .postEmployeeattendance(listAttendance)
        .subscribe((data) => {
          this.Validation();
        });
    }
    // if ( invalid_data.length>0){
    //   Swal.fire({
    //     title: 'Alert',
    //     text: 'Fill The Required Field Emp_ID :'+ invalid_data,
    //     icon: 'warning',
    //   });
    // }
    // if(invalid_time.length > 0){
    //   Swal.fire({
    //     title: 'Alert',
    //     text: ' Time-Out should be Greater than Time-In  Emp_ID :'+invalid_time ,
    //     icon: 'warning',
    //   });
    // }
    // if(invalid_data.length > 0 && invalid_time.length > 0){
    //   Swal.fire({
    //     title: 'Alert',
    //     text: 'Fill The Required Field Emp_ID :'+ invalid_data + 'And  Time-Out should be Greater than Time-In  Emp_ID  :'+invalid_time ,
    //     icon: 'warning',
    //   });
    // }

    //   if(this.attendancedatalist!= null && invalid_time.length == 0 &&  invalid_data.length==0){
    //     this.attendanceService.postEmployeeattendance(listAttendance).subscribe((data)=>{
    //     Swal.fire({
    //       title:'succsess',
    //       text:'Attendance Succsessfully Saved',
    //       icon: 'success',
    //     })
    //     this.GetEmployeeAttendance();
    //   });
    // }
  }

  Validation() {
    if (
      this.InvalidData.length > 0 &&
      this.InvalidTime.length > 0 &&
      this.ValidData.length == 0
    ) {
      Swal.fire({
        title: 'Alert',
        text:
          'Fill The Required Field Emp_ID :' +
          this.InvalidData +
          '  And  Time-Out should be Greater than Time-In  Emp_ID  :' +
          this.InvalidTime,
        icon: 'warning',
      });
    } else if (
      this.InvalidData.length > 0 &&
      this.InvalidTime.length == 0 &&
      this.ValidData.length > 0
    ) {
      Swal.fire({
        title: 'Alert',
        text:
          'Fill The Required Field Emp_ID :' +
          this.InvalidData +
          '  And  Successfully saved data for employee ID  :' +
          this.ValidData,
        icon: 'warning',
      });
    } else if (
      this.InvalidData.length == 0 &&
      this.InvalidTime.length > 0 &&
      this.ValidData.length > 0
    ) {
      Swal.fire({
        title: 'Alert',
        text:
          '  Successfully saved data for employee ID :' +
          this.ValidData +
          ' And  Time-Out should be Greater than Time-In  Emp_ID  :' +
          this.InvalidTime,
        icon: 'warning',
      });
    } else if (
      this.InvalidData.length == 0 &&
      this.InvalidTime.length == 0 &&
      this.ValidData.length > 0
    ) {
      Swal.fire({
        title: 'Success',
        text: ' Successfully saved data for employee ID :' + this.ValidData,
        icon: 'success',
      });
    } else if (
      this.InvalidData.length == 0 &&
      this.InvalidTime.length > 0 &&
      this.ValidData.length == 0
    ) {
      Swal.fire({
        title: 'Alert',
        text:
          ' And  Time-Out should be Greater than Time-In  Emp_ID  :' +
          this.InvalidTime,
        icon: 'warning',
      });
    } else if (
      this.InvalidData.length > 0 &&
      this.InvalidTime.length == 0 &&
      this.ValidData.length == 0
    ) {
      Swal.fire({
        title: 'Alert',
        text: 'Fill The Required Field Emp_ID :' + this.InvalidData,
        icon: 'warning',
      });
    } else if (this.InvalidData.length > 0 && this.InvalidTime.length > 0) {
      Swal.fire({
        title: 'Alert',
        text:
          'Fill The Required Field Emp_ID :' +
          this.InvalidData +
          'And  Time-Out should be Greater than Time-In  Emp_ID  :' +
          this.InvalidTime,
        icon: 'warning',
      });
    }
  }
}
