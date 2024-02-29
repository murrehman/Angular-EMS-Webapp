import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Employee } from '../appModels/employee.model';
import { EmployeeService } from '../appServices/employee.service';
import { Select, Store } from '@ngxs/store';
import { AppState, EmployeeModel } from '../states/app.states';
import { Observable } from 'rxjs';
import { AddEmployees, DeleteEmployees, GetEmployees, UpdateEmployees } from '../actions/app.action';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empForm!: FormGroup;
  showModal = false;
  editMode = false;
  employees!: any;
  rep: any;
  @Select(AppState.getEmployeesList) employees$!: Observable<Employee[]>
  @Select(AppState.getEmployeesLoaded) employeesLoaded$!: Observable<boolean>;

  // p: number = 1;
  // count: number = 9;

  constructor(private fb: FormBuilder, private empService: EmployeeService, private store: Store) {
    // console.log(Date.now());
  }

  ngOnInit(): void {


    this.getEmployees();
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      dept: [''],
      _id: ['']
    })
  }


  onEmpSubmit() {
    if (this.empForm.valid) {
      if (this.editMode) {
        console.log("on dispatch");

        this.store.dispatch(new UpdateEmployees(this.empForm.value))
        // this.empService.updateEmployee(this.empForm.value).subscribe(res => {
        //   console.log(res)
        //   this.getEmployees();
        // })

      } else {
        this.store.dispatch(new AddEmployees(this.empForm.value))
        this.getEmployees()
        // this.empService.addEmployee(this.empForm.value).subscribe(res => {
        //   console.log(res)
        //   this.getEmployees();
        // },
        //   err => {
        //     console.log(err)
        //   })
      }
    }
    this.empForm.reset();
  }

  onAddEmployee() {

    this.showModal = true;
    console.log(this.showModal);
  }

  onCloseModal() {
    this.showModal = false;
    this.editMode = false;
    console.log(this.empForm.value)
  }


  //this method applies when you use regular nodejs with Mongodb
  getEmployees() {
    // this.empService.getEmployeeList().subscribe((res: any) => {
    //   this.employees = res;

    // })
    this.employeesLoaded$.subscribe(res => {
      if (!res) {
        this.store.dispatch(new GetEmployees())
      }
    })

  }


  // The below method applies when you use firebase as database
  // getEmployees() {
  //   console.log("getEmployees() is called")
  //   this.empService.getEmployeeList().subscribe((res: any) => {
  //     if (res !== null) {
  //       this.rep = Object.keys(res);
  //       for (var _i = 0; _i < this.rep.length; _i++) {
  //         this.employees = Object.values(res)
  //         this.employees[_i]._id = this.rep[_i]
  //       }
  //     }
  //   })
  // }


  //THIS METHOD IF USING CONVENTIONAL NODEJS WITH MONGODB
  onDeleteEmployee(id: any) {
    if (confirm('Do you want to delete this Employee?')) {
      this.store.dispatch(new DeleteEmployees(id))
      // this.empService.deleteEmployee(id).subscribe((res) => {
      //   console.log(res)
      // this.getEmployees();
      //   console.log('Deleted Successfully!')
      // },
      // (err) => {
      //   console.log(err)
      // })
    }
  }


  //THE BELOW method if use FIREBASE as databse
  // onDeleteEmployee(id: any, i: any) {
  //   if (confirm('Do you want to delete this Employee?')) {
  //     this.empService.deleteEmployee(id).subscribe(res => {
  //       this.employees.splice(i, 1)
  //       console.log(res);
  //       this.getEmployees();
  //       console.log('Deleted Successfully!')

  //     }, err => {
  //       console.log(err)
  //     })
  //   }
  // }

  onEditEmployee(emp: any) {
    console.log(emp)
    this.showModal = true;
    this.editMode = true;
    this.empForm.patchValue(emp)

  }
}
