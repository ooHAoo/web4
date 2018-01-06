import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EmployeeRaw } from './employeeRaw';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>("http://localhost:8081/employees");
    }

    getEmployee(id: string): Observable<EmployeeRaw[]> {  
        return this.http.get<EmployeeRaw[]>("http://localhost:8081/employee-raw/" + id);
    }

    saveEmployee(employee: EmployeeRaw): Observable<any> {  
        return this.http.put<any>("http://localhost:8081/employee/" + employee._id, employee);
    }

}