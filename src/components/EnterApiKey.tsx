import React, { useState } from 'react'

export default function EnterApiKey() {
  const [apiKey, setApiKey] = useState('')
  const [keySaved, setKeySaved] = useState(false)

  const submitApiKey = () => {
    if (!apiKey || apiKey === '') {
      return
    }
    console.log(apiKey);
    
    chrome.storage.local.set({ GPT_API_KEY: apiKey }, function () {
      console.log('Key ' + apiKey + ' saved')

      setKeySaved(true)
    })

    chrome.storage.local.get(['GPT_API_KEY']).then((result) => {
      console.log(result)
    })
  }

  return (
    <>
      <div className="relative p-6 text-base">
        {keySaved && (
          <p className="text-base text-green-500 mb-6">
            Your API key has been saved!
          </p>
        )}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="api-key"
          >
            Enter your API key
          </label>
          <input
            id="api-key"
            name="api-key"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={apiKey}
            onChange={(event) => {
              setApiKey(event.target.value)
            }}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={submitApiKey}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}
