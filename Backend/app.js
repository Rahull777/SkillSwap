const express=require('express');
const skillRouter=require('./routes/skillRoutes');
const userRouter=require('./routes/userRoutes');
const app=express();

app.use(express.json());

app.use((req, res, next) => {
    req.user="Rahul";
    next();
});

app.use("/skills",skillRouter); 
app.use("/skillName", skillRouter);
app.use("/users",userRouter);
app.use("/profile", userRouter);

app.get("/about", (req, res) => {
    res.send(`This is the SkillSwap backend, ${req.user}`);
});

app.get("/search",(req,res,next)=>{
    res.send(`you searched for:${req.query.skill}`)
})

app.post("/skills", (req, res) => {
    console.log("BODY:", req.body);
    console.log("PARAMS:", req.params);
    console.log("QUERY:", req.query);
    console.log("METHOD:", req.method);
    console.log("URL:", req.url);

    res.json({
        message: "Skill received"
    });
});

const PORT=3000;
app.listen((PORT),()=>{
    console.log(`SkillSwap backend is running on port http://localhost:${PORT}`);
})