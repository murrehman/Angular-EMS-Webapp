import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../appServices/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../appModels/employee.model';
import { Select, Store } from '@ngxs/store';
import { SetSelectedEmployee } from '../actions/app.action';
import { AppState } from '../states/app.states';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.css']
})
export class SingleEmployeeComponent implements OnInit {

  selectedEmpSub!: Subscription;
  item!: Employee;
  @Select(AppState.getSelectedEmployee) selectedEmployee$!: Observable<Employee>
  constructor(private activatedRoute: ActivatedRoute, private _du: EmployeeService, private store: Store) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(param => {
      let pid = param.get('id')
      this.getEmployeebyId(pid)
      // this._du.getEmployeebyId(pid).subscribe(res => {
      //   this.item = res;
    })
  }


  getEmployeebyId(id: any) {
    this.store.dispatch(new SetSelectedEmployee(id))
    this.selectedEmpSub = this.selectedEmployee$.subscribe(res => {
      this.item = res;
    })
  }

}
