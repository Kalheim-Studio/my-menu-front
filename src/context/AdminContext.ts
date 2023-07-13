import { createContext } from "react";

type AdminContextScheme = {
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

const defaultAdminContextValues = {
    user: {
        identifier: "",
        firstname: "",
        lastname: "",
        role: "",
    },
    restaurant: {
        name: "",
        siret: "",
        address: "",
        postalCode: "",
        city: "",
        phone: "",
        email: "",
        table: [],
    },
};

const AdminContext = createContext<AdminContextScheme>(defaultAdminContextValues);

export { type AdminContextScheme, AdminContext };
