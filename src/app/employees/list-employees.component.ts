import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import {EmployeeService } from './employee.service';
import {Router, ActivatedRoute} from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  //selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
employees : Employee[];
searchTerm : string;
error: string;

//dataFromChild : string;

  constructor(private _employeeService : EmployeeService,
              private _router :Router,
            private _route : ActivatedRoute) { 
              const resolvedEmployeeList: ResolvedEmployeeList=this._route.snapshot.data['employeeList'];
          if(resolvedEmployeeList.error == null){
            this.employees =resolvedEmployeeList.employeeList;
          }else{
            this.error= resolvedEmployeeList.error;
          }
            }
onDeleteNotification(id:number){
  const i = this.employees.findIndex(e => e.id === id);
  if (i !== -1) {
    this.employees.splice(i, 1);
  }

}
  ngOnInit() {
   /// this._employeeService.getEmployees().subscribe(empList => this.employees =empList);
  
  }
/* handleNotify(eventData :string){
 this.dataFromChild= eventData;
} */
 /*  onClick(employeeId :number){
    this._router.navigate(['/employees',employeeId]);
  } */
  
}
