import { TeacherCard } from "./TeacherCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function TeacherList() {
    const { skillName } = useParams();

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/teachers/${skillName}`)
            .then((response) => response.json())
            .then((data) => {
                setTeachers(data);
            });
    }, [skillName]);

    if (teachers.length === 0) {
        return <p>No teachers found.</p>;
    }


    return (
        <div>
            <h2>People who can teach {skillName}</h2>

            <div>
                {teachers.map((teacher) => {
                    return (
                        <TeacherCard
                            key={teacher._id}
                            name={teacher.name}
                            skill={skillName}
                            description={teacher.experience}
                        />
                    );
                })}
            </div>
        </div>
    );
}