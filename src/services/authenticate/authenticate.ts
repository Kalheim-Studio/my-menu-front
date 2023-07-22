import { LoginFormData, AuthenticateResponse } from "../../types";

function authenticate(body: Partial<LoginFormData>) {
    return new Promise<AuthenticateResponse>((resolve, reject) =>
        fetch(`${import.meta.env.VITE_API_URL}/user/authenticate`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(async (res) => {
                if (res.status != 200) {
                    const error = await res.text();
                    throw new Error(error);
                }
                return res.json();
            })
            .then((json) => {
                resolve({ result: json.token, stayLogged: body.stayLogged });
            })
            .catch((err) => {
                console.log(err.message);
                reject({ result: "Email, ou mot de passe incorrect, ou compte non authorisé." });
            })
    );
}

export { authenticate };
