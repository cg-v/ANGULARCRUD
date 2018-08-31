import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { FormsModule } from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {EmployeeService } from './employees/employee.service';

import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { createEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deActivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGuardService } from './employees/employees-details-guard.service';
import { AccordionComponent } from './shared/accordion.component';
import {HttpClientModule } from '@angular/common/http';

const appRoutes: Routes= [
  { path :'list', 
  component:ListEmployeesComponent,
  resolve :{employeeList :EmployeeListResolverService}
  },
  {
    path :'edit/:id', 
    component:CreateEmployeeComponent,
    canDeactivate :[createEmployeeCanDeactivateGuardService]
  },
  {path :'employees/:id', component:EmployeeDetailsComponent,
    canActivate :[EmployeeDetailsGuardService]  
},
  {path :'', redirectTo:'/list',pathMatch:'full'},
  {path :'notFound', component:PageNotFoundComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService,
              createEmployeeCanDeactivateGuardService,
            EmployeeListResolverService,
          EmployeeDetailsGuardService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
