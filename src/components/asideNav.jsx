import { useContext } from "react";
import { Context } from "../context/ContextProvider";

export default function AsideNav() {
  const { 
    chatHistory, 
    currentChatId, 
    createNewChat, 
    switchChat 
  } = useContext(Context);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
        {/* <!-- Sidebar --> */}
      <aside className="sidebar">
        <section className="sidebar-container">
          <header >
            <div onClick={createNewChat} style={{ cursor: 'pointer' }}>
            <nav>
              <div className="new-chat-logo">
                <div>
                  <img src="https://framerusercontent.com/images/iZ4EXrlvpPlxiLFsOrcqwzPbOc.svg" alt="hypermode logo" />
                </div>
                <p>New Chat</p>
              </div>

              <div className="new-chat-icon">
                  <div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-md"><path fillRule="evenodd" clipRule="evenodd" d="M16.7929 2.79289C18.0118 1.57394 19.9882 1.57394 21.2071 2.79289C22.4261 4.01184 22.4261 5.98815 21.2071 7.20711L12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16H9C8.44772 16 8 15.5523 8 15V12C8 11.7348 8.10536 11.4804 8.29289 11.2929L16.7929 2.79289ZM19.7929 4.20711C19.355 3.7692 18.645 3.7692 18.2071 4.2071L10 12.4142V14H11.5858L19.7929 5.79289C20.2308 5.35499 20.2308 4.64501 19.7929 4.20711ZM6 5C5.44772 5 5 5.44771 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34314 4.34315 3 6 3H10C10.5523 3 11 3.44771 11 4C11 4.55228 10.5523 5 10 5H6Z" fill="currentColor"></path></svg>
                  </div>
              </div>
            </nav>

           </div>

            {/* <!-- History --> */}
            <div className="history cus-scrollbar">
              <ul>
              {chatHistory?.map((chat) => (
                  <li 
                    key={chat.id}
                    onClick={() => switchChat(chat.id)}
                    className={`chat-history-item ${currentChatId === chat.id ? 'active' : ''}`}
                  >
                    <div className="chat-history-content">
                      <span className="chat-title">{chat.title}</span>
                      <span className="chat-date">{formatDate(chat.timestamp)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* <!-- Upgrade plan and User profile  --> */}
            <div className="bottom-info">
                <div className="Upgrade-plan">
                    <a href='https://ai.google.dev/' target="_black" className="">
                        <div className="">
                            {/* <!-- SVG --> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 24 24" className="icon-sm shrink-0"><path fill="currentColor" d="M6.394 4.444c.188-.592 1.024-.592 1.212 0C8.4 8.9 9.1 9.6 13.556 10.394c.592.188.592 1.024 0 1.212C9.1 12.4 8.4 13.1 7.606 17.556c-.188.592-1.024.592-1.212 0C5.6 13.1 4.9 12.4.444 11.606c-.592-.188-.592-1.024 0-1.212C4.9 9.6 5.6 8.9 6.394 4.444m8.716 9.841a.41.41 0 0 1 .78 0c.51 2.865.96 3.315 3.825 3.826.38.12.38.658 0 .778-2.865.511-3.315.961-3.826 3.826a.408.408 0 0 1-.778 0c-.511-2.865-.961-3.315-3.826-3.826a.408.408 0 0 1 0-.778c2.865-.511 3.315-.961 3.826-3.826Zm2.457-12.968a.454.454 0 0 1 .866 0C19 4.5 19.5 5 22.683 5.567a.454.454 0 0 1 0 .866C19.5 7 19 7.5 18.433 10.683a.454.454 0 0 1-.866 0C17 7.5 16.5 7 13.317 6.433a.454.454 0 0 1 0-.866C16.5 5 17 4.5 17.567 1.317"></path></svg>
                        </div>
                        <div className="">
                            <p className="">Upgrade plan</p>
                            <p className="">Google's AI, @ AI Studio</p>
                        </div>
                      </a>
                </div>

                <div className="user-profile">
                    <a href="https://ocxigin.hashnode.dev/" target="_blank" className="flex gap-3">
                        <div className="">
                            <img src="https://user-images.githubusercontent.com/78242022/242978218-d0e4eba2-62f7-4464-b2fb-c89835b6e592.jpg" alt="" className=""/>
                        </div>
                        <p>Alex Anie</p>
                    </a>
                </div>
            </div>
          </header>
        </section>
      </aside>
    </>
  )
}
