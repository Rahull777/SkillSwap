const express = require("express");
const { getDb } = require("../config/db");
const { ObjectId } = require("mongodb");
const authMiddleware = require("../middleware/authMiddleware");

const swapRequestRouter = express.Router();

swapRequestRouter.post("/", authMiddleware, async (req, res, next) => {
    try {
        const db = getDb();

        const requesterId = req.user.userId;
        const { receiverId, skill } = req.body;

        if (!receiverId || !skill) {
            return res.status(400).json({
                message: "receiverId and skill are required"
            });
        }

        const newRequest = {
            requesterId: new ObjectId(requesterId),
            receiverId: new ObjectId(receiverId),
            skill: skill,
            status: "pending",
            createdAt: new Date()
        };

        const result = await db
            .collection("swapRequests")
            .insertOne(newRequest);

        res.status(201).json({
            message: "Swap request sent successfully",
            requestId: result.insertedId
        });

    } catch (error) {
        next(error);
    }
});



swapRequestRouter.get("/received", authMiddleware, async (req, res, next) => {
    try {
        const db = getDb();

        const requests = await db.collection("swapRequests")
            .find({
                receiverId: new ObjectId(req.user.userId)
            })
            .toArray();

        res.json(requests);

    } catch (error) {
        next(error);
    }
});



swapRequestRouter.patch("/:id", authMiddleware, async (req, res, next) => {
    try {
        const db = getDb();

        const { status } = req.body;

        if (status !== "accepted" && status !== "rejected") {
            return res.status(400).json({
                message: "Status must be accepted or rejected"
            });
        }

        const result = await db.collection("swapRequests").updateOne(
            {
                _id: new ObjectId(req.params.id),
                receiverId: new ObjectId(req.user.userId)
            },
            {
                $set: {
                    status: status
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Swap request not found"
            });
        }

        res.json({
            message: `Swap request ${status} successfully`
        });

    } catch (error) {
        next(error);
    }
});



module.exports = swapRequestRouter;