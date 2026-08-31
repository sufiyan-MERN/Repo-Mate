import express from "express";
import indexRepo from "./lib/indexRepo.js";
import askQuestion from "./lib/askQuestion.js";
const app = express();
app.use(express.json());

app.post("/add-repo", async (req, res) => {
  const { githubURL, githubToken } = req.body;

  console.log("githubURl", githubURL);

  await indexRepo(githubURL, githubToken);
  res.json({
    msg: "repo indexes successfully",
  });
});

app.post("/ask-question", async (req, res) => {
  const { userQuery } = req.body;

  const { AI_summary, relaventFiles } = await askQuestion(userQuery);

  res.json({
    msg: "query asnwer generated successfully",
    AI_summary,
    relaventFiles,
  });
});

app.listen("8080", () => {
  console.log("sever is running at PORT 8080");
});
