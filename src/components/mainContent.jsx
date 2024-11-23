import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import Markdown from 'react-markdown'

export default function MainContent() {
  function templeteMsg(text){
    setInput(text)
  }

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
          {/* <!-- Main Content --> */}
      <article className="main-content">
        <section className="main-content-section">
          {/* <!-- Heading section --> */}
          <header>
            <nav className="">
              {/* <!-- Hamburger Icon  --> */}
              <div className="hamburger-icon">
                  <div>
                     {/* <!-- SVG --> */}
                     {/* <!-- https://feathericons.dev/?search=align-left&iconset=feather --> */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="main-grid-item-icon" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                          <line x1="17" x2="3" y1="10" y2="10" />
                          <line x1="21" x2="3" y1="6" y2="6" />
                          <line x1="21" x2="3" y1="14" y2="14" />
                          <line x1="17" x2="3" y1="18" y2="18" />
                        </svg>
                  </div>
              </div>
                  
              {/* <!-- Heading Text  --> */}
              <div className="heading-text">
                <h1>HypermodeGPT</h1>
                <span>3.5</span>
                <span>
                {/* <!-- https://feathericons.dev/?search=chevron-down&iconset=feather --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
              </div>

              {/* <!--  GitHub Link  --> */}
              <div className="github-link">
                <a href="https://github.com/alex-anie/hypermode-GTP-AI-Chat-app.git" target="_blank">
                  {/* <!-- SVG  --> */}
                  {/* <!-- https://feathericons.dev/?search=github&iconset=feather --> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
              </div>

            </nav>
        </header>
    
           {/* <!-- Content --> */}
           <div id="response" className={`cus-scrollbar ${messages.length > 0 ? 'response' : ''}`}>
            <article className="display-content">
              {
                messages.length === 0 ? (
                  <>
                    <div className="hypermode-logo-container">
                  <div className="hypermode-logo-wrapper">
                      <div className="">
                        {/* <!-- SVG or Image --> */}
                        <img src="https://framerusercontent.com/images/iZ4EXrlvpPlxiLFsOrcqwzPbOc.svg" alt="hypermode logo" />
                      </div>
                  </div>
                  <h1 className="">How can I help you today?</h1>
              </div>

              <div className="sample-text" >
                  <div className="sample-text-container" onClick={()=> templeteMsg('What is Dgraph')}>
                      <h1 className="">What is Dgraph</h1>
                        <p className="">Learn about what make Dgraph awesome</p>
                        <div  className="arrow-up-container">
                          {/* <!-- https://feathericons.dev/?search=arrow-up&iconset=feather --> */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                              <line x1="12" x2="12" y1="19" y2="5" />
                              <polyline points="5 12 12 5 19 12" />
                            </svg>
                        </div>
                  </div>

                  <div className="sample-text-container" onClick={()=> templeteMsg('What is closure in JavaScript')}>
                    <h1 className="">What is closure in JavaScript</h1>
                    <p className="">Discover how to write better closure in JavaScript</p>
                    <div  className="arrow-up-container">
                        {/* <!-- https://feathericons.dev/?search=arrow-up&iconset=feather --> */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                          <line x1="12" x2="12" y1="19" y2="5" />
                          <polyline points="5 12 12 5 19 12" />
                        </svg>
                    </div>
                  </div>

                  <div className="sample-text-container off"  onClick={()=> templeteMsg('Create a New Year Resolution Plan')}>
                    <h1 className="">Create a New Year Resolution Plan</h1>
                    <p className="">Discover how to better new year resolution plan</p>
                    <div  className="arrow-up-container">
                         {/* <!-- https://feathericons.dev/?search=arrow-up&iconset=feather --> */}
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                          <line x1="12" x2="12" y1="19" y2="5" />
                          <polyline points="5 12 12 5 19 12" />
                        </svg>
                    </div>
                  </div>

                  <div className="sample-text-container off" onClick={()=> templeteMsg('Who was Euclid?')}>
                    <h1 className="">Who was Euclid?</h1>
                    <p className="">Considered the father of geometry</p>
                    <div  className="arrow-up-container">
                         {/* <!-- https://feathericons.dev/?search=arrow-up&iconset=feather --> */}
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" className="main-grid-item-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                          <line x1="12" x2="12" y1="19" y2="5" />
                          <polyline points="5 12 12 5 19 12" />
                        </svg>
                    </div>
                  </div>
              </div>
                  </>
                ) 
                : 
                (
                  <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
                        >
                            <div className="message-content">
                              <Markdown>
                                {message.content}
                              </Markdown>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="typing-indicator">
                            AI is typing...
                        </div>
                    )}
              </div>
                )
              }
              
          </article>
           </div>
    
              {/* <!-- Input section --> */}
              <section className="input-section">
                  <form id="mydata" className="mydata" onSubmit={handleSendMessage}>
                      <input 
                      autoFocus 
                      name="query" 
                      placeholder="Ask hypermodeGPT any questions" 
                      type="text" 
                      id="inputData"  
                      value={input}
                      onChange={(e) => setInput(e.target.value)}/>
                      <button type="submit" disabled={isLoading}>
                         {/* <!-- https://feathericons.dev/?search=arrow-up&iconset=feather --> */}
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" className="main-grid-item-icon" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                          <line x1="12" x2="12" y1="19" y2="5" />
                          <polyline points="5 12 12 5 19 12" />
                        </svg>
                      </button>
                  </form>
                  <p className="copyright">Copyright © 2024 - HypermodeGPT AI Model with gemini at pro created by <a href="https://twitter.com/alexanie_" target="_blank"  className="">Alex Anie</a></p>
               </section>
        </section>
      </article>
      </>
  )
}
