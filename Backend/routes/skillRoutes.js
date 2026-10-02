const express = require('express');
const { getDb } = require("../config/db");

const skillRouter = express.Router();



skillRouter.get("/", async (req, res, next) => {
    const db = getDb();
    const skills=await db.collection("skills").find().toArray();

    res.json(skills);
});


skillRouter.get("/:skillName", async (req, res) => {
    const db=getDb();
    const skill=await db.collection("skills").findOne({
        courseName: req.params.skillName
    })

    if (skill) {
        res.json(skill);
    } else {
        res.status(404).json({ message: "Skill not found" });
    }
});

skillRouter.post("/", async (req, res) => {
    const newSkill = req.body;
    const db = getDb();

    const result= await db.collection("skills").insertOne(newSkill);

    res.status(201).json({
        message: "Skill created successfully",
        skillId: result.insertedId
    });
});

module.exports = skillRouter;