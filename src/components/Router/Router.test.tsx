import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";

describe("Router component test", () => {
    it("Component should rendering", () => {
        render(
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        );
    });
});
