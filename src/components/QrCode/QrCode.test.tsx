import { render, screen } from "@testing-library/react";
import { QrCode } from "./QrCode";

describe("QrCode component test", () => {
    it("Component should rendering", () => {
        render(<QrCode />);

        expect(screen.getByText("QR Code")).toBeDefined();
    });
});
