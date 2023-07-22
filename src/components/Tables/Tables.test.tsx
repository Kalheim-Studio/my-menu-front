import { render, screen } from "@testing-library/react";
import { Tables } from "./Tables";

describe("Tables component test", () => {
    it("Component should rendering", () => {
        render(<Tables />);

        expect(screen.getByText("Tables")).toBeDefined();
    });
});
