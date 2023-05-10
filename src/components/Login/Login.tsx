import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
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
            <form onSubmit={onSubmitHandler}>
                <div className="login-form-inputs">
                    <div className="login-form-fragment">
                        <label htmlFor="loginMailInput">Email :</label>
                        <input
                            type="email"
                            id="loginMailInput"
                            className="form-input"
                            name="email"
                            required
                            placeholder="john.doe@mail.com"
                        />
                        <div>
                            <input
                                type="radio"
                                id="ownerRadioInput"
                                name="userRole"
                                value="owner"
                                defaultChecked
                                onChange={radioChangeHandler}
                            />
                            <label htmlFor="ownerRadioInput" className="login-text-small">
                Gérant
                            </label>
                            <input
                                type="radio"
                                id="managerRadioInput"
                                name="userRole"
                                value="manager"
                                onChange={radioChangeHandler}
                            />
                            <label htmlFor="managerRadioInput" className="login-text-small">
                Manager
                            </label>
                        </div>
                    </div>
                    {isManager && (
                        <div className="login-form-fragment">
                            <label htmlFor="loginManagerIdInput">Identifiant manager :</label>
                            <input
                                type="text"
                                id="loginManagerIdInput"
                                className="form-input"
                                name="managerId"
                                required
                                placeholder="JohnDoe"
                            />
                        </div>
                    )}
                    <div className="login-form-fragment">
                        <label htmlFor="loginPwdInput">Mot de passe :</label>
                        <input type="password" id="loginPwdInput" className="form-input" name="password" required />
                    </div>
                    <Link className="login-text-small" to="/reset-password">
            Problème de connexion ?
                    </Link>
                </div>
                <div className="form-bottom">
                    <Link to="/register">Pas encore inscrit ?</Link>
                    {/* <input type="submit" value="Entrer" /> */}
                    <button>
            Entrer <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </button>
                </div>
            </form>
        </div>
    );

    function radioChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "manager") setIsManager(true);
        else setIsManager(false);
    }

    function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { email, password, userRole, managerId } = e.currentTarget;
        console.log(email, password);
        // console.log(email.value, password.value, userRole.value, managerId?.value);
        fetch(`${import.meta.env.VITE_APIURL}/user/authenticate`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                staylogged: false,
            }),
        })
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
    }
};

export { Login };
