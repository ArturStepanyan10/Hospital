import { Users } from './users.interface';


export interface Patient {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
    snils: string;
}