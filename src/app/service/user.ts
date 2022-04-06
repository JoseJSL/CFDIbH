export interface Enterprise extends User{
    Accountants: Accountant[],
    Name: string,
    CreationDate: Date,
}

export interface Accountant extends User{
    FirstName: string,
    LastName: string,
    BirthDate: Date,
}

interface User {
    UID: string,
    RFC: string,
    Email: string,
    JoinDate: Date,
}