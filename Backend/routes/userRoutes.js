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

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof email !== "string" ||
        !email.trim() ||
        typeof password !== "string" ||
        password.length === 0
    ) {
        return res.status(400).json({
            message: "Valid name, email and password are required"
        });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    // Basic email format validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({
            message: "Please provide a valid email address"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const db = getDb();

        const existingUser = await db.collection("users").findOne({ email: trimmedEmail });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const result = await db.collection("users").insertOne({
            name: trimmedName,
            email: trimmedEmail,
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

    if (
        typeof email !== "string" ||
        !email.trim() ||
        typeof password !== "string" ||
        password.length === 0
    ) {
        return res.status(400).json({
            message: "Valid email and password are required"
        });
    }

    const trimmedEmail = email.trim();

    try {
        const db = getDb();

        const user = await db.collection("users").findOne({
            email: trimmedEmail
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
        const updateFields = {};

        if (req.body.name !== undefined) {
            if (typeof req.body.name !== "string" || !req.body.name.trim()) {
                return res.status(400).json({ message: "Name cannot be empty" });
            }
            updateFields.name = req.body.name.trim();
        }

        if (req.body.teachingSkills !== undefined) {
            if (!Array.isArray(req.body.teachingSkills)) {
                return res.status(400).json({ message: "teachingSkills must be an array" });
            }
            updateFields.teachingSkills = req.body.teachingSkills;
        }

        if (req.body.learningSkills !== undefined) {
            if (!Array.isArray(req.body.learningSkills)) {
                return res.status(400).json({ message: "learningSkills must be an array" });
            }
            updateFields.learningSkills = req.body.learningSkills;
        }

        const result = await db.collection("users").updateOne(
            {
                _id: new ObjectId(req.user.userId)
            },
            {
                $set: updateFields
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

// CHANGE PASSWORD
userRouter.put("/change-password", authMiddleware, async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            message: "Current password and new password are required"
        });
    }

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

        const passwordMatches = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.collection("users").updateOne(
            {
                _id: new ObjectId(req.user.userId)
            },
            {
                $set: {
                    password: hashedPassword
                }
            }
        );

        res.json({
            message: "Password changed successfully"
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

// CREATE USER
// CREATE USER (Generic)
userRouter.post("/", async (req, res, next) => {
    const newUser = req.body;

    if (
        typeof newUser.name !== "string" ||
        !newUser.name.trim() ||
        typeof newUser.email !== "string" ||
        !newUser.email.trim() ||
        !Array.isArray(newUser.teachingSkills) ||
        !Array.isArray(newUser.learningSkills)
    ) {
        return res.status(400).json({
            message: "Valid name, email, teachingSkills and learningSkills are required"
        });
    }

    newUser.name = newUser.name.trim();
    newUser.email = newUser.email.trim();

    // Optional email format check here too
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
        return res.status(400).json({
            message: "Please provide a valid email address"
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