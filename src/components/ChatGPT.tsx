import React, { useEffect, useRef, useState } from 'react'
import { MessageType } from '../types/enums'
import Loading from './Loading'

let API_KEY

const MAX_NUMBER_OF_SAVED_MESSAGES = 10

interface Message {
  text: string
  type: MessageType
}

chrome.storage.local.get(['GPT_API_KEY']).then((result) => {
  API_KEY = result.GPT_API_KEY
})

const API_URL = '	https://api.openai.com/v1/chat/completions'

export default function ChatGPT() {
  const [outputedMessages, setOutputedMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [fetchingApi, setFetchingApi] = useState(false)
  const textInputRef = useRef<HTMLInputElement>()
  const messagesEnd = useRef<HTMLInputElement>()

  const focusTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus()
    }
  }

  const scrollToBottom = () => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView()
    }
  }

  useEffect(() => {
    focusTextInput()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [outputedMessages])

  if (!API_KEY) {
    return (
      <>
        <div className="relative p-6 text-base">
          <p className="text-base">
            Set your API key and then reload the extension
          </p>
        </div>
      </>
    )
  }

  const prepareMessages = (text) => {
    const result = []

    outputedMessages.forEach((message) => {
      if (message.type === MessageType.Input) {
        result.push({ role: 'user', content: message.text })
      }
    })

    result.push({ role: 'user', content: text })

    return result
  }

  const generateText = async () => {
    if (!inputText || inputText === '') return

    try {
      setFetchingApi(true)

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: prepareMessages(inputText),
        }),
      })

      const data = await response.json()

      setFetchingApi(false)

      if (!data?.choices[0]?.message?.content) {
        alert(
          'Could not fetch answers for the conversation. Please check your API key and then reload the extension'
        )

        return
      }

      setOutputedMessages([
        ...outputedMessages,
        {
          text: inputText,
          type: MessageType.Input,
        },
        {
          text: data.choices[0].message.content,
          type: MessageType.Output,
        },
      ])

      setInputText('')
      textInputRef.current.focus()
    } catch (error) {
      console.log(error)

      alert(
        'An unknown error happened. Please check your API key and then reload the extension'
      )
    }
  }

  const handleInputKeyup = (event) => {
    if (event.key === 'Enter') {
      generateText()
    }
  }

  const clearHistory = () => {
    setOutputedMessages([])
  }

  return (
    <>
      <div className="relative p-6 text-base">
        <div className="relative mt-4 h-72">
          <Loading className="absolute z-10" show={fetchingApi} />

          <div className="absolute z-0 bottom-0 w-full flex flex-col gap-8 max-h-72 overflow-y-auto">
            {outputedMessages.map((message, index) => (
              <p
                key={index}
                className={
                  message.type === MessageType.Input
                    ? 'w-full whitespace-pre-line text-right'
                    : 'w-full whitespace-pre-line text-left'
                }
              >
                <span
                  className={
                    message.type === MessageType.Input
                      ? 'inline-block py-2 px-4 rounded-md bg-blue-300'
                      : 'inline-block py-2 px-4 rounded-md bg-slate-300'
                  }
                >
                  {message.text}
                </span>
              </p>
            ))}
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={messagesEnd}
            ></div>
          </div>
        </div>
        <input
          type="text"
          onKeyUp={handleInputKeyup}
          ref={textInputRef}
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-200 placeholder-gray-500 focus:outline-none mt-4"
          placeholder="Enter prompt..."
        />
        <div className="flex justify-center mt-4">
          <button
            className={`w-1/2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 focus:outline-none mr-2 ${
              fetchingApi && 'opacity-75 bg-gray-600 cursor-not-allowed'
            }`}
            onClick={generateText}
          >
            Send
          </button>
          <button
            onClick={clearHistory}
            className="w-1/2 px-4 py-2 rounded-md border border-gray-500 text-gray-500 hover:text-gray-700 hover:border-gray-700 focus:outline-none ml-2 disabled:opacity-75"
          >
            Clear history
          </button>
        </div>
      </div>
    </>
  )
}
