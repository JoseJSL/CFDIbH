export interface Client {
    RFC: string,
    UID: string,
    AddedDate: Date,
}

export interface Manager{
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