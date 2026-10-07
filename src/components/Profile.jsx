import { useState, useEffect } from 'react';

export function Profile() {

    const token = localStorage.getItem("token");

    const [user, setUser] = useState(null);

    const [teachingskills, setTeachingSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");

    const [learningskills, setLearningSkills] = useState([]);
    const [newLearning, setNewLearning] = useState("");




    //so that data remains on page even if page refreshes
    useEffect(() => {
        async function fetchUser() {
            const response = await fetch("https://skillswap-backend-kkdd.onrender.com/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            setUser(data);
            setTeachingSkills(data.teachingSkills);
            setLearningSkills(data.learningSkills);
        }

        fetchUser();
    }, [token]);


    //Add a new skill
    async function handleAddskills() {
        const skill = newSkill.trim();

        if (!skill) {
            return;
        }

        if (teachingskills.includes(skill)) {
            return;
        }

        const updatedTeachingSkills = [...teachingskills, skill];

        const response = await fetch("https://skillswap-backend-kkdd.onrender.com/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                teachingSkills: updatedTeachingSkills,
                learningSkills: learningskills
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("Failed to update profile:", data);
            return;
        }

        setTeachingSkills(updatedTeachingSkills);
        setNewSkill("");
    }

    //Remove a teaching skill
    async function handleRemoveSkills(skilltoremove) {
        const updatedSkills = teachingskills.filter((skill) => {
            return skill !== skilltoremove;
        });

        const response = await fetch("https://skillswap-backend-kkdd.onrender.com/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                teachingSkills: updatedSkills,
                learningSkills: learningskills
            })
        });

        const data = await response.json();

        console.log("Backend response:", data);

        if (!response.ok) {
            console.log("Failed to update profile:", data);
            return;
        }

        setTeachingSkills(updatedSkills);
    }


    //Add a learning skill
    async function handleNewSkilltolearn() {
        const skill = newLearning.trim();

        if (!skill) {
            return;
        }

        if (learningskills.includes(skill)) {
            return;
        }

        const updatedLearningSkills = [...learningskills, skill];

        const response = await fetch("https://skillswap-backend-kkdd.onrender.com/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                teachingSkills: teachingskills,
                learningSkills: updatedLearningSkills
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("Failed to update profile:", data);
            return;
        }

        setLearningSkills(updatedLearningSkills);
        setNewLearning("");
    }

    //Remove a learning skill
    async function handleRemoveLearningSkills(skilltoremove) {
        const updatedSkills = learningskills.filter((skill) => {
            return skill !== skilltoremove;
        });

        const response = await fetch("https://skillswap-backend-kkdd.onrender.com/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                teachingSkills: teachingskills,
                learningSkills: updatedSkills
            })
        });

        const data = await response.json();

        console.log("Backend response:", data);

        if (!response.ok) {
            console.log("Failed to update profile:", data);
            return;
        }

        setLearningSkills(updatedSkills);
    }

    return (
        <div className="profile-page">

            <div className="profile-header">

                <div className="profile-avatar">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                    <p className="profile-eyebrow">
                        MY PROFILE
                    </p>

                    <h1>{user?.name}</h1>

                    <p className="profile-subtitle">
                        Share what you know. Learn something new.
                    </p>
                </div>

            </div>

            <div className="profile-sections">

                {/* Teaching Skills */}
                <div className="skill-section">
                    <div className="skill-section-header">
                        <span className="skill-section-label">
                            I CAN TEACH
                        </span>

                        <h3>Skills I can teach</h3>

                        <p>
                            Skills you're ready to share with others.
                        </p>
                    </div>

                    <div className="skills-list">
                        {teachingskills.map((skill) => {
                            return (
                                <div className="skill-item" key={skill}>
                                    <span>{skill}</span>
                                    <button
                                        onClick={() => handleRemoveSkills(skill)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="skill-input">
                        <input
                            placeholder="Enter a skill you can teach"
                            value={newSkill}
                            onChange={(event) =>
                                setNewSkill(event.target.value)
                            }
                        />
                        <button onClick={handleAddskills}>
                            Add Skill
                        </button>
                    </div>
                </div>


                {/* Learning Skills */}
                <div className="skill-section">
                    <div className="skill-section-header">
                        <span className="skill-section-label">
                            I WANT TO LEARN
                        </span>

                        <h3>Skills I want to learn</h3>

                        <p>
                            Skills you'd like to learn from others.
                        </p>
                    </div>

                    <div className="skills-list">
                        {learningskills.map((skill) => {
                            return (
                                <div className="skill-item" key={skill}>
                                    <span>{skill}</span>
                                    <button
                                        onClick={() =>
                                            handleRemoveLearningSkills(skill)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="skill-input">
                        <input
                            placeholder="Enter skill you want to learn"
                            value={newLearning}
                            onChange={(event) =>
                                setNewLearning(event.target.value)
                            }
                        />
                        <button onClick={handleNewSkilltolearn}>
                            Add Skill
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}