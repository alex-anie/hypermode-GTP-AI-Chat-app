import * as readline from 'node:readline';
import dotenv from 'dotenv';
// import * as fs from "fs"
import { GoogleGenerativeAI } from '@google/generative-ai';
import process from 'node:process'
// import { Buffer } from 'node:buffer';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function run(){
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500,
        }
    });

    async function askAndRespond(){
        rl.question("You: ", async(msg)=> {
            if(msg.toLocaleLowerCase() === "exit"){
                rl.close();
            }else {
                const result = await chat.sendMessage(msg);
                console.log("AI: ", result.response.text());
                askAndRespond()
            }
        })
    }
    askAndRespond()
}
run()
