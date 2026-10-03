const express = require('express');
const { getDb } = require("../config/db");
const { ObjectId } = require("mongodb");

const skillRouter = express.Router();



skillRouter.get("/", async (req, res, next) => {
    const db = getDb();
    const skills=await db.collection("skills").find().toArray();

    res.json(skills);
});


skillRouter.get("/:skillName", async (req, res) => {
    const db=getDb();
    const skill=await db.collection("skills").findOne({
        courseName: {
            $regex: `^${req.params.skillName}$`,
            $options: "i"
        }
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

skillRouter.put("/:id", async (req, res) => {
    const db=getDb();
    const result=db.collection("skills").updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    )
    if (result.matchedCount === 0) {
        return res.status(404).json({
            message: "Skill not found"
        });
    }
    res.json({
        message:"Skill updated successfully"
    })
})

skillRouter.delete("/:id", async (req, res) => {
    const db=getDb();
    const result=db.collection("skills").deleteOne(
        {_id: new ObjectId(req.params.id)}
    )
    if (result.deletedCount === 0) {
        return res.status(404).json({
            message: "Skill not found"
        });
    }

    res.json({
        message: "Skill deleted successfully"
    });
})

module.exports = skillRouter;