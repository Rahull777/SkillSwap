const express = require('express');
const teacherRouter = express.Router();
const { getDb } = require("../config/db");

teacherRouter.post("/", async (req, res, next) => {
    const newTeacher = req.body;

    if (
        !newTeacher.name ||
        !newTeacher.email ||
        !Array.isArray(newTeacher.skills) ||
        newTeacher.skills.length === 0
    ) {
        return res.status(400).json({
            message: "Name, email and at least one skill are required"
        });
    }

    try {
        const db = getDb();

        const result = await db.collection("teachers").insertOne(newTeacher);

        res.status(201).json({
            message: "Teacher created successfully",
            teacherId: result.insertedId
        });

    } catch (error) {
        next(error);
    }
});

teacherRouter.get("/:skillName", async (req, res, next) => {
    try {
        const db = getDb();

        const teachers = await db.collection("users").find({
            teachingSkills: {
                $regex: `^${req.params.skillName}$`,
                $options: "i"
            }
        }).toArray();

        res.json(teachers);

    } catch (error) {
        next(error);
    }
});


module.exports = teacherRouter;