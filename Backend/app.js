require("dotenv").config();
const express=require('express');
const cors = require("cors");
const skillRouter=require('./routes/skillRoutes');
const userRouter=require('./routes/userRoutes');
const {connectToDatabase} = require("./config/db");

const app=express();
app.use(cors());

app.use(express.json());


app.use("/skills",skillRouter); 
app.use("/skillName", skillRouter);
app.use("/users",userRouter);
app.use("/profile", userRouter);


connectToDatabase();
const PORT=3000;
app.listen((PORT),()=>{
    console.log(`SkillSwap backend is running on port http://localhost:${PORT}`);
})