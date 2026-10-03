require("dotenv").config();
const express=require('express');
const cors = require("cors");
const skillRouter=require('./routes/skillRoutes');
const userRouter=require('./routes/userRoutes');
const teacherRouter=require('./routes/teacherRoutes');
const {connectToDatabase} = require("./config/db");

const app=express();
app.use(cors());

app.use(express.json());


app.use("/skills",skillRouter); 
app.use("/skillName", skillRouter);
app.use("/users",userRouter);
app.use("/teachers", teacherRouter);

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Something went wrong on the server"
    });
});


connectToDatabase();
const PORT=3000;
app.listen((PORT),()=>{
    console.log(`SkillSwap backend is running on port http://localhost:${PORT}`);
})