import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import process from 'node:process'

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
    const model = genAI.getGenerativeModel({model: 'gemini-pro'});

    const prompt = "what is a vector database";
    
    const result = await model.generateContent(prompt);

    console.log(result.response.text());
    
}
run();