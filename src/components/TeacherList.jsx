import { TeacherCard } from "./TeacherCard";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function TeacherList() {
    const { skillName } = useParams();
    const location = useLocation();

    const displaySkillName = location.state?.skillName || skillName;

    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await fetch(
                    `https://skillswap-backend-kkdd.onrender.com/teachers/${skillName}`
                );

                const data = await response.json();

                setTeachers(data);
            } catch (error) {
                console.log("Failed to fetch teachers:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTeachers();
    }, [skillName]);

    if (loading) {
        return <p>Finding teachers...</p>;
    }

    if (teachers.length === 0) {
        return <p>No teachers found for this skill.</p>;
    }
    return (
        <div className="TeacherList-page">

            <div className="TeacherList-header">

                <p className="TeacherList-eyebrow">
                    FIND A TEACHER
                </p>

                <h1>
                    Learn {displaySkillName}
                </h1>

                <p className="TeacherList-subtitle">
                    Find someone who can teach you {displaySkillName} and
                    discover what skills they want to learn in return.
                </p>

            </div>


            <div className="TeacherList-results-header">

                <h2>
                    Teachers available
                </h2>

                <span>
                    {teachers.length} {teachers.length === 1 ? "teacher" : "teachers"}
                </span>

            </div>


            <div className="TeacherList-grid">

                {teachers.map((teacher) => (
                    <TeacherCard
                        key={teacher._id}
                        id={teacher._id}
                        name={teacher.name}
                        skill={skillName}
                        learningSkills={teacher.learningSkills}
                    />
                ))}

            </div>

        </div>
    );
}