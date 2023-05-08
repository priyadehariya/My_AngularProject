import { EmployeeMaster } from './../models/EmployeMaster';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeDetailsService } from '../services/employee-details.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddEmployeeComponent } from '../owner/add-employee/add-employee.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  animal!: string;
  name!: string;
  public displayedColumns = [
    'employeeId',
    'employeeName',
    'companyName',
    'designationName',
    'joiningDate',
    'gender',
    'update',
    'delete',
  ];

  public dataSource = new MatTableDataSource<EmployeeMaster>();

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  emp: any;
  IsEmployeeInUse!: boolean;

  constructor(
    public employeeService: EmployeeDetailsService,

    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.GetEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  GetEmployees() {
    this.employeeService.GetEmployees().subscribe((data) => {
      this.dataSource.data = data as EmployeeMaster[];
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEmployeeDialog(empKey: number) {
    let dialogConfig = {
      data: empKey,
      disableClose: true,
    };
    let DialogRef = this.dialog.open(AddEmployeeComponent, dialogConfig);
    DialogRef.afterClosed().subscribe((result) => {
      this.GetEmployees();
    });
  }

  public deleteEmployee(empKey: number) {
    this.employeeService.GetEmployeeInUse(empKey).subscribe((data) => {
      this.IsEmployeeInUse = data as boolean;
      if (this.IsEmployeeInUse == true) {
        Swal.fire({
          title: 'Alert',
          text: 'Employee in use.Not delete',
          icon: 'warning',
        });
      } else {
        Swal.fire({
          title: 'Are you sure do you want to delete this record permanantly?',
          icon: 'question',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            this.employeeService.deleteEmployee(empKey).subscribe((data) => {
              this.GetEmployees();
              Swal.fire({
                title: 'success',
                text: 'Employee Deleted successfully',
                icon: 'success',
              });
            });
          }
        });
      }
    });
  }
}
