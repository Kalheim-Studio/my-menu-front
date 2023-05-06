import { render, screen } from "@testing-library/react";
import MenuAdmin from "./MenuAdmin";

describe("MenuAdmin component test", () => {
    it("Component should rendering", () => {
        render(<MenuAdmin />);

        expect(screen.getByText("Menu Admin")).toBeDefined();
    });
});
