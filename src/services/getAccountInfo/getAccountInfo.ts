import { AccountInfo } from "../../types";

/**
 *
 * @param {String} token : authentication token.
 * @returns {AccountInfo} : account info.
 */
const getAccountInfo = (token: string) => {
    return new Promise<AccountInfo>((resolve, reject) => {
        if (!token) reject("Request error");

        const headers: HeadersInit = {
            Authorization: `Bearer ${token}`,
        };

        fetch(`${import.meta.env.VITE_API_URL}/user/get-account-info`, {
            headers: headers,
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else throw new Error("Request error");
            })
            .then((json) => {
                resolve(json);
            })
            .catch((err) => {
                console.log(err.message);
                reject("Request error");
            });
    });
};

export { getAccountInfo };
