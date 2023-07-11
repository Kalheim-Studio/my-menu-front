import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkAuthentication } from "../../services";

function useAuthenticated() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // get requested page
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");

        checkAuthentication(token)
            .then(() => {
                // If requested page was /login redirect to admin page
                if (pathname === "/login") navigate("/admin/menu");

                // Else another path no redirection and return true
                setIsAuthenticated(true);
            })
            .catch(() => {
                // If requested page wasn't login navigate to /login
                if (pathname !== "/login") navigate("/login");
                // Else stay on /login
            });
    }, [navigate, pathname]);

    return isAuthenticated;
}

export { useAuthenticated };
