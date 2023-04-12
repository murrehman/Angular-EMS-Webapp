import { Employee } from "../appModels/employee.model"

export class GetEmployees {
    static readonly type = '[Employees] Get'
}


export class SetSelectedEmployee {
    static readonly type = '[singleEmployee] Set'
    constructor(public id: any) { }
}

export class AddEmployees {
    static readonly type = '[Employees] Add'

    constructor(public payload: Employee) { }
}


export class UpdateEmployees {
    static readonly type = '[Employees] Update'

    constructor(public payload: any) { }
}


export class DeleteEmployees {
    static readonly type = '[Employees] Delete'

    constructor(public id: any) { }
}