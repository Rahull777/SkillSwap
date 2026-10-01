import { useState } from 'react';
export function Profile() {
    const [teachingskills, setTeachingSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");

    const [learningskills, setLearningSkills] = useState([]);
    const [newLearning,setNewLearning]=useState("");

    async function handleAddskills() {
    const response = await fetch("http://localhost:3000/skills", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            courseName: newSkill,
            category: "General",
            peopleCount: 1
        })
    });

    const data = await response.json();

    console.log("Backend response:", data);

    setTeachingSkills([...teachingskills, newSkill]);
    setNewSkill("");
}

    function handleRemoveSkills(skilltoremove){
        const updatedskills=teachingskills.filter((skill)=>{
            return skill!==skilltoremove;
        })
        setTeachingSkills(updatedskills);
    }

    function handleNewSkilltolearn(){
        setLearningSkills([...learningskills,newLearning]);
        setNewLearning("");
    }

    function handleRemoveLearningSkills(skilltoremove){
        const updatedSkills=learningskills.filter((skill)=>{
            return skill!==skilltoremove
        })
        setLearningSkills(updatedSkills);
    }
    return (
        <div>
            <h1>My Profile</h1>

            <h2>Rahul</h2>

            <p>Skills I can teach:</p>
            <div>
                {teachingskills.map((skill) => {
                    return(
                        <div key={skill}>
                            <p>{skill}</p>
                            <button onClick={()=>handleRemoveSkills(skill)}>Remove</button>
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
                    return(
                        <div key={skill}>
                            <p>{skill}</p>
                            <button onClick={()=> handleRemoveLearningSkills(skill) }>Remove</button>
                        </div>
                        
                    )
                })}
            </div>
            <input placeholder="Enter skill you want to learn" 
                value={newLearning}
                onChange={(event)=> setNewLearning(event.target.value)}
            />
            <button onClick={handleNewSkilltolearn}>Add Skill</button>
        </div>
    );
}