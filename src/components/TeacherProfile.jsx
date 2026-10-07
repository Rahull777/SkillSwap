import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function TeacherProfile() {
    const { id, skill } = useParams();

    const [teacher, setTeacher] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchTeacher() {
            console.log("Token:", localStorage.getItem("token"));
            const response = await fetch(
                `https://skillswap-backend-kkdd.onrender.com/users/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await response.json();

            console.log("Teacher profile:", data);

            if (response.ok) {
                setTeacher(data);
            }
        }

        fetchTeacher();
    }, [id]);


    async function handleSwapRequest() {
    const response = await fetch("https://skillswap-backend-kkdd.onrender.com/swap-requests", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            receiverId: teacher._id,
            skill: skill
        })
    });

    const data = await response.json();

    console.log("Swap request response:", data);

    setMessage(data.message);
}




    if (!teacher) {
        return <p>Loading...</p>;
    }

    return (
    <div className="teacher-profile-page">

        <div className="teacher-profile-card">

            <div className="teacher-profile-header">
                <div className="teacher-avatar">
                    {teacher.name.charAt(0).toUpperCase()}
                </div>

                <div>
                    <p className="teacher-profile-label">
                        SkillSwap member
                    </p>

                    <h1>{teacher.name}</h1>

                    <p className="teacher-learning">
                        Wants to learn <strong>{skill}</strong>
                    </p>
                </div>
            </div>


            <div className="teacher-skills">

                <div className="teacher-skill-section">
                    <h3>Skills they can teach</h3>

                    <div className="teacher-skill-list">
                        {teacher.teachingSkills.map((skill) => (
                            <span key={skill}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>


                <div className="teacher-skill-section">
                    <h3>Skills they want to learn</h3>

                    <div className="teacher-skill-list">
                        {teacher.learningSkills.map((skill) => (
                            <span key={skill}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

            </div>


            <div className="teacher-profile-action">

                <button
                    className="teacher-request-button"
                    onClick={handleSwapRequest}
                >
                    Request Skill Swap
                </button>

                {message && (
                    <p className="teacher-message">
                        {message}
                    </p>
                )}

            </div>

        </div>

    </div>
);
}