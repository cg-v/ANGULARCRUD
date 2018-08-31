import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import {Employee} from '../models/employee.model';
//import { inspectNativeElement } from '@angular/platform-browser/src/dom/debug/ng_probe';
import {EmployeeService } from './employee.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
 @ViewChild('employeeForm') public createEmployeeForm :NgForm;
  previewPhoto=false;
  employee :Employee;
  panelTitle :string;


  departments :Department[]=[
    {id :1, name : 'HelpDesk'},
    {id :2, name : 'IT'},
    {id :3, name : 'HR'},
    {id :4, name : 'Payroll'}
  ];
  constructor(private _employeeService : EmployeeService,
              private _router : Router,
            private _route : ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id= +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id :number){
    if(id === 0){
      this.employee={
        id: null,
        name :null,
        gender:null,
        contactPreference:null,
        phoneNumber:null,
        email:null,
        dateOfBirth:null,
        department:null,
        isActive:null,
        photoPath:null
    
      };
      this.panelTitle='Create Employee';
      this.createEmployeeForm.reset();
    }else{
      this.panelTitle='Edit Employee';
      this._employeeService.getEmployeesId(id).subscribe(
        (employee) => this.employee = employee,
        (err:any) =>console.log(err)
      );
      
    }

  }
  saveEmployee() : void{
   if(this.employee.id == null){
    this._employeeService.addEmployee(this.employee).subscribe(
      (data :Employee) => {
        console.log(data);
        this.createEmployeeForm.reset();
    this._router.navigate(['list']);
      },
      (error:any) => console.log(error)
    );
  }else{
    this._employeeService.updateEmployee(this.employee).subscribe(
      () => {
        
        this.createEmployeeForm.reset();
    this._router.navigate(['list']);
      },
      (error:any) => console.log(error)
    );

  }
  }
  togglePhotoPreview(){
    this.previewPhoto=!this.previewPhoto;
  }
}
