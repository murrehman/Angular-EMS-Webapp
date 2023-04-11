import { Employee } from "../appModels/employee.model";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EmployeeService } from "../appServices/employee.service";
import { GetEmployees } from "../actions/app.action";
import { tap } from 'rxjs/operators';




export class EmployeeModel {
    employees!: Employee[]
    employeesLoaded!: boolean
}


@State<EmployeeModel>({
    name: 'appstate',
    defaults: {
        employees: [],
        employeesLoaded: false
    }

})



@Injectable()
export class AppState {

    constructor(private _empService: EmployeeService) { }

    @Selector()
    static getEmployeesList(state: EmployeeModel) {
        return state.employees;
    }

    @Selector()
    static getEmployeesLoaded(state: EmployeeModel) {
        return state.employeesLoaded;
    }



    @Action(GetEmployees)
    GetEmployees({ getState, setState }: StateContext<EmployeeModel>) {
        return this._empService.getEmployeeList().pipe(tap(res => {
            console.log(res);

            const state = getState();
            setState({
                ...state,
                employees: res,
                employeesLoaded: true
            })
        }))
    }



}


