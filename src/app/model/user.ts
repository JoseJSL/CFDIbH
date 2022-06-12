export interface Client extends Manager{
    Type: 'Accountant' | 'Enterprise';
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
    FullName: string,
    Type: 'Accountant' | 'Enterprise',
}