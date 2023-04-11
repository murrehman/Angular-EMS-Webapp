import { Employee } from "../appModels/employee.model";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EmployeeService } from "../appServices/employee.service";
import { AddEmployees, DeleteEmployees, GetEmployees, UpdateEmployees } from "../actions/app.action";
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

    @Action(AddEmployees)
    AddingEmployee({ getState, patchState }: StateContext<EmployeeModel>, { payload }: AddEmployees) {
        return this._empService.addEmployee(payload).pipe(tap(res => {
            console.log(res);
            const state = getState();

            patchState({
                employees: [...state.employees, res as Employee]
            })

        }))
    }

    // DELETE DATA IN STATE AND DATABASE
    @Action(DeleteEmployees)
    deleteEmployee({ getState, setState }: StateContext<EmployeeModel>, { id }: DeleteEmployees) {
        return this._empService.deleteEmployee(id).pipe(tap(res => {
            const state = getState();
            const filteredEmployees = state.employees.filter(emp => emp._id !== res._id)
            setState({
                ...state,
                employees: filteredEmployees
            })
            console.log(res);

        }))


    }

    @Action(UpdateEmployees)
    updatingEmployees({ getState, patchState }: StateContext<EmployeeModel>, { payload }: UpdateEmployees) {
        return this._empService.updateEmployee(payload).pipe(tap(res => {
            console.log(res);
            const state = getState();
            const empList = state.employees;
            const index = empList.findIndex(emp => emp._id == payload._id)

            empList[index] = res

            patchState({
                employees: empList
            })

        },
            err => {
                console.log(err)
            }))
    }

}


