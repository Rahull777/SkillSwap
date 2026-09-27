import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
export function TeacherProfile() {
    const { id } = useParams();

    const teachers = [
        {   
            id:"aman",
            name: "Aman",
            skill: "React",
            description: "Frontend developer who can teach React."
        },
        {   
            id:"priya",
            name: "Priya",
            skill: "React",
            description: "Enjoys teaching React to beginners."
        },
        {
            id:"neha",
            name: "Neha",
            skill: "React",
            description: "React developer with experience in web development."
        },
        {
            id:"rohit",
            name: "Rohit",
            skill: "Python",
            description: "Python developer who enjoys teaching beginners."
        }
    ];
    const teacher =teachers.find((teacher)=> teacher.id===id)
    if (!teacher) {
    return (
        <div>
            <h1>Teacher Not Found</h1>
            <p>We couldn't find this teacher.</p>
        </div>
    );
}
    return(
        <div>
            <h1>{teacher.name}</h1>
            <p>Skill: {teacher.skill}</p>
            <p>{teacher.description}</p>
            <Link to={`/swap/${teacher.skill.toLowerCase()}`}>Request Skill Swap</Link>
        </div>
    )
}