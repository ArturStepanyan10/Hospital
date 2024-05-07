import { Users } from './users.interface';
import { Specialty } from './specialization.interface';


export interface Doctor {
    id: number;
    user: Users;
    firstName: string;
    lastName: string;
    specialty: Specialty;
    position: string;
    office: string;
    work_experience: number;
}




