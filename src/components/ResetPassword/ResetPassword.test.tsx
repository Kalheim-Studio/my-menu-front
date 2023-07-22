import { render, screen } from "@testing-library/react";
import { ResetPassword } from "./ResetPassword";
import { BrowserRouter } from "react-router-dom";

describe("ResetPassword component test", () => {
    it("Component should rendering", () => {
        render(
            <BrowserRouter>
                <ResetPassword />
            </BrowserRouter>
        );

        expect(screen.getByText("Reset Password")).toBeDefined();
    });
});
