import { render, screen } from "@testing-library/react";
import { Profile } from "./Profile";

describe("Profile component test", () => {
    it("Component should rendering", () => {
        render(<Profile />);

        expect(screen.getByText("Profil")).toBeDefined();
    });
});
