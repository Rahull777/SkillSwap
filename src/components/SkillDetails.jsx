import {useParams} from 'react-router-dom';
export function SkillDetails() {
    const {skillName} = useParams();

    const skills = {
    react: {
        name: "React",
        category: "Web Development",
        description: "Learn React by exchanging skills with other people.",
        peopleCount: 12
    },

    python: {
        name: "Python",
        category: "Programming",
        description: "Learn Python from people who already know it.",
        peopleCount: 20
    }
};
    const skill = skills[skillName];
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
            <h1> {skill.name}</h1>
            <p>Category: {skill.category}</p>
            <p>{skill.description}</p>
            <p>{skill.peopleCount} people can teach this skill.</p>

            <button>Find a Teacher</button>
        </div>
    )
}