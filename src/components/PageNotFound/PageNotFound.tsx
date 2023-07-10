const PageNotFound = () => {
    return (
        <div className="home-outlet error-404-container">
            <div className="home-header">
                <h2>Erreur 404</h2>
            </div>
            <div className="home-content error-404-content">
                <div className="error-message">
                    <div>Cette page n'est pas au menu.</div>
                </div>
                <div className="error-return-button">
                    <button>Retour</button>
                </div>
            </div>
        </div>
    );
};

export { PageNotFound };
