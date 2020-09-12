import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api/';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  public employeeList: Employee[];
  public employee: Employee;
  public employeeForm: FormGroup;
  isEmployeeListTableReady: boolean;
  isEmployeeFormReady: boolean;
  isEditActive: boolean;

  constructor(
    private empService: EmployeeService, private fb: FormBuilder, private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllEmployee();
    this.initialiseEmployee();
  }
  initialiseEmployee() {
    this.employee = {
      firstName: null,
      lastName: null,
      address: null,
      dob: null,
      mobile: null,
      city: null
    }
  }

  public getAllEmployee() {
    this.empService.fetchAllEmployee().subscribe((empListObj: Employee[]) => {
      this.employeeList = empListObj;
      this.isEmployeeListTableReady = true;
    });
  }

  public createEmployeeForm(isEditCalled?: boolean) {
    if (!isEditCalled) {
      if (this.employeeForm !== undefined) {
        this.employeeForm.reset();
      }

      this.initialiseEmployee();
      this.isEditActive = false;
    }
    this.employeeForm = this.fb.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      address: [this.employee.address],
      dob: [this.employee.dob],
      contact: [this.employee.mobile],
      city: [this.employee.city]
    });

    this.isEmployeeFormReady = true;
  }

  get firstName() {
    return this.employeeForm.get('firstName');
  }

  get lastName() {
    return this.employeeForm.get('lastName');
  }

  get address() {
    return this.employeeForm.get('address');
  }

  get dob() {
    return this.employeeForm.get('dob');
  }

  get contact() {
    return this.employeeForm.get('contact');
  }

  get city() {
    return this.employeeForm.get('city');
  }

  public modifyEmployee() {
    const newEmployee: Employee = this.createEmployeeObj();

    if (this.isEditActive) {
      console.log('updated emp obj-');
      console.log(newEmployee);

      this.empService.editEmployee(newEmployee).subscribe((res) => {
        console.log('employee edited');
        console.log(res);
        this.getAllEmployee();
        this.isEmployeeFormReady = false;
        this.showSuccessToast('Employee Successfully Updated');
      }, (error) => {
        console.log('Error while editing employee');
        console.log(error);
        this.isEmployeeFormReady = false;
        this.showFailureToast('Error while updating Employee');
      })
    } else {
      this.empService.addNewEmployee(newEmployee).subscribe((res) => {
        console.log('emp success added -');
        console.log(res);
        this.getAllEmployee();
        this.isEmployeeFormReady = false;
        this.showSuccessToast('Employee Successfully added');
      }, (error) => {
        console.log('Error while adding employee');
        console.log(error);
        this.isEmployeeFormReady = false;
        this.showFailureToast('Error while adding Employee');
      })
    }
  }

  private createEmployeeObj(): Employee {
    const newEmployee: Employee = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      address: this.address.value,
      dob: this.dob.value,
      mobile: this.contact.value,
      city: this.city.value
    };
    if (this.isEditActive) {
      newEmployee.empId = this.employee.empId;
    }

    return newEmployee;
  }

  public editEmployee(employee: Employee) {
    console.log('Calling get employee by id ');
    this.empService.getEmployeeById(employee.empId).subscribe((res: Employee) => {
      console.log(res);
      this.employee = res;
      this.isEditActive = true;
      this.createEmployeeForm(true);
    }, (error) => {
      console.log('Error while fetching employee');
      console.log(error);

    })
  }

  public deleteEmployee(employee: Employee) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Employee?',
      accept: () => {
        this.empService.deleteEmployee(employee.empId).subscribe((res) => {
          console.log('Employee deleted successfully');
          console.log(res);
          this.getAllEmployee();
          this.showSuccessToast('Employee successfully deleted');
        },
          (error) => {
            console.log('Error while deleting employee');
            console.log(error);
            this.showFailureToast('Cannot Delete Employee');
          });
      }
    });

  }

  showSuccessToast(msg: string) {
    this.messageService.add({
      severity: 'success', summary: 'Success', detail: msg, key: 'employee-toast'
    });
  }

  showFailureToast(msg: string) {
    this.messageService.add({
      severity: 'error', summary: 'Error', detail: msg, key: 'employee-toast'
    });
  }

}

export interface Employee {
  firstName: string;
  lastName: string;
  address: string;
  dob: string;
  mobile: number;
  city: string;
  empId?: number;
}