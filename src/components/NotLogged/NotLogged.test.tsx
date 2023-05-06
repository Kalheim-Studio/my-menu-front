import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotLogged from "./NotLogged";

describe("NotLogged component test", () => {
    it("Component should rendering", () => {
        render(
            <BrowserRouter>
                <NotLogged />
            </BrowserRouter>
        );

        expect(screen.getByText("Se connecter")).toBeDefined();
    });
});
