import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoBig } from "../../assets";

const Home = () => {
    // react-router-dom navigation hook
    const location = useLocation();
    const navigate = useNavigate();

    // If home page redirect to login
    useEffect(() => {
        if (location.pathname === "/") navigate("/login");
    }, [location.pathname, navigate]);

    return (
        <section id="homePage">
            <div className="home-card">
                <div className="card-left">
                    <div className="card-left-header">
                        <div className="home-logo-container">
                            <img alt="logo my menu" src={logoBig} />
                        </div>
                    </div>
                </div>
                <div className="card-right">
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export { Home };
