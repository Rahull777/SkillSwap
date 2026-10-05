const express = require("express");
const { getDb } = require("../config/db");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const userRouter = express.Router();



// REGISTER


userRouter.post("/register", async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const db = getDb();

        const existingUser = await db.collection("users").findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const result = await db.collection("users").insertOne({
            name,
            email,
            password: hashedPassword,
            teachingSkills: [],
            learningSkills: []
        });

        return res.status(201).json({
            message: "User registered successfully",
            userId: result.insertedId
        });



    } catch (error) {
        next(error);
    }
});



// LOGIN


userRouter.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try {
        const db = getDb();

        const user = await db.collection("users").findOne({
            email: email
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email
            },
            "skillswap-secret-key",
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        next(error);
    }
});



// GET MY PROFILE


userRouter.get("/me", authMiddleware, async (req, res, next) => {
    try {
        const db = getDb();

        const user = await db.collection("users").findOne({
            _id: new ObjectId(req.user.userId)
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



// UPDATE MY PROFILE


userRouter.put("/me", authMiddleware, async (req, res, next) => {
    try {
        const db = getDb();

        const result = await db.collection("users").updateOne(
            {
                _id: new ObjectId(req.user.userId)
            },
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


// GET USER BY ID


userRouter.get("/:id", authMiddleware, async (req, res, next) => {
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


// =========================
// CREATE USER
// =========================

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


module.exports = userRouter;