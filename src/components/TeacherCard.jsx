import { Link } from "react-router-dom";
export function TeacherCard({ id, name, skill, description }) {
    return (
        <div className="Teacher-Card">
            <h3>{name}</h3>
            <p>{skill}</p>
            <p>{description}</p>
            <Link to={`/teacher/${id}`}>
    View Profile
</Link>
        </div>
    )
}