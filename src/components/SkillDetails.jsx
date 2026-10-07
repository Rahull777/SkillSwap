import { useParams,Link } from 'react-router-dom';
import { useEffect, useState } from "react";

export function SkillDetails() {
    const { skillName } = useParams();

    const [skill, setSkill] = useState(null);

    useEffect(() => {
        fetch(`https://skillswap-backend-kkdd.onrender.com/skills/${skillName}`)
            .then((response) => response.json())
            .then((data) => {
                setSkill(data);
            });
    }, [skillName]);
    if (!skill) {
        return (
            <div>
                <h1>Skill Not Found</h1>
                <p>We couldn't find the skill you're looking for.</p>
            </div>
        )
    }
    return (
    <div className="SkillDetails-page">

        <div className="SkillDetails-card">

            <p className="SkillDetails-category">
                {skill.category}
            </p>

            <h1>{skill.courseName}</h1>

            <p className="SkillDetails-description">
                {skill.description}
            </p>

            <div className="SkillDetails-info">
                <span>
                    👥 {skill.peopleCount} people can teach this skill
                </span>
            </div>

            <div className="SkillDetails-actions">
                <Link
                    className="SkillDetails-teacher-button"
                    to={`/teachers/${skillName}`}
                    state={{ skillName: skill.courseName }}
                >
                    Find a Teacher
                </Link>

                <Link
                    className="SkillDetails-back"
                    to="/"
                >
                    ← Back to Explore
                </Link>
            </div>

        </div>

    </div>
);
}