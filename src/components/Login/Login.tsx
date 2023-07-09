import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faSpinner, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuthenticated } from "../../hooks";
import { authenticate } from "../../services/authenticate/authenticate";
import { LoginFormData } from "../../types/Login";

const Login = () => {
    //  States
    const [isManager, setIsManager] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Refs
    const pwdRef = useRef<HTMLInputElement>(null);

    // React-router-dom
    const navigate = useNavigate();

    // Check if authenticated
    useAuthenticated();

    // useEffect
    useEffect(() => {        
        // Focus on password input with cursor at the end
        setInputCursorPosition(pwdRef);
    }, [showPwd]);

    return (
        <div className="login-container">
            <div className="login-header">
                <h2>Accès Restaurateur</h2>
            </div>
            <form onSubmit={onSubmitHandler} >
                <div className="login-form-inputs">
                    <div className="login-error-container">
                        <div className="login-error">{errorMessage}</div>
                    </div>
                    <div className="login-form-fragment">
                        <label htmlFor="loginMailInput">Email :</label>
                        <input
                            type="email"
                            id="loginMailInput"
                            className="form-input"
                            name="email"
                            required
                            placeholder="john.doe@mail.com"
                            autoComplete="email"
                            disabled={isRequesting}
                        />
                        <div>
                            <input
                                type="radio"
                                id="ownerRadioInput"
                                name="role"
                                value="owner"
                                defaultChecked
                                disabled={isRequesting}
                                onChange={radioChangeHandler}
                            />
                            <label htmlFor="ownerRadioInput" className="login-text-small">
                Gérant
                            </label>
                            <input
                                type="radio"
                                id="managerRadioInput"
                                name="role"
                                value="manager"
                                disabled={isRequesting}
                                onChange={radioChangeHandler}
                            />
                            <label htmlFor="managerRadioInput" className="login-text-small">
                Manager
                            </label>
                        </div>
                    </div>
                    {isManager && (
                        <div className="login-form-fragment">
                            <label htmlFor="loginIndentifierInput">Identifiant manager :</label>
                            <input
                                type="text"
                                id="loginIndentifierInput"
                                className="form-input"
                                name="indentifier"
                                disabled={isRequesting}
                                required
                                placeholder="JohnDoe"
                            />
                        </div>
                    )}
                    <div className="login-form-fragment">
                        <label htmlFor="loginPwdInput">Mot de passe :</label>
                        <div className="input-pwd-box">
                            <input
                                ref={pwdRef}
                                required
                                type={showPwd ? "text" : "password"}
                                id="loginPwdInput"
                                className="form-input"
                                name="password"
                                disabled={isRequesting}
                                placeholder="Saisissez votre mot de passe"
                                autoComplete="off"
                            />
                            <span className="show-pwd-icon">
                                <FontAwesomeIcon
                                    icon={showPwd ? faEyeSlash : faEye}
                                    className="show-pwd-icon form-input"
                                    onClick={showPwdHandler}
                                />
                            </span>
                        </div>
                        <div>
                            <input 
                                type="checkbox"
                                name="stayLogged"
                                id="stayLogged"
                                value={"true"}
                                disabled={isRequesting}
                            />
                            <label htmlFor="stayLogged" className="login-text-small">
                Se souvenir de moi
                            </label>
                        </div>
                    </div>

                    <Link className="login-text-small" to="/reset-password">
            Problème de connexion ?
                    </Link>
                </div>
                <div className="form-bottom">
                    <Link to="/register">Pas encore inscrit ?</Link>
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

    // Handlers
    function radioChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "manager") setIsManager(true);
        else setIsManager(false);
    }

    function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        setIsRequesting(true);

        // Set body content with login form data
        const body: Partial<LoginFormData> = {};
        formData.forEach((data, key) =>{
            if(data){
                body[key as keyof LoginFormData] = data.toString();
            }
        });
        
        authenticate(body)
            .then(response => grantAccess(response.result, response.stayLogged))
            .catch(err => {
                setErrorMessage(err.result);
                setIsRequesting(false);
            });
    }

    function showPwdHandler() {
        setShowPwd(!showPwd);
    }

    // Methods
    function grantAccess(token: string, stayLogged?: string) {
        
        if(stayLogged === "true")
            localStorage.setItem("auth", token);
        else
            sessionStorage.setItem("auth", token);

        navigate("/admin");
    }

    function setInputCursorPosition (ref: React.RefObject<HTMLInputElement>) {
        const root = ref.current;

        if (root) {
            root.focus();
            console.log(root.value);
            root.selectionStart = root.value.length;
            root.selectionEnd = root.value.length;
        }
    }
};

export { Login };
