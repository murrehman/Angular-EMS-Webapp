import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../appServices/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../appModels/employee.model';

@Component({
  selector: 'app-single-employee',
  templateUrl: './single-employee.component.html',
  styleUrls: ['./single-employee.component.css']
})
export class SingleEmployeeComponent implements OnInit {

  selectedEmpSub!: Subscription;
  item!: Employee;
  constructor(private activatedRoute: ActivatedRoute, private _du: EmployeeService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(param => {
      let pid = param.get('id')
      // this.getEmployeebyId(pid)
      this._du.getEmployeebyId(pid).subscribe(res => {
        console.log(res)
        this.item = res;
      })
    })
  }


  // getEmployeebyId(id: any) {
  //   this.store.dispatch(new SetSelectedEmployee(id))
  //   this.selectedEmpSub = this.selectedEmployee$.subscribe(res => {
  //     this.item = res;
  //   })
  // }

}
