import { TeacherCard } from "./TeacherCard";
import { useParams } from "react-router-dom";

export function TeacherList() {
    const { skillName } = useParams();

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

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.skill.toLowerCase() === skillName.toLowerCase()
    );

    return (
        <div>
            <h2>People who can teach {skillName}</h2>

            <div>
                {filteredTeachers.map((teacher) => {
                    return (
                        <TeacherCard
                            id={teacher.id}
                            name={teacher.name}
                            skill={teacher.skill}
                            description={teacher.description}
                        />
                    );
                })}
            </div>
        </div>
    );
}