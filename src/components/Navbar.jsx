import { Link,useNavigate } from "react-router-dom";
export function Navbar({ search, setSearch, loggedIn, setLoggedIn }) {
    const navigate = useNavigate();
    function handleLogout() {
        setLoggedIn(false);
        navigate("/login");
    }
    return (
        <nav className="Navbar" aria-label="Main navigation">

            <div className="Navbar-inner">
                <a className="Navbar-brand" href="/" aria-label="SkillSwap home">
                    <span className="Navbar-brand-mark" aria-hidden="true">S</span>
                    <span>Skill<span>Swap</span></span>
                </a>

                <div className="Navbar-links">
                    <a className="Navbar-link Navbar-link-active" href="#explore">Explore</a>
                    <a className="Navbar-link" href="#how-it-works">How it works</a>
                </div>

                <div className="Navbar-actions">
                    <label className="Navbar-search">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="m21 21-4.35-4.35m1.35-5.15a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />
                        </svg>
                        <input type="search" placeholder="Search skills" aria-label="Search skills"
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value)
                            }}
                        />
                    </label>
                    {loggedIn ? (
                        <a className="Navbar-profile" href="#profile" aria-label="Open profile">
                            <Link to="/profile" className="Navbar-avatar">R</Link>
                            <Link to="/profile" className="Navbar-profile-name">Profile</Link>
                            <a onClick={handleLogout} className="Navbar-logout">
                                Logout
                            </a>
                        </a>
                    ) : (
                        <Link to="/login" className="Navbar-login">Log in</Link>
                    )}
                </div>
            </div>

        </nav>
    )
}
