import React from 'react'
import { createRoot } from 'react-dom/client'
import '@assets/popup.scss'

function Popup() {
  return (
    <>
      <div>More contents comming soon...</div>
    </>
  )
}

let rootNode = document.getElementById('react-root')
if (!rootNode) {
  rootNode = document.createElement('div')
  rootNode.id = 'react-root'
  document.body.appendChild(rootNode)
}

const root = createRoot(rootNode)
root.render(<Popup />)
