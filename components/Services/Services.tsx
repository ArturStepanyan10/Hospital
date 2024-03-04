'use client'


import { getServices } from '@/app/api';
import { Service } from '@/interfaces/service.interface';
import React, { useEffect, useState } from 'react';
import { Servic } from '../Servic/servic';

export const Services = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getServices();
            setServices(data);
        };

        fetchServices();
    }, []);

    return (
        <>
            {services.map((service) => (
                <Servic key={service.id} {...service} />
            ))}
        </>
    );
};






