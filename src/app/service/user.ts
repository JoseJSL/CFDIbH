export interface Enterprise extends User{
    Accountants: Accountant[],
    Name: string,
}

export interface Accountant extends User{
    FirstName: string,
    LastName: string,
}

interface User {
    UID: string,
    RFC: string,
    Email: string,
    JoinDate: Date,
}