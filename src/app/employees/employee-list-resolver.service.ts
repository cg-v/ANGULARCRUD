import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Employee } from "../models/employee.model";
import { Observable, of } from "rxjs";
import { EmployeeService } from "./employee.service";
import { Injectable } from "@angular/core";
import { map,catchError } from "rxjs/operators";
import { ResolvedEmployeeList } from "./resolved-employeelist.model";


@Injectable()
export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList>{
    constructor(private _employeeService : EmployeeService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedEmployeeList>{
        return this._employeeService.getEmployees()
        .pipe(
            map((employeeList) => new ResolvedEmployeeList(employeeList)),
            catchError((err :any) => of(new ResolvedEmployeeList(null, err)))
        );
    }
}