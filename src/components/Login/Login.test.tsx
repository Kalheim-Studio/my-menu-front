import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("App component test", () => {
    it("Component should rendering", () => {
        render(<Login />);

        expect(screen.getByText("Login")).toBeDefined();
    });
});
