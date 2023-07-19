import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuthenticated } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { logoSmall } from "../../assets/";
import { getAccountInfo } from "../../services";
import { useEffect, useState } from "react";

const links = [
    { title: "Carte & Menu", link: "/menu" },
    { title: "Comptes employés", link: "/sub-accounts", ownerOnly: true },
    { title: "Liste tables", link: "/tables" },
    { title: "QR Code", link: "/qr-code" },
];

type HomeUserType = {
    restaurantName: string;
    firstname: string;
    lastname: string;
    role: string;
};

const Admin = () => {
    const [userInfo, setUserInfo] = useState<HomeUserType>();

    // Path location
    const { pathname } = useLocation();

    //Navigation
    const navigate = useNavigate();

    // Check if authenticated
    const isAuthenticated = useAuthenticated();

    // Get Restaurant and user account info
    useEffect(() => {
        const token = String(localStorage.getItem("auth") || sessionStorage.getItem("auth"));

        getAccountInfo(token)
            .then((res) => {
                setUserInfo({
                    restaurantName: res.restaurant.name,
                    firstname: res.user.firstname,
                    lastname: res.user.lastname,
                    role: res.user.role
                });
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <section id="adminPage">
            {isAuthenticated ? (
                <>
                    <div className="admin-left-panel">
                        <div className="panel-header">
                            <div className="header-content">
                                <img alt="logo-mymenu-small" src={logoSmall} />
                                <span>
                                    {userInfo?.firstname} {userInfo?.lastname}
                                </span>
                            </div>
                        </div>
                        <nav>
                            <ul className="nav-list">
                                {links.map(
                                    (navItem, index) =>
                                        !(userInfo?.role === "Manager" && navItem.ownerOnly) && (
                                            <li key={"link-" + index}>
                                                <Link
                                                    to={"/admin" + navItem.link}
                                                    className={clsx(
                                                        "nav-item",
                                                        "/admin" + navItem.link === pathname && "nav-item-active"
                                                    )}
                                                >
                                                    {navItem.title}
                                                </Link>
                                            </li>
                                        )
                                )}
                            </ul>
                            <span className="unlog-container" role="button" onClick={unlogHandler}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} flip="horizontal" size="2x" />
                                <span>Déconnexion</span>
                            </span>
                        </nav>
                    </div>
                    <div className="admin-page-container">
                        <div className="page-title">
                            {/* <h2>{adminContextValues.restaurant.name}</h2> */}
                            <h2>{userInfo?.restaurantName}</h2>
                        </div>
                        <div className="page-content">
                            <Outlet />
                        </div>
                    </div>  
                </>
            ) : (
                <div className="waiting-spinner">
                    <FontAwesomeIcon icon={faSpinner} spin size="lg" />
                </div>
            )}
        </section>
    );

    function unlogHandler() {
    // Storages cleaning
        localStorage.removeItem("auth");
        sessionStorage.removeItem("auth");

        navigate("/login");
    }
};

export { Admin };
