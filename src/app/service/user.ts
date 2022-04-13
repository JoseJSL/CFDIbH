export interface Enterprise extends User{
    Accountants: Accountant[],
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
    DisplayName: string,
    BirthDate: Date,
}