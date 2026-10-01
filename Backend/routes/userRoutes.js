const express = require("express");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("All users");
});

userRouter.get("/profile", (req, res) => {
    res.send("User profile");
});

module.exports = userRouter;