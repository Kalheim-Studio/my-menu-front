import { render, screen } from "@testing-library/react";
import PageNotFound from "./PageNotFound";

describe("App component test", () => {
    it("Component should rendering", () => {
        render(<PageNotFound />);

        expect(screen.getByText("Page not found")).toBeDefined();
    });
});
