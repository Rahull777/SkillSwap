import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
export function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    async function handleSignup() {
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

        const response = await fetch("https://skillswap-backend-kkdd.onrender.com/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message);
            return;
        }

        navigate("/login", {
            state: {
                message: "Account created successfully. Please log in."
            }
        });
    }

    return (
        <div className="Signup-page">

            <div className="Signup-card">

                <div className="Signup-header">
                    <div className="Signup-icon">S</div>

                    <h1>Create your account</h1>

                    <p>
                        Join SkillSwap and start exchanging skills.
                    </p>
                </div>

                <div className="Signup-form">

                    <div className="Signup-field">
                        <label htmlFor="name">Name</label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="Signup-field">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="Signup-field">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="Signup-field">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="Confirm your password"
                        />
                    </div>

                    {error && (
                        <p className="Signup-error">
                            {error}
                        </p>
                    )}

                    <button
                        className="Signup-button"
                        onClick={handleSignup}
                    >
                        Create Account
                    </button>
                    <p className="Signup-login">
                        Already have an account?{" "}
                        <Link to="/login">Log in</Link>
                    </p>

                </div>

            </div>

        </div>
    )
}