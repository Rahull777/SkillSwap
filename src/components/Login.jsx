import { useState } from "react";
import {useNavigate} from "react-router-dom";

export function Login({ setLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        if (email.trim() === "" || password.trim() === "") {
            setError("Please enter both email and password.");
            return;
        }

        setError("");
        setLoggedIn(true);
        navigate("/");
    }

    return (
        <div className="Login-page">
            <div className="Login-card">

                
                    <>
                        <h1>Login</h1>

                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email"
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                        />

                        {error && <p>{error}</p>}

                        <button onClick={handleLogin}>
                            Login
                        </button>
                    </>
                

            </div>
        </div>
    );
}