'use client'


import React, { useEffect, useState } from 'react';
import { getDoctorsData } from '@/app/api';

import { Doctor } from '@/interfaces/doctor.interface';
import { Doct } from '../Doct/Doct';

export const Doctors: React.FC = () => {
    const [doctor, setDoctor] = useState<Doctor[]>([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const data = await getDoctorsData();
            setDoctor(data);
        };

        fetchDoctors();
    }, []);

    return (
        <>
            {doctor.map((doc) => (
                <Doct key={doc.id} {...doc} />
            ))}
        </>
    );
};