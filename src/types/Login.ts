type LoginFormData = {
    email: string,
    password: string,
    stayLogged: string,
    role: string,
    identifier: string,    
}

type AuthenticateResponse = {
    result: string;
    stayLogged?: string;
}

export type { LoginFormData, AuthenticateResponse };
