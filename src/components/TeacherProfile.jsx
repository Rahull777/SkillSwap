import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export function TeacherProfile() {
    const { id,skill } = useParams();

    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        async function fetchTeacher() {
            console.log("Token:", localStorage.getItem("token"));
            const response = await fetch(
                `http://localhost:3000/users/${id}`,
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
    const response = await fetch("http://localhost:3000/swap-requests", {
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
}




    if (!teacher) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{teacher.name}</h1>

            <h3>Skills they can teach</h3>

            {teacher.teachingSkills.map((skill) => (
                <p key={skill}>{skill}</p>
            ))}

            <h3>Skills they want to learn</h3>

            {teacher.learningSkills.map((skill) => (
                <p key={skill}>{skill}</p>
            ))}

            <button onClick={handleSwapRequest}>
    Request Skill Swap
</button>
        </div>
    );
}