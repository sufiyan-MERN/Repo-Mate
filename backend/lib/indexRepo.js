import generateDocSummary from "./generateDocSummary.js";
import loadGithubRepo from "./githubLoader.js";

export default async function indexRepo(githubURL, githubToken) {

  const docArray = await loadGithubRepo(githubURL, githubToken);
  console.log("github repo fetch", docArray.length, "files found");

  for (let doc of docArray) {
    let docSummary= await generateDocSummary(doc)

    let docEmbedding = await embedSummary(docSummary)
  }
}
