import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

// Эта функция создает middleware и возвращает его
export const initMiddleware = (middleware: (arg0: NextApiRequest, arg1: NextApiResponse, arg2: (result: any) => void) => void) => (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
        middleware(req, res, (result: unknown) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });