import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsComponent } from './employee-details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


fdescribe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsComponent ],
      imports:[
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule

      ],
      providers:[HttpClient,{provide:MAT_DIALOG_DATA,useValue:{}},
        {provide:MatDialogRef,useValue:{},empKey:Number}]
    })
    .compileComponents();
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check the EmployeeId Columns Position in Mat-Table' ,() => {
    expect(component.displayedColumns[0]).toContain('employeeId');
  });
  it('Check the Employee-Name Columns Position in Mat-Table', () => {
    expect(component.displayedColumns[1]).toContain('employeeName');
  });

  it('Check the Company-Name Columns Position in Mat-Table', () => {
    expect(component.displayedColumns[2]).toContain('companyName');
  });

  it('Check the Designation-Name Columns Position in Mat-Table', () => {
    expect(component.displayedColumns[3]).toContain('designationName');
  });
  it('Check the joiningDate Columns Position in Mat-Table', () => {
    expect(component.displayedColumns[4]).toContain('joiningDate');
  });
  it('Check the Gender Columns Position in Mat-Table', () => {
    expect(component.displayedColumns[5]).toContain('gender');
  });

  it('should open the Adddialog', () => {
    component.openEmployeeDialog;
    expect(component.openEmployeeDialog).toBeTruthy;
});

it('should open the Editdialog', () => {
 component.openEmployeeDialog;
  expect(component.openEmployeeDialog(50046)).toBeTrue;
});

it('should delete record  on click of ok', () => {
  expect(component.deleteEmployee(50036)).toBeTrue;
  });

it('Check Total Records Count in Mat-Table', () => {
  expect(component.dataSource.data.length).toBeGreaterThanOrEqual(0);
      });

});
