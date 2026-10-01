import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export function SkillDetails() {
    const { skillName } = useParams();

    const [skill, setSkill] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/skills/${skillName}`)
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
        <div>
            <h1>{skill.courseName}</h1>
            <p>Category: {skill.category}</p>
            <p>{skill.peopleCount} people can teach this skill.</p>

            <Link to={`/teachers/${skillName}`}>
                Find a Teacher
            </Link>
        </div>
    )
}