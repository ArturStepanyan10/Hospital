'use client'

import { getServices } from '@/app/api';
import { Service } from '@/interfaces/service.interface';
import React, { useEffect, useState } from 'react';
import { Servic } from '../Servic/servic';

export const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (error) {
                setError('Failed to fetch services data');
            }
        };

        fetchServices();
    }, []);

    return (
        <>
            {error && <p>{error}</p>}
            {services.map((service) => (
                <Servic key={service.id} {...service} />
            ))}
        </>
    );
};
