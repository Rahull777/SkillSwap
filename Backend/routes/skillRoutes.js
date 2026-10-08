const express = require('express');
const { getDb } = require("../config/db");
const { ObjectId } = require("mongodb");

const skillRouter = express.Router();

skillRouter.get("/", async (req, res, next) => {
    try {
        const db = getDb();

        const skills = await db
            .collection("skills")
            .find()
            .toArray();

        res.json(skills);

    } catch (error) {
        next(error);
    }
});


skillRouter.get("/:skillName", async (req, res, next) => {
    try {
        const db = getDb();

        const skill = await db.collection("skills").findOne({
            courseName: {
                $regex: `^${req.params.skillName}$`,
                $options: "i"
            }
        });

        if (skill) {
            res.json(skill);
        } else {
            res.status(404).json({
                message: "Skill not found"
            });
        }

    } catch (error) {
        next(error);
    }
});


skillRouter.post("/", async (req, res, next) => {
    try {
        const newSkill = req.body;
        const db = getDb();

        const result = await db
            .collection("skills")
            .insertOne(newSkill);

        res.status(201).json({
            message: "Skill created successfully",
            skillId: result.insertedId
        });

    } catch (error) {
        next(error);
    }
});


skillRouter.put("/:id", async (req, res, next) => {
    try {
        const db = getDb();

        const result = await db.collection("skills").updateOne(
            {
                _id: new ObjectId(req.params.id)
            },
            {
                $set: req.body
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        res.json({
            message: "Skill updated successfully"
        });

    } catch (error) {
        next(error);
    }
});


skillRouter.delete("/:id", async (req, res, next) => {
    try {
        const db = getDb();

        const result = await db.collection("skills").deleteOne(
            {
                _id: new ObjectId(req.params.id)
            }
        );

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        res.json({
            message: "Skill deleted successfully"
        });

    } catch (error) {
        next(error);
    }
});


module.exports = skillRouter;