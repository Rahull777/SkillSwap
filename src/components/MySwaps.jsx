import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function getUserIdFromToken() {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload.userId;
}


export function MySwaps() {
    const [swaps, setSwaps] = useState([]);
    const [meetingLink, setMeetingLink] = useState("");
    const [activeSwapId, setActiveSwapId] = useState(null);
    const currentUserId = getUserIdFromToken();



    useEffect(() => {
        async function fetchSwaps() {
            const response = await fetch(
                "https://skillswap-backend-kkdd.onrender.com/swap-requests/my-swaps",
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await response.json();

            console.log("My swaps:", data);

            if (response.ok) {
                const sortedSwaps = [...data].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setSwaps(sortedSwaps);
            }
        }

        fetchSwaps();
    }, []);

    async function handleSaveMeetingLink() {
    if (!meetingLink.trim()) {
        return;
    }

    const response = await fetch(
        `https://skillswap-backend-kkdd.onrender.com/swap-requests/${activeSwapId}/meeting`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                meetingLink: meetingLink.trim()
            })
        }
    );

    const data = await response.json();
    console.log("Status:", response.status);
console.log("Response:", data);

    if (response.ok) {
        console.log(data.message);
    }
}

    return (
        <div className="swaps-page">

            <div className="swaps-header">
                <h1>My Swaps</h1>
                <p>People you're connected with through SkillSwap.</p>
            </div>

            {swaps.length === 0 ? (
                <div className="swaps-empty">
                    <h3>No active swaps yet</h3>
                    <p>Once a swap request is accepted, your connection will appear here.</p>
                </div>
            ) : (
                <div className="swaps-list">
                    {swaps.map((swap) => (
                        <div className="swap-card" key={swap._id}>

                            <div className="swap-card-header">
                                <div>
                                    <p className="swap-label">Skill Swap</p>
                                    <h2>Swap with {swap.otherUser.name}</h2>
                                </div>

                                <span className="swap-status">
                                    {swap.status}
                                </span>
                            </div>

                            <div className="swap-skill">
                                <p>You connected over</p>
                                <strong>{swap.skill}</strong>
                            </div>

                            <div className="swap-skills">

                                <div className="swap-skill-group">
                                    <h3>They can teach</h3>

                                    <div className="swap-skill-list">
                                        {swap.otherUser.teachingSkills.map((skill) => (
                                            <span key={skill}>{skill}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="swap-skill-group">
                                    <h3>They want to learn</h3>

                                    <div className="swap-skill-list">
                                        {swap.otherUser.learningSkills.map((skill) => (
                                            <span key={skill}>{skill}</span>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <Link
                                className="swap-profile-link"
                                to={`/teacher/${swap.otherUser._id}/${swap.skill}`}
                            >
                                View Profile
                            </Link>

                            <button
                                className="meeting-button"
                                onClick={() => setActiveSwapId(swap._id)}
                            >
                                Add Meeting Link
                            </button>

                            {activeSwapId === swap._id && (
    <div className="meeting-form">
        <input
            type="url"
            placeholder="Paste Google Meet or Zoom link"
            value={meetingLink}
            onChange={(event) => setMeetingLink(event.target.value)}
        />

        <button
    className="meeting-save-button"
    onClick={handleSaveMeetingLink}
>
    Save Meeting Link
</button>
    </div>
)}

                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}