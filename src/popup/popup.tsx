import React from 'react'
import { createRoot } from 'react-dom/client'
import '../assets/tailwind.css'

const Popup = (
  <div>
    <h1>Hello, World!</h1>
  </div>
)

let rootNode = document.getElementById('react-root')
if (!rootNode) {
  rootNode = document.createElement('div')
  rootNode.id = 'react-root'
  document.body.appendChild(rootNode)
}

const root = createRoot(rootNode)
root.render(Popup)
