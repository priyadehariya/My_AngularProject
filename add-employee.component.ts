import Swal from 'sweetalert2';
import { EmployeeMaster } from './../../models/EmployeMaster';
import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDetailsService } from 'src/app/services/employee-details.service';
import { DesignationMaster } from 'src/app/models/DesignationMaster';
import { CompanyMaster } from 'src/app/models/CompanyMaster';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {

  companies!: CompanyMaster[];
  emp: EmployeeMaster = new EmployeeMaster();
  form!: FormGroup;
  dataSource: any;
  isSave!: boolean;
  isUpdate!: boolean;
  designs!: DesignationMaster[];
  ResignationDate!: boolean;
  empKey!: number;
  reactiveForm: any;
  IsEmployeeIDExists!: boolean;
  empJoiningDate!: Date;
  getItem!:any;
  IsWait:boolean=true;
  orgJoiningDate!:Date;
  orgResignationDate!:Date;
  joiningDate!:Date;
  resigDate!:Date;
  data!: number;
  datepipe: any;



  constructor(
    public dataService: EmployeeDetailsService,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: number
  ) {
    this.empKey = data;
  }

  title: string = ' ';
  employeeKey: number = 0;

  public getEmployeeById(empKey: number) {
    this.dataService.getEmployeeById(empKey).subscribe((data) => {
      // console.log('employeedata', empKey);
      this.emp = data as EmployeeMaster;
      this.orgJoiningDate=this.emp.empJoiningDate;
      this.orgResignationDate=this.emp.empResignationDate
      this.IsWait=false;
    });
  }
  ngOnInit(): void {
  this.IsWait=true;
  this.employeeKey=this.data as number
  this.GetCompanyMaster();
  this.GetDesignationMaster();


    if (this.empKey == 0) {
      this.title = 'Add Employee';
      this.isSave = true;
      this.isUpdate = false;
      this.ResignationDate = true;
    } else {
      this.title = 'Edit Employee';
      this.isSave = false;
      this.isUpdate = true;
      this.ResignationDate = false;
      this.getEmployeeById(this.empKey);
    }


    this.form = new FormGroup({
      employeeId: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),Validators.pattern('[a-zA-Z0-9- ]*')
      ]),
      companyId: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      designationId: new FormControl('', [Validators.required]),
      empFirstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'),
      ]),
      empLastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*')
      ]),
      empGender: new FormControl('', [Validators.required,Validators.pattern('[Male,Female ]*')]),
      empJoiningDate: new FormControl('', [Validators.required]),
      empResignationDate: new FormControl(''),
      empHourlySalaryRate: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),Validators.pattern('[0-9 ]*')
      ]),
    });
  }

  public myError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  save() {
    this.form.markAllAsTouched();
    this.emp.empJoiningDate = new Date(this.emp.empJoiningDate);
    this.emp.empJoiningDate.setHours(this.emp.empJoiningDate.getHours()+5);
    this.emp.empJoiningDate.setMinutes(this.emp.empJoiningDate.getMinutes()+30);

    this.dataService
      .GetEmployeeIdExists(this.emp.employeeId, this.empKey)
      .subscribe((data) => {
        this.IsEmployeeIDExists = data as boolean;
        if (this.IsEmployeeIDExists == false) {

          this.dataService.postEmployee(this.emp).subscribe((data) => {
            Swal.fire({
              title: 'success',
              text: 'Employee created successfully',
              icon: 'success',
            });
            this.dialogRef.close();
          });
        } else {
          Swal.fire({
            title: 'Alert',
            text: 'EmployeeId already exists',
            icon: 'warning',
          });
        }
      });

  }

  update() {
    this.emp.empJoiningDate = new Date(this.emp.empJoiningDate);
    this.emp.empJoiningDate.setHours(this.emp.empJoiningDate.getHours()+5);
    this.emp.empJoiningDate.setMinutes(this.emp.empJoiningDate.getMinutes()+30);
    if (
      this.emp.empJoiningDate != null &&
      this.emp.empResignationDate != null
    ) {
        if (
        new Date(this.emp.empJoiningDate) > new Date(this.emp.empResignationDate)
       ) {
        Swal.fire({
          title: 'Alert',
          text: 'resignation Date must be greater than joining Date',
          icon: 'warning',
        });

        return;
      }

    }

    if(this.form.invalid)
      return;
      this.IsWait=true;
    this.dataService
      .GetEmployeeIdExists(this.emp.employeeId, this.empKey)
      .subscribe((data) => {
        this.IsEmployeeIDExists = data as boolean;
        if (this.IsEmployeeIDExists == false) {
          // if(this.orgJoiningDate!=this.emp.empJoiningDate)
          // {
          //   this.emp.empJoiningDate.setHours(this.emp.empJoiningDate.getHours()+5);
          //   this.emp.empJoiningDate.setMinutes(this.emp.empJoiningDate.getMinutes()+30);
          // }
          // if(this.emp.empResignationDate!= null && this.orgResignationDate != this.emp.empResignationDate)
          // {
          //   this.emp.empResignationDate.setHours(this.emp.empResignationDate.getHours()+5);
          //   this.emp.empResignationDate.setMinutes(this.emp.empResignationDate.getMinutes()+30);
          // }
          // if(this.emp.empResignationDate != null)
          // {
          //   let joiningDate =this.datepipe.transform(this.emp.empJoiningDate, 'yyyy-MM-dd');
          //   let resigDate = this.datepipe.transform(this.emp.empResignationDate, 'yyyy-MM-dd');
          // }
          // if(this.joiningDate! > this.resigDate!){
          //   Swal.fire({
          //           title: 'Alert',
          //           text: 'resignation Date must be greater than joining Date',
          //           icon: 'warning',
          //         });
          // }

          this.dataService
            .putEmployee(this.empKey, this.emp)
            .subscribe((data) => {
              Swal.fire({
                title: 'success',
                text: 'Employee Updated successfully',
                icon: 'success',
              });
              this.dialogRef.close();
            });
        } else {
          Swal.fire({
            title: 'Alert',
            text: 'EmployeeId already exists',
            icon: 'warning',
          });
        }
      });
      // this.IsWait=false;
  }
  close() {
    this.dialogRef.close();
  }

  GetCompanyMaster() {
    console.log('Method Entered');
    this.dataService.GetCompanyMaster().subscribe((data) => {
      console.log('EmployeeDataViaCmp', data);
      console.log('companyId', data);
      this.companies = data as CompanyMaster[];
      console.log('companies', this.companies);
    });
  }
  GetDesignationMaster() {
    console.log('Method Entered');
    this.dataService.GetDesignationMaster().subscribe((data) => {
      console.log('EmployeeDataViadeg', data);
      this.designs = data as DesignationMaster[];
      console.log(this.designs);
    });
  }
}
