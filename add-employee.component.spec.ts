import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee.component';

fdescribe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeComponent ],
      imports:[
        HttpClientModule,
        MatDialogModule,
      ],
      providers:[HttpClient,{provide:MAT_DIALOG_DATA,useValue:{}},
      {provide:MatDialogRef,useValue:{}},
    ],

    })
    .compileComponents();
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',() => {
    expect(component).toBeTruthy();
  });
   it(`should have as title 'Add Employee'`, () => {
    const fixture = TestBed.createComponent(AddEmployeeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(' ');
  });
  it(`should have as title 'Edit Employee'`, () => {
    const fixture = TestBed.createComponent(AddEmployeeComponent);
    const a = fixture.debugElement.componentInstance;
    expect(a.title).toEqual(' ');
  });

  it('check Valid form Details', () => {
     component.form.controls['employeeId'].setValue('ATIL-204')
     component.form.controls['companyId'].setValue('Astoria Technologies')
     component.form.controls['designationId'].setValue('Product Owner')
     component.form.controls['empFirstName'].setValue('Priya')
     component.form.controls['empLastName'].setValue('Dehariya')
     component.form.controls['empGender'].setValue('Female')
     component.form.controls['empJoiningDate'].setValue('2022-11-14')
     component.form.controls['empResignationDate'].setValue('')
     component.form.controls['empHourlySalaryRate'].setValue(500)
     expect(component.form.valid).toBeTrue();

  });

  it(' check FirstName Invalid form Details', () => {
    component.form.controls['employeeId'].setValue('ATIL-204')
    component.form.controls['empFirstName'].setValue('Priyassssssssssiissqwertyuiopppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg')
    component.form.controls['empLastName'].setValue('Dehariya')
    expect(component.form.valid).toBeFalse();
 });

 it('check LastName Invalid form Details', () => {
  component.form.controls['employeeId'].setValue('ATIL-204')
  component.form.controls['empLastName'].setValue('Dehariyassssssssssiissqwertyuiopppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg')
  expect(component.form.valid).toBeFalse();
});

 it('check Invalid SalaryRate form Details', () => {
  component.form.controls['employeeId'].setValue('ATIL-204')
  component.form.controls['empHourlySalaryRate'].setValue('50ddxfgcvhcgcgcvccfgxfgdfgfgdgfd')
  expect(component.form.valid).toBeFalse();

});

it(' check Empty Data form Details', () => {
  component.form.controls['employeeId'].setValue('')
  component.form.controls['companyId'].setValue('Astoria Technologies')
  component.form.controls['designationId'].setValue('Product Owner')
  component.form.controls['empFirstName'].setValue('Priya')
  component.form.controls['empLastName'].setValue('Dehariya')
  component.form.controls['empGender'].setValue('Female')
  component.form.controls['empJoiningDate'].setValue('2022-11-14')
  component.form.controls['empResignationDate'].setValue('')
  component.form.controls['empHourlySalaryRate'].setValue(500)
  expect(component.form.valid).toBeFalse();

});

it('check Invalid Form details', () => {
  component.form.controls['employeeId'].setValue('ATIL-204hr')
  component.form.controls['companyId'].setValue('Astoria Technologies')
  component.form.controls['designationId'].setValue('Product Owner')
  component.form.controls['empFirstName'].setValue('Priya')
  component.form.controls['empLastName'].setValue('Dehariya')
  component.form.controls['empGender'].setValue('Female')
  component.form.controls['empJoiningDate'].setValue('2022-11-14')
  component.form.controls['empResignationDate'].setValue('')
  component.form.controls['empHourlySalaryRate'].setValue(500)
  expect(component.form.invalid).toBeFalse();

});

it('check Invalid Gender form Details', () => {

  component.form.controls['empGender'].setValue('hryyjkh')
  expect(component.form.valid).toBeFalse();
});


});

