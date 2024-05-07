'use client'


import React, { useEffect, useState } from 'react';

import { Doct } from '../Doct/Doct';
import { Doctor } from '../../interfaces/doctor.interface';
import { getDoctorsData } from '../../app/api';

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