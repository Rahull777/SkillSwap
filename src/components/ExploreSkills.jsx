
import { SkillCard } from "./SkillCard";
import { useEffect, useState } from "react";

export function ExploreSkills({ search }) {

    const [skills, setSkills] = useState([]);
    useEffect(() =>{
        fetch("http://localhost:3000/skills")
        .then((response) => response.json())
        .then((data) => {
            setSkills(data);
        });
    },[])
    const filteredSkills = skills.filter((skill) =>
        skill.courseName.toLowerCase().includes(search.toLowerCase()) ||
        skill.category.toLowerCase().includes(search.toLowerCase())
    );


    return (

        <section className="Explore-Skills">
            <h1>Explore Skills</h1>
            <p>Discover new skills to learn and teach.</p>

            <div className="Skill-Card-Container">
                {filteredSkills.length === 0 ? (
                    <p>No skills found.</p>
                ) : (
                    filteredSkills.map((skill) => {
                        return (
                            <SkillCard
                                courseName={skill.courseName}
                                category={skill.category}
                                peopleCount={skill.peopleCount}
                            />
                        )
                    })
                )}
            </div>
        </section>
    )
}