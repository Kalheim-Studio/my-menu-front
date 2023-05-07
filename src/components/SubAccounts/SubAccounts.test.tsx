import { render, screen } from "@testing-library/react";
import { SubAccounts } from "./SubAccounts";

describe("SubAccount component test", () => {
    it("Component should rendering", () => {
        render(<SubAccounts />);

        expect(screen.getByText("Comptes employés")).toBeDefined();
    });
});
