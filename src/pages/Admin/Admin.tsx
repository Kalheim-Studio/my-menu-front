import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useAuthenticated } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { logoSmall } from "../../assets/";
import { AdminContext, AdminContextScheme } from "../../context";
import { getAccountInfo } from "../../services";

const links = [
    { title: "Carte & Menu", link: "/menu" },
    { title: "Comptes employés", link: "/sub-accounts", ownerOnly: true },
    { title: "Liste tables", link: "/tables" },
    { title: "QR Code", link: "/qr-code" },
];

const Admin = () => {
    // Context
    const baseAdminContextValues = useContext<AdminContextScheme>(AdminContext);
    const [adminContextValues, setAdminContextValues] = useState<AdminContextScheme>(baseAdminContextValues);

    // Path location
    const { pathname } = useLocation();

    // Check if authenticated
    const isAuthenticated = useAuthenticated();

    // Get Restaurant and user account info
    useEffect(() => {
        const token = String(localStorage.getItem("auth") || sessionStorage.getItem("auth"));

        getAccountInfo(token)
            .then((res) => setAdminContextValues(res))
            .catch((err) => console.log(err));
    }, []);

    return (
        <section id="adminPage">
            {isAuthenticated ? (
                <AdminContext.Provider value={adminContextValues}>
                    <div className="admin-left-panel">
                        <div className="panel-header">
                            <div className="header-content">
                                <img alt="logo-mymenu-small" src={logoSmall} />
                                <span>
                                    {adminContextValues.user.firstname} {adminContextValues.user.lastname}
                                </span>
                            </div>
                        </div>
                        <nav>
                            <ul className="nav-list">
                                {links.map(
                                    (navItem, index) =>
                                        !(adminContextValues.user.role === "Manager" && navItem.ownerOnly) && (
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
                        </nav>
                    </div>
                    <div className="admin-page-container">
                        <div className="page-title">
                            <h2>{adminContextValues.restaurant.name}</h2>
                        </div>
                        <div className="page-content">
                            <Outlet />
                        </div>
                    </div>
                </AdminContext.Provider>
            ) : (
                <div className="waiting-spinner">
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                </div>
            )}
        </section>
    );
};

export { Admin };
