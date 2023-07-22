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

type AccountInfo = {
    user: {
      identifier: string;
      firstname: string;
      lastname: string;
      role: string;
    };
    restaurant: {
      name: string;
      siret: string;
      address: string;
      postalCode: string;
      city: string;
      phone: string;
      email: string;
      table: string[];
    };
  };

export type { LoginFormData, AuthenticateResponse, AccountInfo };
