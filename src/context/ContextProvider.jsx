import { createContext, useState } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]); // Array to store chat messages
    const [isLoading, setIsLoading] = useState(false);
    
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500,
        },
    });

    // Handle sending messages
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message to chat
        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        
        setIsLoading(true);
        try {
            // Send message to Gemini
            const result = await chat.sendMessageStream(input);
            let responseText = "";

            // Process the stream
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                responseText += chunkText;
                // Update the messages in real-time as chunks arrive
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage?.role === 'assistant') {
                        lastMessage.content = responseText;
                        return [...newMessages];
                    } else {
                        return [...newMessages, { role: 'assistant', content: responseText }];
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
            setInput(""); // Clear input after sending
        }
    };

    // Handle sample clicks
    const handleSampleClick = (heading) => {
        setInput(heading);
    };

    const contextValue = {
        input,
        setInput,
        handleSampleClick,
        messages,
        isLoading,
        handleSendMessage
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;