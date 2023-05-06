import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home page component test", () => {
    it("Component should rendering", () => {
        render(<Home />);

        expect(screen.getByText("Portail d'accès")).toBeDefined();
    });
});
