import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable,of, throwError } from "rxjs";
import { delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()
export class EmployeeService{
    constructor(private httpClient : HttpClient){}
    baseUrl='http://localhost:3000/employees';
    //private listEmployees : Employee[] =[
       /*  {
          id : 1,
          name :'tom',
          gender :'male',
          email : 'abc@g.com',
          phoneNumber :2323,
          contactPreference :'phone',
          dateOfBirth : new Date('11/20/1979'),
          department :'1',
          isActive :true,
          photoPath :'assets/images/index.jpeg'
      },
      {
        id : 2,
        name :'Jack',
        gender :'male',
        email : 'abc@g.com',
        phoneNumber :23233,
        contactPreference :'phone',
        dateOfBirth : new Date('11/22/1979'),
        department :'2',
        isActive :true,
        photoPath :'assets/images/index1.jpeg'
      },
      {
        id : 3,
        name :'Mary',
        gender :'female',
        email : 'ert@g.com',
        phoneNumber :345,
        contactPreference :'phone',
        dateOfBirth : new Date('11/30/1979'),
        department :'3',
        isActive :true,
        photoPath :'assets/images/index3.jpeg'
      } */
    //  ];

    getEmployees() :Observable<Employee[]>{
        //return of(this.listEmployees).pipe(delay(500));
        return  this.httpClient.get<Employee[]>(this.baseUrl).pipe(
        catchError(this.handleError)); 
    }

    private handleError(errorResponse:HttpErrorResponse){
        if(errorResponse.error instanceof ErrorEvent){
            console.error('Client side error',errorResponse.error.message);
        }else{
            console.error('Server side error',errorResponse);
        }
        return throwError('There is a problem with the service. Please try again later.');
    
    }

    getEmployeesId(id : number) :Observable<Employee>{
        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`) 
        .pipe(catchError(this.handleError));
    }

    addEmployee(employee :Employee): Observable<Employee>{
        return this.httpClient.post<Employee>(this.baseUrl, employee,{
                headers: new HttpHeaders({
                    'Content-Type':'application/json'
                })
            })
            .pipe(catchError(this.handleError));
            }


    updateEmployee(employee :Employee): Observable<void>{
       return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee,{
                headers: new HttpHeaders({
                    'Content-Type':'application/json'
                })
            })
            .pipe(catchError(this.handleError));
           
        }
        


    deleteEmployee(id :number): Observable<void>{ 
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`) 
    .pipe(catchError(this.handleError));
        }
    }

