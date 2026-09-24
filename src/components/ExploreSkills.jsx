
import { SkillCard } from "./SkillCard";
export function ExploreSkills({ search }) {

    const skills = [{
        courseName: "React",
        category: "Web Development",
        peopleCount: 12
    }, {
        courseName: "Python",
        category: "Programming",
        peopleCount: 20
    }, {
        courseName: "UI/UX Design",
        category: "Design",
        peopleCount: 15
    }, {
        courseName: "JavaScript",
        category: "Web Development",
        peopleCount: 10
    }
    ]
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