import { Users } from './users.interface';
import { Specialty } from './specialization.interface';


export interface Doctor {
    id: number;
    user: Users;
    firstName: string;
    lastName: string;
    specialtyId: number;
    position: string;
    office: string;
    work_experience: number;
}




