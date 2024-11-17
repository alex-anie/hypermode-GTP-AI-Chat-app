import dotenv from 'dotenv';
import * as fs from "fs"
import { GoogleGenerativeAI } from '@google/generative-ai';
import process from 'node:process'
import { Buffer } from 'node:buffer';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType){
    return{
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType,
        },
    }
}

async function run(){
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})
    const prompt = "what is the difference between the two images";
    const imageParts = [fileToGenerativePart("./src/assets/triangle.png", "image/png"), fileToGenerativePart("./src/assets/ballpoints.jpeg", "image/png")]
    const result = await model.generateContent([prompt, ...imageParts]);

    console.log(result.response.text());
}
run()