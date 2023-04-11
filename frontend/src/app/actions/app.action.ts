export class GetEmployees {
    static readonly type = '[Employees] Get'
}


export class AddEmployees {
    static readonly type = '[Employees] Add'

    constructor(public payload: any) { }
}


export class UpdateEmployees {
    static readonly type = '[Employees] Update'

    constructor(public payload: any, public id: number, public i: number) { }
}


export class DeleteEmployees {
    static readonly type = '[Employees] Delete'

    constructor(public id: number) { }
}