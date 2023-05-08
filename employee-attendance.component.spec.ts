import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterTestingModule } from '@angular/router/testing';

import { EmployeeAttendanceComponent } from './employee-attendance.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';

describe('EmployeeAttendanceComponent', () => {
  let component: EmployeeAttendanceComponent;
  let fixture: ComponentFixture<EmployeeAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceComponent ],
      imports:[
        HttpClientModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should not empty value for the formGroup ', () => {
  //   expect(component.Attendanceform.value).toBe({FilterClockDate:'',FilterCompanyID: ''});
  // });

  // it('should be equal value for the formGroup ', () => {
  //   expect(component.FormGroup.value).toEqual({Date:'',company:''});
  // });



});
