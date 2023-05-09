import { Link } from "react-router-dom";
import { useAuthenticated } from "../../hooks";

const Login = () => {
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
                    <input type="text" id="loginMailInput" name="email" />
                    <div>
                        <input type="radio" id="ownerRadioInput" name="userRole" value="gerant" />
                        <label htmlFor="ownerRadioInput">Gérant</label>
                        <input type="radio" id="managerRadioInput" name="userRole" value="manager" />
                        <label htmlFor="managerRadioInput">Manager</label>
                    </div>
                </div>
                <div className="form-bottom">
                    <Link to="/register">Pas encore inscrit ?</Link>
                    <input type="submit" value="Entrer" />
                </div>
            </form>
        </div>
    );
};

export { Login };
