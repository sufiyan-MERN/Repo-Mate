import embedSummary from "./embedSummary.js";
import generateDocSummary from "./generateDocSummary.js";
import loadGithubRepo from "./githubLoader.js";
import fs from "fs/promises"


export default async function indexRepo(githubURL, githubToken) {
  console.log("loading  github repo", githubURL);


  const docArray = await loadGithubRepo(githubURL, githubToken);
  console.log("github repo fetch", docArray.length, "files found");

  let result= []

  for (let doc of docArray) {

    let docSummary= await generateDocSummary(doc)

    let docEmbedding = await embedSummary(docSummary)

    let docObj = {
        summary: docSummary,
        embeddings: docEmbedding,
        sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
        fileName: doc.metadata.source
    }
    result.push(docObj)
  }
  await fs.writeFile("embeddings.json",JSON.stringify(result,null,2))
  console.log("embeddings generated and saved to embeddigns.json");
}
