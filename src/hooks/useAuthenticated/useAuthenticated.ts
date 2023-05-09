import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuthenticated = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = undefined;

        const headers: HeadersInit = {
            Authorization: `Bearer ${token}`,
        };
        if (token)
            fetch("http://localhost:8080/user/check-authenticated", {
                headers: headers,
            }).then((res) => {
                console.log(res.status);
                if (res.status === 200 && pathname === "/login") navigate("/admin/menu");
                else if (res.status !== 200 && pathname !== "/login") navigate("/home/not-logged");
            });
    }, []);
};

export { useAuthenticated };
