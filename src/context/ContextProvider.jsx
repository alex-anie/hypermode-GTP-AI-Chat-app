import { createContext, useState, useEffect } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]); 
    const [currentChatId, setCurrentChatId] = useState(null); 

    // Load chat history from localStorage on initial render
    useEffect(() => {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            setChatHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Save chat history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }, [chatHistory]);

    // Initialize Gemini AI
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Gemini API key is missing. Please check your .env file.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500,
        },
    });

    // Create new chat
    const createNewChat = () => {
        const newChatId = Date.now().toString();
        const newChat = {
            id: newChatId,
            title: "New Chat",
            messages: [],
            timestamp: new Date().toISOString()
        };
        
        setChatHistory(prev => [newChat, ...prev]);
        setCurrentChatId(newChatId);
        setMessages([]);
    };

    // Switch to existing chat
    const switchChat = (chatId) => {
        const chat = chatHistory.find(c => c.id === chatId);
        if (chat) {
            setCurrentChatId(chatId);
            setMessages(chat.messages);
        }
    };

    // Update chat title based on first message
    const updateChatTitle = (chatId, firstMessage) => {
        setChatHistory(prev => prev.map(chat => {
            if (chat.id === chatId) {
                // Truncate title if it's too long
                const title = firstMessage.length > 30 
                    ? firstMessage.substring(0, 30) + '...' 
                    : firstMessage;
                return { ...chat, title };
            }
            return chat;
        }));
    };

    // Handle sending messages
    const handleSendMessage = async (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        // Create new chat if none exists
        if (!currentChatId) {
            createNewChat();
        }

        const userMessage = { role: 'user', content: input, timestamp: new Date().toISOString() };
        
        // Update messages and chat history
        setMessages(prev => [...prev, userMessage]);
        setChatHistory(prev => prev.map(chat => {
            if (chat.id === currentChatId) {
                const updatedMessages = [...chat.messages, userMessage];
                // Update title if this is the first message
                if (chat.messages.length === 0) {
                    updateChatTitle(currentChatId, input);
                }
                return { ...chat, messages: updatedMessages };
            }
            return chat;
        }));

        setIsLoading(true);
        try {
            if (!apiKey) throw new Error("API key is missing");

            const result = await chat.sendMessageStream(input);
            let responseText = "";

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                responseText += chunkText;
                
                // Update messages in real-time
                const assistantMessage = { 
                    role: 'assistant', 
                    content: responseText,
                    timestamp: new Date().toISOString()
                };

                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage?.role === 'assistant') {
                        newMessages[newMessages.length - 1] = assistantMessage;
                    } else {
                        newMessages.push(assistantMessage);
                    }
                    return newMessages;
                });

                // Update chat history
                setChatHistory(prev => prev.map(chat => {
                    if (chat.id === currentChatId) {
                        const updatedMessages = [...chat.messages];
                        const lastMessage = updatedMessages[updatedMessages.length - 1];
                        if (lastMessage?.role === 'assistant') {
                            updatedMessages[updatedMessages.length - 1] = assistantMessage;
                        } else {
                            updatedMessages.push(assistantMessage);
                        }
                        return { ...chat, messages: updatedMessages };
                    }
                    return chat;
                }));
            }
        } catch (error) {
            console.error("Detailed error:", error);
            const errorMessage = {
                role: 'assistant',
                content: `Error: ${error.message || 'Something went wrong. Please try again.'}`,
                isError: true,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMessage]);
            setChatHistory(prev => prev.map(chat => {
                if (chat.id === currentChatId) {
                    return { ...chat, messages: [...chat.messages, errorMessage] };
                }
                return chat;
            }));
        } finally {
            setIsLoading(false);
            setInput("");
        }
    };

    const handleSampleClick = async (heading) => {
        setInput(heading);
        await handleSendMessage();
    };

    const contextValue = {
        input,
        setInput,
        handleSampleClick,
        messages,
        isLoading,
        handleSendMessage,
        chatHistory,
        currentChatId,
        createNewChat,
        switchChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;