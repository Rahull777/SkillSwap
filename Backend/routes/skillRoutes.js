const express=require('express');

const skillRouter=express.Router();

skillRouter.get("/",(req,res,next)=>{
    res.send("You are viewing all skills");

})
skillRouter.get("/:skillName", (req, res) => {
    res.send(`You are viewing ${req.params.skillName}`);
});

module.exports=skillRouter;