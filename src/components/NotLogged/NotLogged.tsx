import { Link } from "react-router-dom";

const NotLogged = () => {
    return (
        <div>
            <div>Non identifiée</div>
            <Link to="/login">Se connecter</Link>
        </div>
    );
};

export { NotLogged };
