import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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

    function handleLogout() {
        localStorage.removeItem("token");
        setLoggedIn(false);
        navigate("/login");
    }

    async function handleSearch(event) {
        event.preventDefault();

        const searchText = search.trim().toLowerCase();

        if (!searchText) {
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/skills");
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
    return (
        <nav className="Navbar" aria-label="Main navigation">

            <div className="Navbar-inner">

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


                <div className="Navbar-actions">


                    <form className="Navbar-search" onSubmit={handleSearch}>

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
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
                    {searchMessage && (
                        <p className="Navbar-search-message">
                            <strong>Skill not found</strong>
                            <p>
                                This skill isn't available yet. Try searching for another one.
                            </p>
                        </p>
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

                            <Link
                                to="/profile"
                                className="Navbar-avatar"
                            >
                                R
                            </Link>

                            <Link
                                to="/profile"
                                className="Navbar-profile-name"
                            >
                                Profile
                            </Link>



                            <button
                                onClick={handleLogout}
                                className="Navbar-logout"
                            >
                                Logout
                            </button>

                            <button
                                className="Navbar-theme-toggle"
                                onClick={toggleDarkMode}
                                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
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

        </nav>
    );
}