import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { attendance } from '../models/attendance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {


  // private REST_API_SERVER = "https://astoriatrainingapi2022.azurewebsites.net/api/EmployeeAttendances";
  private REST_API_SERVER = "http://localhost/PiyaAPIs/api/EmployeeAttendances";

  constructor(private httpClient: HttpClient) { }


  public GetEmployeeAttendance(FilterClockDate:string,FilterCompanyID:number):Observable<attendance[]>{
     return this.httpClient.get<attendance[]>(this.REST_API_SERVER + "/allattendances?FilterClockDate=" +FilterClockDate+ "&FilterCompanyId=" + FilterCompanyID);
   }
  public GetCompanyMaster(){
    return this.httpClient.get(this.REST_API_SERVER + "/Companydetails")
  }

  public postEmployeeattendance(PostAttendances:attendance[]){
    return this.httpClient.post<boolean>(this.REST_API_SERVER+ "/PostAttendance", PostAttendances);
  }

}
