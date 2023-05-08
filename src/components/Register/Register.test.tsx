import { render, screen } from "@testing-library/react";
import { Register } from "./Register";

describe("Register component test", () => {
    it("Component should rendering", () => {
        render(<Register />);

        expect(screen.getByText("Register")).toBeDefined();
    });
});
