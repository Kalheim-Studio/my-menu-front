import { render, screen } from "@testing-library/react";
import { ValidateAccount } from "./ValidateAccount";

describe("ValidateAccount component test", () => {
    it("Component should rendering", () => {
        render(<ValidateAccount />);

        expect(screen.getByText("ValidateAccount")).toBeDefined();
    });
});
