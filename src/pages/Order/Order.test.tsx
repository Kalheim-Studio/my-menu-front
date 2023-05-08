import { render, screen } from "@testing-library/react";
import { Order } from "./Order";

describe("Order page component test", () => {
    it("Component should rendering", () => {
        render(<Order />);

        expect(screen.getByText("Commande")).toBeDefined();
    });
});
