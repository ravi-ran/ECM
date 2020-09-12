import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import * as config from '@config/config.json';
import { Employee } from '@components/employee-list/employee-list.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  fetchAllEmployee() {
    return this.http.get(environment.host + config.employee);
  }

  addNewEmployee(employee: Employee) {
    return this.http.post(environment.host + config.employee, employee);
  }

  getEmployeeById(id) {
    return this.http.get(environment.host + config.employee + id);
  }

  editEmployee(employee: Employee) {
    return this.http.put(environment.host + config.employee, employee);
  }

  deleteEmployee(id) {
    return this.http.delete(environment.host + config.employee + id);
  }
}
