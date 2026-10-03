const express = require("express");
const {getDb} = require("../config/db");
const { ObjectId } = require("mongodb");

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
    const newUser = req.body;

    if (
        !newUser.name ||
        !newUser.email ||
        !Array.isArray(newUser.teachingSkills) ||
        !Array.isArray(newUser.learningSkills)
    ) {
        return res.status(400).json({
            message: "Name, email, teachingSkills and learningSkills are required"
        });
    }

    try {
        const db = getDb();

        const result = await db.collection("users").insertOne(newUser);

        res.status(201).json({
            message: "User created successfully",
            userId: result.insertedId
        });
    } catch (error) {
        next(error);
    }
});

userRouter.get("/:id", async (req, res, next) => {
    try {
        const db = getDb();

        const user = await db.collection("users").findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.put("/:id", async (req, res, next) => {
    try {
        const db = getDb();

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    teachingSkills: req.body.teachingSkills,
                    learningSkills: req.body.learningSkills
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User profile updated successfully"
        });

    } catch (error) {
        next(error);
    }
});


module.exports = userRouter;