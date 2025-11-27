export interface Person {
    id?: number;
    name?: string;
    birthday?: string;
    cpf?: string;
    address?: string;
    cep?: string;
    gender?: string;
    number?: string;
    createdAt?: string;
    updatedAt?: string;
    deleatedAt?: string;
}

export interface User {
    id?: number;
    email?: string;
    password?: string;
    useType?: string;
    verifiedEmail?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deleatedAt?: string;
}

export interface Employee {
    id?: number;
    jobTitle?: string;
    department?: string;
    hiringDate?: string;
    managerId?: number | null;
    leadership?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deleatedAt?: string;
}

export interface Collaborator {
    id?: number;
    person: Person;
    user: User;
    employee: Employee;
    createdAt?: string;
    updatedAt?: string;
    deleatedAt?: string;
}