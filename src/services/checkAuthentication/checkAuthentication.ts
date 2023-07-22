function checkAuthentication(token?: string | null) {
    return new Promise((resolve, reject) => {
        if (!token) reject(false);

        const headers: HeadersInit = {
            Authorization: `Bearer ${token}`,
        };

        fetch(`${import.meta.env.VITE_API_URL}/user/check-authenticated`, {
            headers: headers,
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else throw new Error("not connected");
            })
            .then((json) => {
                if (!json.authenticated) throw new Error("Not connected");

                // if connected
                resolve(true);
            })
            .catch((err) => {
                console.log(err.message);
                reject(false);
            });
    });
}

export { checkAuthentication };
