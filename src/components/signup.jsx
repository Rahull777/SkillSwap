import { useState } from 'react';
import { useNavigate } from "react-router-dom";
export function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleSignup() {
    if (
        name.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
    ) {
        setError("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    setError("");
    navigate("/login");
}

    return (
        <div className="Signup-page">
            <div className="Signup-card">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                />

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
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm your password"
                />
                {error && <p>{error}</p>}
                <button onClick={handleSignup}>
                    Create Account
                </button>
            </div>
        </div>

    )
}