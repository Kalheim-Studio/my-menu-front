import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "../../Router/Router";
import { Home } from "./Home";

describe("Home page component test", () => {
    it("Component should rendering", () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        expect(screen.getByAltText("logo my menu")).toBeDefined();
    });
});
