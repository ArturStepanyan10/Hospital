'use client'

import { getDoctorsBySpecialization } from '@/app/api';
import { Doctor } from '@/interfaces/doctor.interface';
import { useEffect, useState } from 'react';
import { Doct } from '../Doct/Doct';


interface SpecialProps {
    specialization: string;
}


export const DoctRout: React.FC<SpecialProps> = ({ specialization }) => {
    const [doct, setDoct] = useState<Doctor[]>([]);


    useEffect(() => {
        const fetchDoctors = async () => {
            if (specialization) {
                const data = await getDoctorsBySpecialization(specialization);
                setDoct(data);
            }
        };

        fetchDoctors();
    }, [specialization]);

    return (
        <div>
            {doct.map((doctor) => (
                <Doct key={doctor.id} {...doctor} />
            ))}
        </div>
    );
};