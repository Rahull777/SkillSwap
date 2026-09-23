
import { Link } from 'react-router-dom';
export function SkillCard({ courseName, category, peopleCount }) {
    return (
        <section className="Skill-Card">
            <p>{courseName}</p>
            <p>{category}</p>
            <p>{peopleCount} people can teach</p>
            <Link className="learn-button" to={`/skill/${courseName.toLowerCase()}`}>
                Learn
            </Link>

        </section>

    )
}