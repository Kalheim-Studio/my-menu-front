import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuthenticated } from "../../hooks";
import { Login } from "./Login";
import { authenticate } from "../../services";

vi.mock("../../hooks/useAuthenticated/useAuthenticated", () => ({
    useAuthenticated: vi.fn().mockImplementation(vi.fn()),
}));

describe("Login component test", () => {
    
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should be Defined", () =>{
        expect(Login).toBeDefined();
    });

    it("Component should rendering", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        
        /**
         * Hook useAuthenticated
         */
        expect(useAuthenticated).toHaveBeenCalled();

        /**
         * Title
         */
        expect(screen.getByText("Accès Restaurateur")).toBeDefined();

        /**
         * Form
         */
        // Email
        expect(screen.getByText("Email :")).toBeDefined();
        expect(screen.getByPlaceholderText("john.doe@mail.com")).toBeDefined();

        // Password
        expect(screen.getByText("Mot de passe :")).toBeDefined();
        expect(screen.getByPlaceholderText("Saisissez votre mot de passe")).toBeDefined();

        /**
         * role
         */
        const radios = screen.getAllByRole("radio");
        expect(radios.length).toBe(2);
        
        // owner
        expect(radios[0].getAttribute("value")).toBe("owner");
        expect(radios[0].getAttribute("name")).toBe("role");
        expect(screen.getByText("Gérant")).toBeDefined();
        // manager
        expect(radios[1].getAttribute("value")).toBe("manager");
        expect(radios[1].getAttribute("name")).toBe("role");
        expect(screen.getByText("Manager")).toBeDefined();

        // stayLogged
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeDefined();
        expect(checkbox.getAttribute("value")).toBe("true");
        expect(screen.getByText("Se souvenir de moi")).toBeDefined();

        // Connection problem link
        const problemLink = screen.getByText("Problème de connexion ?");
        expect(problemLink).toBeDefined();

        // Not subscribe link
        const subscribeLink = screen.getByText("Pas encore inscrit ?");
        expect(subscribeLink).toBeDefined();

        // Enter button
        expect(screen.getByText("Entrer")).toBeDefined();
    });

    it("Should dispolay/undisplay idetifier textfield if manager", async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const ownerRadio = screen.getAllByRole("radio")[0];
        const managerRadio = screen.getAllByRole("radio")[1];

        await userEvent.click(managerRadio);

        expect(screen.getByText("Identifiant manager :")).toBeDefined();
        expect(screen.getByPlaceholderText("JohnDoe")).toBeDefined();
        
        await userEvent.click(ownerRadio);
        
        let managerLabel;
        let managerInput;

        try{
            managerLabel = screen.getByText("Identifiant manager :");
            managerInput = screen.getByPlaceholderText("JohnDoe");
        }
        catch(err){
            //
        }

        expect(managerLabel).toBeUndefined();
        expect(managerInput).toBeUndefined();

    });

    it("Should grant one session access", async () => {
        vi.mock("../../services/authenticate/authenticate", () => ({
            authenticate: vi.fn().mockResolvedValueOnce({result: "thisIsAToken", stayLogged: "false"})
        }));
        const localSetItemSpy = vi.spyOn(Storage.prototype, "setItem");

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText("john.doe@mail.com");
        fireEvent.change(emailInput, {target: {value: "john.doe@mail.com"}});

        const passwordInput = screen.getByPlaceholderText("Saisissez votre mot de passe");
        fireEvent.change(passwordInput, {target: {value: "password"}});
        
        const enterButton = screen.getByText("Entrer");

        await userEvent.click(enterButton);

        expect(authenticate).toHaveBeenCalledWith({email: "john.doe@mail.com",role: "owner", password: "password"});
        expect(localSetItemSpy).toHaveBeenCalledWith("auth", "thisIsAToken");
    });
});
