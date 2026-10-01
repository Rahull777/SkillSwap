const express = require('express');

const skillRouter = express.Router();

const skills = [
    {
        id: 1,
        courseName: "React",
        category: "Web Development",
        peopleCount: 12
    },
    {
        id: 2,
        courseName: "Python",
        category: "Programming",
        peopleCount: 20
    },
    {
        id: 3,
        courseName: "UI/UX Design",
        category: "Design",
        peopleCount: 15
    },
    {
        id: 4,
        courseName: "JavaScript",
        category: "Web Development",
        peopleCount: 10
    }
];

skillRouter.get("/", (req, res, next) => {
    res.json(skills);

})
skillRouter.get("/:skillName", (req, res) => {
    const skill = skills.find((skill) => {
        return skill.courseName.toLowerCase() === req.params.skillName.toLowerCase();
    })
    if (skill) {
        res.json(skill);
    } else {
        res.status(404).json({ message: "Skill not found" });
    }
});

module.exports = skillRouter;