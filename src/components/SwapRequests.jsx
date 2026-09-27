import { useParams } from "react-router-dom";
import { useState } from "react";

export function SwapRequest() {
    const { skillName } = useParams();
    const [teachingSkill, setTeachingSkill] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit() {
    if (teachingSkill.trim() === "") {
        setError("Please enter a skill you can teach.");
        return;
    }

    console.log("Learning:", skillName);
    console.log("Teaching:", teachingSkill);

    setError("");
    setSubmitted(true);
}
    return (
        <div>
            <h1>Request Skill Swap</h1>

            <p>You want to learn:</p>
            <p>{skillName}</p>

            <label>
                What can you teach in return?
            </label>

            <input placeholder="Enter a skill" value={teachingSkill} onChange={(event) => setTeachingSkill(event.target.value)} />
            {error && <p>{error}</p>}

            {!submitted && (
                <button onClick={handleSubmit}>
                    Send Swap Request
                </button>
            )}

            {submitted && (
                <p>Swap request sent successfully!</p>
            )}
        </div>
    );
}