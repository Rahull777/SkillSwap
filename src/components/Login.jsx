import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function Login({ setLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message;

    async function handleLogin() {
        if (email.trim() === "" || password.trim() === "") {
            setError("Please enter both email and password.");
            return;
        }

        setError("");

        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message);
            return;
        }

        localStorage.setItem("token", data.token);

        setLoggedIn(true);
        navigate("/");
    }

    return (
        <div className="Login-page">

            <div className="Login-card">

                <div className="Login-header">
                    <div className="Login-icon">S</div>

                    <h1>Welcome back</h1>

                    <p>
                        Log in to continue your SkillSwap journey.
                    </p>
                </div>

                <div className="Login-form">

                    <div className="Login-field">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="Login-field">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <p className="Login-error">
                            {error}
                        </p>
                    )}

                    <button
                        className="Login-button"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <p className="Login-signup">
                        Don't have an account?{" "}
                        <Link to="/signup">Sign up</Link>
                    </p>
                    {successMessage && (
                        <p className="Login-success">
                            {successMessage}
                        </p>
                    )}
                </div>

            </div>

        </div>
    )
};