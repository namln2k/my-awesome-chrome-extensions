import React, { useState } from 'react'
import ChatGPT from './ChatGPT'
import PMSBackground from './PMSBackground'
import EnterApiKey from './EnterApiKey'

const tabs = [
  { id: 'chat-gpt', title: 'Chat GPT', component: <ChatGPT /> },
  { id: 'api-key', title: 'API Key', component: <EnterApiKey /> },
  { id: 'pms-bg', title: 'PMS Background', component: <PMSBackground /> },
]

export default function TabGroup() {
  const [active, setActive] = useState(tabs[0])

  return (
    <>
      <div className="p-6 bg-primary text-white text-2xl font-bold">
        My Awesome Chrome Extensions
      </div>
      <div className="flex bg-white border-b-2 border-b-gray-200 border-collapse">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`py-3 px-6 cursor-pointer border-b-2 outline-none border-b-transparent border-solid uppercase text-gray-600 ${
              tab.id === active.id
                ? '!border-b-red-500 !bg-primary-lighter !text-primary'
                : ''
            }`}
            onClick={() => setActive(tab)}
          >
            <p className="text-sm">{tab.title}</p>
          </div>
        ))}
      </div>
      {active.component}
    </>
  )
}
