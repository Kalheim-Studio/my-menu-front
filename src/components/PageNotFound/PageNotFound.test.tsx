import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PageNotFound } from "./PageNotFound";

describe("App component test", () => {
    it("Component should rendering", () => {
        render(
            <BrowserRouter>
                <PageNotFound />
            </BrowserRouter>
        );

        expect(screen.getByText("Désolé, cette page n'est pas au menu.")).toBeDefined();
    });
});
