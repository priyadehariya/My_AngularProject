import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private REST_API_SERVER = 'http://localhost/PiyaAPIs/api/Dashboard';

  constructor(private httpClient: HttpClient) {}

  public GetActiveAndResignedEmployeeCount() {
    return this.httpClient.get(this.REST_API_SERVER + '/employeeCount');
  }
  public GetEmployeeWorkingHours(){
    return this.httpClient.get(this.REST_API_SERVER + '/employeeWorkingHours');
  }

  public GetEmployeeSalary(){
    return this.httpClient.get(this.REST_API_SERVER + '/EmployeeSalary');
  }

}
