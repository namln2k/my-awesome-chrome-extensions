import React, { useState } from 'react'
import Loading from './Loading'

let API_KEY

chrome.storage.local.get(['GPT_API_KEY']).then((result) => {
  API_KEY = result.GPT_API_KEY
})

const API_URL = '	https://api.openai.com/v1/chat/completions'

export default function ChatGPT() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [fetchingApi, setFetchingApi] = useState(false)

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
          messages: [{ role: 'user', content: inputText }],
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

      setOutputText(data.choices[0].message.content)
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

  return (
    <>
      <div className="relative p-6 text-base">
        <div className="relative mt-4 h-48 overflow-y-auto">
          <Loading show={fetchingApi} />
          <p className="whitespace-pre-line">{outputText}</p>
        </div>
        <input
          type="text"
          onKeyUp={handleInputKeyup}
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
            id="stopBtn"
            disabled
            className="w-1/2 px-4 py-2 rounded-md border border-gray-500 text-gray-500 hover:text-gray-700 hover:border-gray-700 focus:outline-none ml-2 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            Stop generating
          </button>
        </div>
      </div>
    </>
  )
}
