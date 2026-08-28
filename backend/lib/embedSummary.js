import {GoogleGenAI} from "@google/genai"
import dotenv from "dotenv"

dotenv.config()

const ai = new GoogleGenAI({
    apiKey: process.env.GEMENI_API_KET_2

})

export default async function embedSummary(docSummary) {
    console.log("generating embeddign");

    const docEmbedding= await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: docSummary
    })
    return docEmbedding.embeddings[0].values
    // console.log("embeddigns of the summary",docEmbedding);
}

