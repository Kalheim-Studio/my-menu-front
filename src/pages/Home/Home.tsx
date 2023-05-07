import { Outlet } from "react-router-dom";
import logo from "../../assets/pictures/logo_big.png";

const Home = () => {
    return (
        <div id="homePage">
            <div className="home-card">
                <div className="card-left">
                    <div className="card-left-header">
                        <div className="home-logo-container">
                            <img alt="logo my menu" src={logo} />
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

export default Home;
