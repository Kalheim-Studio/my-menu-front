import { render, screen } from "@testing-library/react";
import { Register } from "./Register";
import { BrowserRouter } from "react-router-dom";

describe("Register component test", () => {
    it("Component should rendering", () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        expect(screen.getByText("Register")).toBeDefined();
    });
});
