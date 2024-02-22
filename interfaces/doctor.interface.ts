import { Users } from './Users.interface';
import { Speciality } from './specialization.interface';

export interface Doctor {
    id: number;
    user: Users;
    firstName: string;
    lastName: string;
    speciality: Speciality;
    position: string;
}