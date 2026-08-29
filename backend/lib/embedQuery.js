import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config()

const ai= new GoogleGenAI({
    apiKey:process.env.GEMENI_API_KET_QUERY
})

export default async function embedQuery(userQuery) {
    console.log("generating embedding for query...");
    const response= await ai.models.embedContent({
        model:"gemini-embedding-2",
        contents: [userQuery]
    })
    return response.embeddings[0].values
}