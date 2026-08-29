import fs from "fs/promises"

export default async function loadCodebaseEmbeddings() {
    console.log("fetching codebase embeddigns...");
    const data= await fs.readFile("embeddings.json","utf8")
    // console.log(data);
    return JSON.parse(data)
    // return data
}

// loadCodebaseEmbeddings()