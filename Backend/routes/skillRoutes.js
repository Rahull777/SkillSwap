const express=require('express');

const skillRouter=express.Router();

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

skillRouter.get("/",(req,res,next)=>{
    res.json(skills);

})
skillRouter.get("/:skillName", (req, res) => {
    res.send(`You are viewing ${req.params.skillName}`);
});

module.exports=skillRouter;