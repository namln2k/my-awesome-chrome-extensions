import React, { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react'

export default function ChatGPT() {
  const [messages, setMessages] = useState([
    {
      message: 'Hello',
      sender: 'Leo',
      direction: 1,
      position: 0,
    },
  ])

  return (
    <>
      <div className="relative h-96 w-96">
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {/* {messages.map((message, index) => (
                <Message key={index} model={message}></Message>
              ))} */}
            </MessageList>
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  )
}
