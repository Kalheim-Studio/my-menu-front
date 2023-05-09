import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthenticated } from "../../hooks";

const Login = () => {
    //  States
    const [isManager, setIsManager] = useState(false);

    // Check if authenticated
    useAuthenticated();

    return (
        <div className="login-container">
            <div className="login-header">
                <h2>Accès Restaurateur</h2>
            </div>
            <form>
                <div className="form-inputs">
                    <label htmlFor="loginMailInput">Email :</label>
                    <br />
                    <input type="text" id="loginMailInput" name="email" />
                    <div>
                        <input
                            type="radio"
                            id="ownerRadioInput"
                            name="userRole"
                            value="owner"
                            defaultChecked
                            onChange={radioChangeHandler}
                        />
                        <label htmlFor="ownerRadioInput">Gérant</label>
                        <input
                            type="radio"
                            id="managerRadioInput"
                            name="userRole"
                            value="manager"
                            onChange={radioChangeHandler}
                        />
                        <label htmlFor="managerRadioInput">Manager</label>
                    </div>
                    {isManager && (
                        <>
                            <label htmlFor="loginManagerIdInput">Identifiant manager :</label>
                            <br />
                            <input type="text" id="loginManagerIdInput" name="email" />
                            <br />
                        </>
                    )}
                    <label htmlFor="loginPwdInput">Mot de passe :</label>
                    <br />
                    <input type="text" id="loginPwdInput" name="email" />
                </div>
                <div className="form-bottom">
                    <Link to="/register">Pas encore inscrit ?</Link>
                    <input type="submit" value="Entrer" />
                </div>
            </form>
        </div>
    );

    function radioChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "manager") setIsManager(true);
        else setIsManager(false);
    }
};

export { Login };
