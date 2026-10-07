
import { SkillCard } from "./SkillCard";
import { useEffect, useState } from "react";

export function ExploreSkills({ search }) {

    const [skills, setSkills] = useState([]);
    useEffect(() => {
        fetch("https://skillswap-backend-kkdd.onrender.com/skills")
            .then((response) => response.json())
            .then((data) => {
                setSkills(data);
            });
    }, [])
    const filteredSkills = skills.filter((skill) =>
        skill.courseName.toLowerCase().includes(search.toLowerCase()) ||
        skill.category.toLowerCase().includes(search.toLowerCase())
    );


    return (
    <section
        id="explore-skills"
        className="Explore-Skills"
    >
        <div className="Explore-header">
            <p className="Explore-eyebrow">
                EXPLORE
            </p>

            <h1>Find something worth learning.</h1>

            <p>
                Discover skills people are ready to share.
            </p>
        </div>

        {filteredSkills.length === 0 ? (
            <p>No skills found.</p>
        ) : (
            <div className="Skills-marquee">
                <div className="Skills-track">

                    {filteredSkills.map((skill) => (
                        <SkillCard
                            key={skill.courseName}
                            courseName={skill.courseName}
                            category={skill.category}
                            peopleCount={skill.peopleCount}
                        />
                    ))}

                    {filteredSkills.map((skill) => (
                        <SkillCard
                            key={`duplicate-${skill.courseName}`}
                            courseName={skill.courseName}
                            category={skill.category}
                            peopleCount={skill.peopleCount}
                        />
                    ))}

                </div>
            </div>
        )}
    </section>
);
}