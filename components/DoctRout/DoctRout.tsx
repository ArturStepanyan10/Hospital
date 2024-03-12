'use client'

import { getDoctorsBySpecialization } from '@/app/api';
import { Doctor } from '@/interfaces/doctor.interface';
import { Speciality } from '@/interfaces/specialization.interface';
import { useEffect, useState } from 'react';
import { Doct } from '../Doct/Doct';



export const DoctRout: React.FC<Speciality> = ({ specialName }) => {
    const [doct, setDoct] = useState<Doctor[]>([]);


    useEffect(() => {
        const fetchDoctors = async () => {
            if (specialName) {
                const data = await getDoctorsBySpecialization(specialName);
                setDoct(data);
            }
        };

        fetchDoctors();
    }, [specialName]);

    return (
        <div>
            {doct.map((doctor) => (
                <Doct key={doctor.id} {...doctor} />
            ))}
        </div>
    );
};