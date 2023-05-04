import { useParams } from "react-router-dom";

const Menu = () => {
    const { restaurantId } = useParams();

    return (
        <div>
            <h1>Menu</h1>
            <p>{restaurantId ? "Carte" : "Merci de scanner un QR code pour accéder à cette page"}</p>
        </div>
    );
};

export default Menu;
