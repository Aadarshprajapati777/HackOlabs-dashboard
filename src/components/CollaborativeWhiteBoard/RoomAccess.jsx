// src/components/RoomAccess.jsx
import { useState, useContext } from 'react'
import { Button, Input, Modal } from 'antd'
import { LogIn, PlusCircle } from 'lucide-react'
import { WhiteboardContext } from '../context/WhiteboardContext'

const RoomAccess = () => {
  const { setRoomId, setUserName } = useContext(WhiteboardContext)
  const [roomInput, setRoomInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleJoinRoom = async () => {
    if (!roomInput || !nameInput) return
    
    setLoading(true)
    try {
      // Verify room exists with backend
      // const exists = await api.checkRoomExists(roomInput)
      // if (!exists) throw new Error('Room not found')
      
      setRoomId(roomInput)
      setUserName(nameInput)
    } catch (error) {
      Modal.error({
        title: 'Room not found',
        content: 'Please check the room ID or create a new room'
      })
    }
    setLoading(false)
  }

  const handleCreateRoom = async () => {
    if (!nameInput) return
    
    setLoading(true)
    try {
      // Create new room with backend
      // const newRoomId = await api.createNewRoom()
      const newRoomId = Math.random().toString(36).substr(2, 9)
      
      setRoomId(newRoomId)
      setUserName(nameInput)
    } catch (error) {
      Modal.error({
        title: 'Error creating room',
        content: error.message
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Join Whiteboard</h1>
        
        <Input
          placeholder="Your Name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="mb-4"
          prefix={<LogIn size={16} />}
        />
        
        <Input
          placeholder="Room ID (optional)"
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          className="mb-6"
        />

        <div className="flex flex-col gap-3">
          <Button
            type="primary"
            icon={<LogIn size={16} />}
            onClick={handleJoinRoom}
            loading={loading}
            block
          >
            Join Room
          </Button>
          
          <span className="text-center text-gray-500">or</span>
          
          <Button
            icon={<PlusCircle size={16} />}
            onClick={handleCreateRoom}
            loading={loading}
            block
          >
            Create New Room
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RoomAccess