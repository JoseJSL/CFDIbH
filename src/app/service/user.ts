export interface Client {
    DisplayName: string,
    RFC: string,
    UID: string,
    AddedDate: Date,
}

export interface Manager{
    DisplayName: string,
    RFC: string,
    UID: string,
    AddedDate: Date,
}

export interface Accountant extends User{
    FirstName: string,
    LastName: string,
}

export interface User {
    UID: string,
    RFC: string,
    Email: string,
    JoinDate: Date,
    DisplayName: string,
    BirthDate: Date,
    Type: 'Accountant' | 'Enterprise',
}