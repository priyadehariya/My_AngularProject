import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeMaster } from '../models/EmployeMaster';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {


  private REST_API_SERVER = "http://localhost/PiyaAPIs/api/EmployeeMasters";

  constructor(private httpClient: HttpClient) { }


  public GetEmployees(){
     return this.httpClient.get(this.REST_API_SERVER + "/allemployee");
   }

  // public GetEmployeeMaster(){
  //   return this.httpClient.get(this.REST_API_SERVER+"/EmployeeMasters");
  // }
//  public GetEmployees(){
//    return this.httpClient.get(this.REST_API_SERVER );
//  }
public GetCompanyMaster(){
  return this.httpClient.get(this.REST_API_SERVER + "/Companydetails")
}

public GetDesignationMaster(){
  return this.httpClient.get(this.REST_API_SERVER + "/designation")
}

public getEmployeeById(empKey:number):Observable<EmployeeMaster>{
  return this.httpClient.get<EmployeeMaster>(this.REST_API_SERVER + "/" + empKey);
}

public postEmployee(employee:EmployeeMaster){
  return this.httpClient.post(this.REST_API_SERVER ,employee);
}

public putEmployee(id: number,employee:EmployeeMaster){
  return this.httpClient.put(this.REST_API_SERVER + "/" + id,employee);
}

public GetEmployeeIdExists(employeeId:string , employeeKey:number):Observable<boolean>{
  return this.httpClient.get<boolean>(this.REST_API_SERVER+"/CheckEmployeeIDExists?EmployeeID=" + employeeId + "&EmployeeKey=" + employeeKey)
}

public deleteEmployee(empKey: number){
  return this.httpClient.delete(this.REST_API_SERVER + "/" + empKey);
}

public GetEmployeeInUse(employeeKey:number):Observable<boolean>{
  return this.httpClient.get<boolean>(this.REST_API_SERVER + "/CheckEmployeeInUse?EmployeeKey="+ employeeKey)
}

}
