import { render, screen } from "@testing-library/react";
import { Home } from "./Home";

describe("Home page component test", () => {
    it("Component should rendering", () => {
        render(<Home />);

        expect(screen.getByAltText("logo my menu")).toBeDefined();
    });
});
