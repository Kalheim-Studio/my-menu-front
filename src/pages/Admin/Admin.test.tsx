import { render, screen } from "@testing-library/react";
import { Admin } from "./Admin";

describe("Admin page component test", () => {
    it("Component should rendering", () => {
        render(<Admin />);

        expect(screen.getByText("Admin")).toBeDefined();
    });
});
