import React from 'react'
import '../assets/loading.css'

interface IProps {
  show?: boolean
  className?: string
}

export default function Loading({ show, className }: IProps) {
  return (
    <>
      <div id="loading" className={`loading ${show && 'show'} ${className}`}>
        <svg
          className="spinner"
          width="65px"
          height="65px"
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="path"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            cx="33"
            cy="33"
            r="30"
          ></circle>
        </svg>
      </div>
    </>
  )
}
