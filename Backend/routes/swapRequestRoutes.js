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

        if (requesterId === receiverId) {
            return res.status(400).json({
                message: "You cannot send a swap request to yourself"
            });
        }

        //handling duplicate request case
        const existingRequest = await db.collection("swapRequests").findOne({
            requesterId: new ObjectId(requesterId),
            receiverId: new ObjectId(receiverId),
            skill: skill,
            status: { $in: ["pending", "accepted"] }
        });

        if (existingRequest) {
            if (existingRequest.status === "pending") {
                return res.status(400).json({
                    message: "You already have a pending request for this skill"
                });
            }

            return res.status(400).json({
                message: "You already have an active swap for this skill"
            });
        }
        const newRequest = {
            requesterId: new ObjectId(requesterId),
            receiverId: new ObjectId(receiverId),
            skill: skill,
            status: "pending",
            meetingLink: null,
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

        const userId = new ObjectId(req.user.userId);

        const requests = await db.collection("swapRequests")
            .find({
                receiverId: userId
            })
            .toArray();

        const requestsWithUsers = await Promise.all(
            requests.map(async (request) => {

                const requester = await db.collection("users").findOne(
                    { _id: request.requesterId },
                    {
                        projection: {
                            name: 1,
                            email: 1,
                            teachingSkills: 1,
                            learningSkills: 1
                        }
                    }
                );

                return {
                    ...request,
                    requester
                };
            })
        );

        res.json(requestsWithUsers);

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


swapRequestRouter.put("/:id/meeting", authMiddleware, async (req, res, next) => {
    try {
        const db = getDb();

        const { meetingLink } = req.body;

        if (!meetingLink) {
            return res.status(400).json({
                message: "Meeting link is required"
            });
        }

        const result = await db.collection("swapRequests").updateOne(
            {
                _id: new ObjectId(req.params.id),
                requesterId: new ObjectId(req.user.userId),
                status: "accepted"
            },
            {
                $set: {
                    meetingLink: meetingLink
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Accepted swap not found or you are not the requester"
            });
        }

        res.json({
            message: "Meeting link added successfully"
        });

    } catch (error) {
        next(error);
    }
});



swapRequestRouter.get("/my-swaps", authMiddleware, async (req, res, next) => {
    try {
        const db = getDb();

        const userId = new ObjectId(req.user.userId);

        const swaps = await db.collection("swapRequests")
            .find({
                $or: [
                    { requesterId: userId },
                    { receiverId: userId }
                ],
                status: "accepted"
            })
            .toArray();

        const swapsWithUsers = await Promise.all(
            swaps.map(async (swap) => {

                const otherUserId =
                    swap.requesterId.toString() === userId.toString()
                        ? swap.receiverId
                        : swap.requesterId;

                const otherUser = await db.collection("users").findOne(
                    { _id: otherUserId },
                    {
                        projection: {
                            name: 1,
                            email: 1,
                            teachingSkills: 1,
                            learningSkills: 1
                        }
                    }
                );

                return {
                    ...swap,
                    otherUser
                };
            })
        );

        res.json(swapsWithUsers);

    } catch (error) {
        next(error);
    }
});
module.exports = swapRequestRouter;