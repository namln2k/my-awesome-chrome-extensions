import React from 'react'
import { createRoot } from 'react-dom/client'
import '../assets/tailwind.scss'
import TabGroup from '../components/TabGroup'

function Popup() {
  return (
    <>
      <TabGroup />
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
