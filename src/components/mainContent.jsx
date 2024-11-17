import { useContext } from "react";
import { Context } from "../context/ContextProvider";

export default function MainContent() {
    const { 
        setInput, 
        input, 
        handleSampleClick, 
        messages, 
        isLoading,
        handleSendMessage 
    } = useContext(Context);

    return (
        <>
            <article className="main-content">
                <section className="main-content-section">
                    {/* Keep your existing header code */}
                    
                    <div id="response" className={`cus-scrollbar ${messages.length > 0 ? 'response' : ''}`}>
                        <article className="display-content">
                            {messages.length === 0 ? (
                                // Your existing empty state UI
                                <>
                                    <div className="hypermode-logo-container">
                                        {/* Your existing logo and initial content */}
                                    </div>
                                    <div className="sample-text">
                                        {/* Your existing sample text buttons */}
                                    </div>
                                </>
                            ) : (
                                <div className="chat-messages">
                                    {messages.map((message, index) => (
                                        <div 
                                            key={index} 
                                            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
                                        >
                                            <div className="message-content">
                                                {message.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="typing-indicator">
                                            AI is typing...
                                        </div>
                                    )}
                                </div>
                            )}
                        </article>
                    </div>

                    <section className="input-section">
                        <form id="mydata" className="mydata" onSubmit={handleSendMessage}>
                            <input 
                                autoFocus 
                                name="query" 
                                placeholder="Ask HypermodeGPT any questions" 
                                type="text" 
                                id="inputData"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button type="submit" disabled={isLoading}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" className="main-grid-item-icon" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <line x1="12" x2="12" y1="19" y2="5" />
                                    <polyline points="5 12 12 5 19 12" />
                                </svg>
                            </button>
                        </form>
                        <p className="copyright">
                            {/* Your existing copyright text */}
                        </p>
                    </section>
                </section>
            </article>
        </>
    );
}