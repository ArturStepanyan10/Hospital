import { Patient } from './patient.interface';


export interface Admission {

    id: number;
    doctorId: number;
    patientId: number;
    serviceId: number;
    date: Date;
    time: TimeRanges
}
