import { Link } from "react-router-dom";

export function TeacherCard({ id, name, skill, learningSkills }) {
    return (
        <div className="TeacherCard">

            <div className="TeacherCard-avatar">
                {name.charAt(0).toUpperCase()}
            </div>

            <div className="TeacherCard-content">

                <h3>{name}</h3>

                <p className="TeacherCard-role">
                    SkillSwap member
                </p>

                <p className="TeacherCard-learning-title">
                    Wants to learn
                </p>

                <div className="TeacherCard-learning-skills">
                    {learningSkills.map((learningSkill) => (
                        <span key={learningSkill}>
                            {learningSkill}
                        </span>
                    ))}
                </div>

                <div className="TeacherCard-footer">
                    <Link
                        className="TeacherCard-button"
                        to={`/teacher/${id}/${skill}`}
                    >
                        View Profile →
                    </Link>
                </div>

            </div>

        </div>
    );
}