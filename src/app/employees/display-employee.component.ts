//import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employee :Employee;
  private selectedEmployeeId: number;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  //@Output() notify : EventEmitter<string> = new EventEmitter<string>();
  constructor(private _route :ActivatedRoute,
              private _router :Router,
            private _employeeService :EmployeeService) { }

  ngOnInit() {
   this.selectedEmployeeId= +this._route.snapshot.paramMap.get('id');
  }
  /* handleClick(){
    this.notify.emit(this.employee.name);
  } */
  
  viewEmployee(){
    this._router.navigate(['/employees',this.employee.id]);
  }

  editEmployee(){
    this._router.navigate(['/edit',this.employee.id]);
  }
  deleteEmployee(){alert('hello');
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log('Employee with id=${this.employee.id} deleted'),
      (err) =>console.log(err)
    );
    this.notifyDelete.emit(this.employee.id);
  }
    
}
