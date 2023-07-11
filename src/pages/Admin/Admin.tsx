import { Outlet } from "react-router-dom";
import { useAuthenticated } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
    // Check if authenticated
    const isAuthenticated = useAuthenticated();

    return (
        <section id="adminPage">
            {isAuthenticated ? (
                <>
                    <div className="admin-left-panel">
                        <div className="panel-header">PanelTitle</div>
                        <nav>
                            <ul className="nav-list">navMenu</ul>
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
                <FontAwesomeIcon icon={faSpinner} spin />
            )}
        </section>
    );
};

export { Admin };
