export interface Enterprise extends User{
    Accountants: Accountant[];
}

export interface Accountant extends User{
    FirstName: string;
    LastName: string;
}

interface User{
    Email: string;
    ImgURL: string;
    JoinDate: string;
    Name?: string;
}