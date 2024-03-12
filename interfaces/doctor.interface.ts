{/*import { Users } from './users.interface';
import { Speciality } from './specialization.interface';

export interface Doctor {
    id: number;
    user: Users;
    firstName: string;
    lastName: string;
    speciality: Speciality;
    position: string;
}*/}


export interface Doctor {
    id: number;
    surname: string;
    name: string;
    experience: number;
    post: string;
    specName: string;
    userId: number;
}

