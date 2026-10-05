import { useNavigate } from "react-router-dom";

export function Hero({ loggedIn }) {
    const navigate = useNavigate();

    function handleStartSwapping() {
    if (!loggedIn) {
        navigate("/signup");
        return;
    }

    navigate("/");

    setTimeout(() => {
        document
            .getElementById("explore-skills")
            ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
}

    return (
        <section className="Hero">

            <div className="Hero-background"></div>

            <div className="Hero-content">

                <p className="Hero-eyebrow">
                    SKILLS, SHARED DIFFERENTLY
                </p>

                <h1>
                    Learn.
                    <br />
                    Teach.
                    <br />
                    <span>Swap.</span>
                </h1>

                <p className="Hero-description">
                    Learn something new by sharing what you already know.
                    Connect with people and exchange skills — without paying.
                </p>

                <button
                    className="Hero-button"
                    onClick={handleStartSwapping}
                >
                    Start Swapping
                </button>
            </div>


            <div className="Hero-floating-card Hero-card-one">
                <span>React</span>
                <small>12 teachers</small>
            </div>

            <div className="Hero-floating-card Hero-card-two">
                <span>Python</span>
                <small>8 teachers</small>
            </div>

            <div className="Hero-floating-card Hero-card-three">
                <span>UI / UX</span>
                <small>6 teachers</small>
            </div>

        </section>
    );
}