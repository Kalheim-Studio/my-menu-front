import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function useAuthenticated () {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token =  localStorage.getItem("auth") || sessionStorage.getItem("auth");
        
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
}

export { useAuthenticated };
