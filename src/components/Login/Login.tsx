import { useAuthenticated } from "../../hooks";

const Login = () => {
    console.log("before hook");
    useAuthenticated();
    console.log("after hook");

    return (
        <div>
            <p>Login</p>
        </div>
    );
};

export { Login };
