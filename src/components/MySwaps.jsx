import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function MySwaps() {
    const [swaps, setSwaps] = useState([]);

    useEffect(() => {
        async function fetchSwaps() {
            const response = await fetch(
                "http://localhost:3000/swap-requests/my-swaps",
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await response.json();

            console.log("My swaps:", data);

            if (response.ok) {
                setSwaps(data);
            }
        }

        fetchSwaps();
    }, []);

    return (
        <div>
            <h1>My Swaps</h1>

            {swaps.length === 0 ? (
                <p>No active swaps yet.</p>
            ) : (
                swaps.map((swap) => (
                    <div key={swap._id}>
                        <h2>Swap with {swap.otherUser.name}</h2>
                        <Link
    to={`/teacher/${swap.otherUser._id}/${swap.skill}`}
>
    View Profile
</Link>

                        <p>Status: {swap.status}</p>

                        <h3>They can teach:</h3>

                        {swap.otherUser.teachingSkills.map((skill) => (
                            <p key={skill}>{skill}</p>
                        ))}

                        <h3>They want to learn:</h3>

                        {swap.otherUser.learningSkills.map((skill) => (
                            <p key={skill}>{skill}</p>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}