interface DecodedToken {
    id: number;
    email: string;
    lastName: string;
    role: string;
}

export function decodeJWTToken(token: string): DecodedToken {
    const [header, payload, signature] = token.split('.');

    // Декодировать payload из base64
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');

    // Преобразовать payload в объект
    const payloadObject: DecodedToken = JSON.parse(decodedPayload);

    return payloadObject;
}






{/*function decodeJWTToken(token: string) {
    // Распарсить JWT токен, разделенный точками
    const [header, payload, signature] = token.split('.');

    // Декодировать payload из base64
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');

    // Преобразовать payload в объект
    const payloadObject = JSON.parse(decodedPayload);

    // Вернуть объект payload
    return payloadObject;
}*/}