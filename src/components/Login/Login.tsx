import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAuthenticated } from "../../hooks";

const Login = () => {
    //  States
    const [isManager, setIsManager] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);

    // React-router-dom
    const navigate = useNavigate();

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
                    <button disabled={isRequesting}>
                        {!isRequesting ? (
                            <>
                Entrer <FontAwesomeIcon icon={faArrowRightToBracket} />
                            </>
                        ) : (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        )}
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
        setIsRequesting(true);
        const { email, password, userRole, managerId } = e.currentTarget;
        const body = {
            email: email.value,
            password: password.value,
            stayLogged: true,
        };

        fetch(`${import.meta.env.VITE_API_URL}/user/authenticate`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(async (res) => {
                if (res.status != 200) {
                    const error = await res.text();
                    throw new Error(error);
                }
                return res.json();
            })
            .then((json) => {
                console.log(json);
                navigate("/admin");
            })
            .catch((err) => console.log(err.message))
            .finally(() => setIsRequesting(false));
    }
};

export { Login };
