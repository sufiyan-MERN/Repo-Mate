import cosineSimilarity from "./cosineSimirality.js";
import embedQuery from "./embedQuery.js";
import loadCodebaseEmbeddings from "./loadCodebaseEmbeddigns.js";

export default async function queryCodebase(userQuery) {
 const queryEmbeddign= await embedQuery(userQuery)   

 const codebaseEmbeddign = await  loadCodebaseEmbeddings()

 const resultArr = codebaseEmbeddign.map((fileObj)=>{
    let similarityScore= cosineSimilarity(queryEmbeddign,fileObj.embeddings)
    return {
      similarityScore: similarityScore,
      fileName: fileObj.fileName,
      sourceCode: fileObj.sourceCode,
      fileSummary: fileObj.summary, 
    };
 })
return resultArr
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .filter((result) => result.similarityScore > 0.6);
}