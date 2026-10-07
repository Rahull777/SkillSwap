import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function Navbar({
    search,
    setSearch,
    loggedIn,
    setLoggedIn,
    darkMode,
    toggleDarkMode
}) {
    const navigate = useNavigate();

    const [searchMessage, setSearchMessage] = useState("");
    const [showAccount, setShowAccount] = useState(false);
    const [accountSection, setAccountSection] = useState("main");
    const [accountUser, setAccountUser] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [savingProfile, setSavingProfile] = useState(false);
    const [profileMessage, setProfileMessage] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [savingPassword, setSavingPassword] = useState(false);



    // Fetch account information when account panel opens
    useEffect(() => {
        if (!showAccount) {
            return;
        }

        async function fetchAccountUser() {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch("https://skillswap-backend-kkdd.onrender.com/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    console.log("Failed to fetch account:", data);
                    return;
                }

                setAccountUser(data);
                setEditedName(data.name);

            } catch (error) {
                console.log("Failed to fetch account:", error);
            }
        }

        fetchAccountUser();

    }, [showAccount]);



    // Logout
    function handleLogout() {
        localStorage.removeItem("token");
        setLoggedIn(false);
        navigate("/login");
    }



    // Search
    async function handleSearch(event) {
        event.preventDefault();

        const searchText = search.trim().toLowerCase();

        if (!searchText) {
            return;
        }

        try {
            const response = await fetch("https://skillswap-backend-kkdd.onrender.com/skills");
            const skills = await response.json();

            const matchingSkill = skills.find((skill) =>
                skill.courseName.toLowerCase() === searchText
            );

            if (matchingSkill) {
                setSearchMessage("");
                navigate(`/skill/${matchingSkill.courseName.toLowerCase()}`);
                setSearch("");
            } else {
                setSearchMessage(
                    "Looks like that skill isn't here yet. Explore the available skills and find something worth learning."
                );
            }

        } catch (error) {
            console.log("Failed to search skills:", error);
        }
    }



    // Save profile name
    async function handleSaveProfile() {
        const name = editedName.trim();

        if (!name) {
            setProfileMessage("Name cannot be empty.");
            return;
        }

        setSavingProfile(true);
        setProfileMessage("");

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("https://skillswap-backend-kkdd.onrender.com/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setProfileMessage(
                    data.message || "Failed to update profile."
                );
                return;
            }

            setAccountUser((currentUser) => ({
                ...currentUser,
                name: name
            }));

            setProfileMessage("Profile updated successfully.");

        } catch (error) {
            console.log("Failed to update profile:", error);
            setProfileMessage("Something went wrong. Please try again.");

        } finally {
            setSavingProfile(false);
        }
    }


    async function handleChangePassword() {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordMessage("Please fill in all password fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage("New password and confirm password do not match.");
            return;
        }

        setSavingPassword(true);
        setPasswordMessage("");

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "https://skillswap-backend-kkdd.onrender.com/users/change-password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        currentPassword: currentPassword,
                        newPassword: newPassword
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setPasswordMessage(
                    data.message || "Failed to change password."
                );
                return;
            }

            setPasswordMessage("Password changed successfully.");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.log("Failed to change password:", error);
            setPasswordMessage("Something went wrong. Please try again.");

        } finally {
            setSavingPassword(false);
        }
    }

    // Cancel profile editing
    function handleCancelProfile() {
        setEditedName(accountUser?.name || "");
        setProfileMessage("");
        setAccountSection("main");
    }



    return (
        <nav className="Navbar" aria-label="Main navigation">

            <div className="Navbar-inner">

                {/* Brand */}

                <Link
                    className="Navbar-brand"
                    to="/"
                    aria-label="SkillSwap home"
                >
                    <span
                        className="Navbar-brand-mark"
                        aria-hidden="true"
                    >
                        S
                    </span>

                    <span>
                        Skill<span>Swap</span>
                    </span>
                </Link>



                {/* Navigation links */}

                <div className="Navbar-links">

                    <a
                        className="Navbar-link Navbar-link-active"
                        href="#explore-skills"
                    >
                        Explore
                    </a>

                    <a
                        className="Navbar-link"
                        href="#how-it-works"
                    >
                        How it works
                    </a>

                </div>



                {/* Right side */}

                <div className="Navbar-actions">

                    {/* Search */}

                    <form
                        className="Navbar-search"
                        onSubmit={handleSearch}
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="6" />
                            <line x1="16" y1="16" x2="21" y2="21" />
                        </svg>

                        <input
                            type="search"
                            placeholder="Search skills"
                            aria-label="Search skills"
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setSearchMessage("");
                            }}
                        />

                    </form>


                    {/* Search error */}

                    {searchMessage && (
                        <div className="Navbar-search-message">
                            <strong>Skill not found</strong>

                            <p>
                                This skill isn't available yet. Try searching
                                for another one.
                            </p>
                        </div>
                    )}



                    {loggedIn ? (

                        <div className="Navbar-profile">

                            <Link
                                to="/requests"
                                className="Navbar-profile-name"
                            >
                                Requests
                            </Link>


                            <Link
                                to="/my-swaps"
                                className="Navbar-profile-name"
                            >
                                My Swaps
                            </Link>


                            {/* Avatar */}

                            <button
                                className="Navbar-avatar"
                                onClick={() => {
                                    setShowAccount(true);
                                    setAccountSection("main");
                                    setProfileMessage("");
                                }}
                            >
                                R
                            </button>


                            <Link
                                to="/profile"
                                className="Navbar-profile-name"
                            >
                                Profile
                            </Link>


                            {/* Logout */}

                            <button
                                onClick={handleLogout}
                                className="Navbar-logout"
                            >
                                Logout
                            </button>


                            {/* Theme */}

                            <button
                                className="Navbar-theme-toggle"
                                onClick={toggleDarkMode}
                                aria-label={
                                    darkMode
                                        ? "Switch to light mode"
                                        : "Switch to dark mode"
                                }
                            >
                                {darkMode ? "☀" : "☾"}
                            </button>

                        </div>

                    ) : (

                        <Link
                            to="/login"
                            className="Navbar-login"
                        >
                            Log in
                        </Link>

                    )}

                </div>

            </div>



            {/* Account panel */}

            {showAccount && (
                <div className="account-panel">

                    <div className="account-panel-header">

                        <div>
                            <h2>Account</h2>

                            <p>
                                Manage your account.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowAccount(false)}
                        >
                            ×
                        </button>

                    </div>



                    {/* Main account menu */}

                    {accountSection === "main" && (

                        <div className="account-panel-options">

                            <button
                                onClick={() => {
                                    setAccountSection("profile");
                                    setProfileMessage("");
                                }}
                            >
                                Profile
                            </button>


                            <button onClick={() => setAccountSection("security")}>
                                Security
                            </button>


                            <button
                                onClick={() => navigate("/profile")}
                            >
                                Your skills
                            </button>

                        </div>

                    )}



                    {/* Profile section */}

                    {accountSection === "profile" && (

                        <div className="account-profile">

                            <button
                                className="account-back-button"
                                onClick={() => {
                                    setAccountSection("main");
                                    setProfileMessage("");
                                }}
                            >
                                ← Back
                            </button>


                            <h3>
                                Profile
                            </h3>


                            <div className="account-profile-form">

                                <label>
                                    Name

                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(event) =>
                                            setEditedName(event.target.value)
                                        }
                                    />
                                </label>


                                <label>
                                    Email

                                    <input
                                        type="email"
                                        value={accountUser?.email || ""}
                                        readOnly
                                    />
                                </label>

                            </div>


                            {/* Success / error message */}

                            {profileMessage && (
                                <p className="account-profile-message">
                                    {profileMessage}
                                </p>
                            )}


                            {/* Profile actions */}

                            <div className="account-profile-actions">

                                <button
                                    className="account-cancel-button"
                                    onClick={handleCancelProfile}
                                >
                                    Cancel
                                </button>


                                <button
                                    className="account-save-button"
                                    onClick={handleSaveProfile}
                                    disabled={savingProfile}
                                >
                                    {savingProfile
                                        ? "Saving..."
                                        : "Save"}
                                </button>

                            </div>

                        </div>

                    )}

                    {accountSection === "security" && (
                        <div className="account-security">

                            <button
                                className="account-back-button"
                                onClick={() => setAccountSection("main")}
                            >
                                ← Back
                            </button>

                            <h3>Security</h3>

                            <p>
                                Change your password to keep your account secure.
                            </p>

                            <div className="account-security-form">

                                <label>
                                    Current password

                                    <input
                                        type="password"
                                        placeholder="Enter current password"
                                        value={currentPassword}
                                        onChange={(event) => setCurrentPassword(event.target.value)}
                                    />
                                </label>

                                <label>
                                    New password

                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(event) => setNewPassword(event.target.value)}
                                    />
                                </label>

                                <label>
                                    Confirm new password

                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </label>

                            </div>

                            {passwordMessage && (
                                <p className="account-password-message">
                                    {passwordMessage}
                                </p>
                            )}

                            <div className="account-profile-actions">

                                <button
                                    className="account-cancel-button"
                                    onClick={() => setAccountSection("main")}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="account-save-button"
                                    onClick={handleChangePassword}
                                    disabled={savingPassword}
                                >
                                    {savingPassword ? "Saving..." : "Save password"}
                                </button>

                            </div>

                        </div>
                    )}

                </div>
            )}

        </nav>
    );
}