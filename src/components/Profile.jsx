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
            const response = await fetch("http://localhost:3000/users/me", {
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

        const response = await fetch("http://localhost:3000/users/me", {
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

        const response = await fetch("http://localhost:3000/users/me", {
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

        const response = await fetch("http://localhost:3000/users/me", {
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

        const response = await fetch("http://localhost:3000/users/me", {
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
        <div>
            <h1>My Profile</h1>

            <h2>{user?.name}</h2>

            <p>Skills I can teach:</p>
            <div>
                {teachingskills.map((skill) => {
                    return (
                        <div key={skill}>
                            <p>{skill}</p>
                            <button onClick={() => handleRemoveSkills(skill)}>Remove</button>
                        </div>
                    )
                })}
            </div>
            <input
                placeholder="Enter a skill you can teach"
                value={newSkill}
                onChange={(event) => setNewSkill(event.target.value)}
            />
            <button onClick={handleAddskills}>Add Skill</button>

            <p>Skills I want to learn:</p>
            <div>
                {learningskills.map((skill) => {
                    return (
                        <div key={skill}>
                            <p>{skill}</p>
                            <button onClick={() => handleRemoveLearningSkills(skill)}>Remove</button>
                        </div>

                    )
                })}
            </div>
            <input placeholder="Enter skill you want to learn"
                value={newLearning}
                onChange={(event) => setNewLearning(event.target.value)}
            />
            <button onClick={handleNewSkilltolearn}>Add Skill</button>
        </div>
    );
}