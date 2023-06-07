import React, { useState } from 'react'
import Loading from './Loading'
import axios from 'axios'

const cloudName = 'dmnntmjiv'
const uploadPreset = 'xcby2jji'

interface IMessage {
  type?: string
  text?: string
}

export default function PMSBackground() {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState()
  const [message, setMessage] = useState<IMessage>({})

  const setSuccessMessage = (text) => {
    setMessage({ type: 'success', text })
  }

  const setFailureMessage = (text) => {
    setMessage({ type: 'failure', text })
  }

  const handleFileChange = (event) => {
    setLoading(true)
    const file = event.target.files[0]

    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      )
      .then((res) => {
        if (res.data?.secure_url) {
          chrome.storage.local.set(
            { custom_pms_dialog_bg: res.data.secure_url },
            async function () {
              chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                  var currTab = tabs[0]
                  chrome.tabs.sendMessage(currTab.id, {
                    backgroundImageUrl: res.data.secure_url,
                  })
                }
              )
            }
          )
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <>
      <Loading show={loading} />
      <div className="tab-content">
        {/* <label htmlFor="bg-file-input">Choose your custom background</label>
        <input type="file" id="bg-file-input" onChange={handleFileChange} />
        {message.text && (
          <h3 className={`message ${message.type}`}>{message.text}</h3>
        )} */}
        <p className="text-base">
          This feature is being developed and will soon complete! Please be
          patient!
        </p>
      </div>
    </>
  )
}
