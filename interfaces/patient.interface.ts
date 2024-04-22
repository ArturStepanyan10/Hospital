import { Users } from './users.interface';


export interface Patient {
    id: number;
    user: Users;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
    snils: string;
}