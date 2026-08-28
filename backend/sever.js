import express from "express";
import indexRepo from "./lib/indexRepo.js";
const app= express()
app.use(express.json())

app.post("/add-repo", async(req,res)=>{
    const {githubURL,githubToken}=req.body

    console.log("githubURl",githubURL);

    await indexRepo(githubURL,githubToken)
    res.json({
        msg:"repo indexes successfully"
    })
})

app.post("/ask-question",(req,res)=>{
    const {userQuery}=req.body

    res.json({
        msg:"query asnwer generated successfully"
    })
})

app.listen("8080",()=>{
console.log("sever is running at PORT 8080");
})