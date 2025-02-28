// src/context/WhiteboardContext.jsx
import { createContext, useState, useContext } from 'react'

const WhiteboardContext = createContext()

export const WhiteboardProvider = ({ children }) => {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')

  return (
    <WhiteboardContext.Provider
      value={{
        roomId,
        setRoomId,
        userName,
        setUserName
      }}
    >
      {children}
    </WhiteboardContext.Provider>
  )
}

export const useWhiteboard = () => useContext(WhiteboardContext)