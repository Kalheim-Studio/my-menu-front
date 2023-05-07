import { Outlet } from "react-router-dom";
import { logoBig } from "../../assets";

const Home = () => {
    return (
        <div id="homePage">
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
        </div>
    );
};

export { Home };
