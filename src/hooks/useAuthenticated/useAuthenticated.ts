import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuthenticated = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = undefined;
        // const token = "this a token";
        //     const token =
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        //   "eyJyZXN0YXVyYW50SWQiOiI2NDQzODY0Yzk5MmJiNTViYmU0ODdlZmEiLCJpYXQiOjE2ODM3MTc2ODF9." +
        //   "dEK3XIgTD5HE6A086V28xxw4wDAQ757lsVw-hvm5w-4";

        if (token) {
            // Request headers
            const headers: HeadersInit = {
                Authorization: `Bearer ${token}`,
            };

            // Checking if validAuth
            fetch(`${import.meta.env.VITE_API_URL}/user/check-authenticated`, {
                headers: headers,
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res);
                        return res.json();
                    } else throw new Error("not connected");
                })
                .then((json) => {
                    if (!json.authenticated) throw new Error("Not connected");

                    if (pathname === "/login") navigate("/admin/menu");

                    // Else another path no redirection
                })
                .catch((err) => {
                    console.log(err.message);

                    if (pathname !== "/login") navigate("/not-logged");

                    // Else stay on /login
                });
        }
    }, [navigate, pathname]);
};

export { useAuthenticated };
