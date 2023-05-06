import { render, screen } from "@testing-library/react";
import Menu from "./Menu";
import { useParams } from "react-router-dom";
import { Mock } from "vitest";

vi.mock("react-router-dom", () => ({
    useParams: vi.fn(),
}));

describe("Menu page component test", () => {
    it("Component should rendering restaurant menu if restaurantID in url params", () => {
        (useParams as Mock).mockImplementationOnce(() => ({
            restaurantId: "123",
        }));

        render(<Menu />);

        expect(screen.getByText("Menu")).toBeDefined();
        expect(screen.getByText("Carte")).toBeDefined();
    });

    it("Component should rendering scan Qr code message if no restaurantID in url params", () => {
        (useParams as Mock).mockImplementationOnce(() => ({
            restaurantId: "",
        }));
        render(<Menu />);

        expect(screen.getByText("Menu")).toBeDefined();
        expect(screen.getByText("Merci de scanner un QR code pour accéder à cette page")).toBeDefined();
    });
});
