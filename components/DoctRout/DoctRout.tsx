'use client'


import { useEffect, useState } from 'react';
import { Doct } from '../Doct/Doct';
import { Doctor } from '../../interfaces/doctor.interface';
import { getDoctorsBySpecialization } from '../../app/api';


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