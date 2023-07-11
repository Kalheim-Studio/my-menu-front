import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useAuthenticated } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const links = [
    {title: "Carte & Menu", link: "/menu"},
    {title: "Comtpes employés", link: "/sub-accounts"},
    {title: "Liste tables", link: "/tables"},
    {title: "QR Code", link: "/qr-code"},
];

const Admin = () => {
    // Check if authenticated
    const isAuthenticated = useAuthenticated();

    const { pathname } = useLocation();

    return (
        <section id="adminPage">
            {isAuthenticated ? (
                <>
                    <div className="admin-left-panel">
                        <div className="panel-header">PanelTitle</div>
                        <nav>
                            <ul className="nav-list">
                                {links.map(
                                    (navItem, index) =>
                                        <li>
                                            <Link
                                                to={"/admin" + navItem.link}
                                                key={"link-"+index}
                                                className={clsx(
                                                    "nav-item",
                                                    "/admin" + navItem.link === pathname && "nav-item-active"
                                                )}
                                            >
                                                {navItem.title}
                                            </Link>
                                        </li> 
                                )}
                            </ul>
                        </nav>
                    </div>
                    <div className="admin-page-container">
                        <div className="page-title">
                            <h2>Restaurant</h2>
                        </div>
                        <div className="page-content">
                            <Outlet />
                        </div>
                    </div>
                </>
            ) : (
                <div className="waiting-spinner">
                    <FontAwesomeIcon icon={faSpinner} spin size="2x"/>
                </div>
            )}
        </section>
    );
};

export { Admin };
