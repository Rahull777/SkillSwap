import { Link } from 'react-router-dom';

export function SkillCard({ courseName, category, peopleCount }) {
    return (
        <Link
            className="Skill-Card"
            to={`/skill/${courseName.toLowerCase()}`}
        >
            <p>{courseName}</p>
            <p>{category}</p>
            <p>{peopleCount} people can teach</p>

            <span className="learn-button">
                Learn
            </span>
        </Link>
    );
}