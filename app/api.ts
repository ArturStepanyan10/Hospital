import { Service } from '@/interfaces/service.interface';
import { initMiddleware } from '@/lib/init-middleware';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';


const corsMiddleware = initMiddleware(
    Cors({
        methods: ['GET', 'POST'],
    })
);

//Получение списка мед. услуг
export const getServices = async (): Promise<Service[]> => {
    try {
        const response = await fetch('https://localhost:44304/api/services');
        if (!response.ok) {
            throw new Error('Failed to fetch services data');
        }
        const services: Service[] = await response.json();
        return services;
    } catch (error) {
        console.error('Error fetching services data:', error);
        return [];
    }


};

export const getSpecializations = async (): Promise<Service[]> => {
    try {
        const response = await fetch('https://localhost:7138/api/specializations');
        if (!response.ok) {
            throw new Error('Failed to fetch services data');
        }
        const services: Service[] = await response.json();
        return services;
    } catch (error) {
        console.error('Error fetching services data:', error);
        return [];
    }


};

//Получение списка специализаций
{/*export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Используйте middleware cors
    await corsMiddleware(req, res);

    if (req.method === 'GET') {
        // Обработка GET-запроса
        try {
            const response = await fetch('https://localhost:7138/api/specializations');
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Обработка других методов (например, POST)
        res.status(404).json({ error: 'Not Found' });
    }
}*/}
