import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuthenticated = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = undefined;
        //     const token =
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        //   "eyJyZXN0YXVyYW50SWQiOiI2NDQzODY0Yzk5MmJiNTViYmU0ODdlZmEiLCJpYXQiOjE2ODM3MTc2ODF9." +
        //   "dEK3XIgTD5HE6A086V28xxw4wDAQ757lsVw-hvm5w-4";

        const headers: HeadersInit = {
            Authorization: `Bearer ${token}`,
        };
        if (token)
            fetch(`${import.meta.env.VITE_APIURL}/user/check-authenticated`, {
                headers: headers,
            }).then((res) => {
                console.log(res.status);
                if (res.status === 200 && pathname === "/login") navigate("/admin/menu");
                else if (res.status !== 200 && pathname !== "/login") navigate("/home/not-logged");
            });
    }, []);
};

export { useAuthenticated };
