interface CredentialsSignIn {
    email: string;
    password: string;
}

interface CredentialsRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
    snils: string;
}

interface CredentialsRegisterDoctor {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    specialtyId: number;
    position: string;
    office: string;
    work_experience: number;

}


export function postFetch(endpoint: URL | RequestInfo, bodyObj: CredentialsSignIn | CredentialsRegister |
    CredentialsRegisterDoctor) {
    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        body: JSON.stringify(bodyObj),
    }).then(res => {
        if (res.ok) {
            return res.text();
        } else {
            return res.text().then(error => Promise.reject(new Error(error)));
        }
    }).then(token => {
        if (!token) {
            throw new Error('Bad credentials');
        }
        return token;
    }).catch(error => {
        console.error('Error:', error);
        throw new Error('Network response was not ok.');
    });
}



