import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SingleEmployeeComponent } from './single-employee/single-employee.component';

const routes: Routes = [
  { path: 'employee', canActivate: [AuthGuard], component: EmployeeComponent },
  { path: 'register', component: LoginComponent },
  { path: 'singleEmployee/:id', component: SingleEmployeeComponent },
  { path: '', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
