import { render } from "@testing-library/react";
import { Admin } from "./Admin";
import { BrowserRouter } from "react-router-dom";

describe("Admin page component test", () => {
    it("Component should rendering", () => {
        render(
            <BrowserRouter>
                <Admin />
            </BrowserRouter>
        );
    });
});
