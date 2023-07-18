import { useNavigate } from "react-router-dom";

const PageNotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="home-outlet error-404-container">
            <div className="home-header">
                <h2>Erreur 404</h2>
            </div>
            <div className="home-content error-404-content">
                <div className="error-message">
                    <div>Désolé, cette page n'est pas au menu.</div>
                </div>
                <div className="error-return-button">
                    <button onClick={onClickHandler}>Retour</button>
                </div>
            </div>
        </div>
    );

    function onClickHandler() {
        // Navigate to the previous page
        navigate(-1);
    }
};

export { PageNotFound };
