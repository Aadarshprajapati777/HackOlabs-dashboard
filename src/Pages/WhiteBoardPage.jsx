// src/pages/Whiteboard.jsx
import { useState, useEffect, useRef, useContext } from 'react'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { DailyProvider, useDaily } from '@daily-co/daily-react'
import { Button, Modal } from 'antd'
import { 
  Video, Phone, Pen, Square, Circle, Type, 
  Eraser, Share2, Users, LogIn 
} from 'lucide-react'
import Toolbar from '../components/CollaborativeWhiteBoard/Toolbar'
import VideoCall from '../components/CollaborativeWhiteBoard/VideoCall'
import RoomAccess from '../components/CollaborativeWhiteBoard/RoomAccess'
import { WhiteboardContext } from '../Context/WhiteboardContext'

const WhiteboardPage = () => {
  const { roomId, userName, setRoomId, setUserName } = useContext(WhiteboardContext)
  const [showVideoCall, setShowVideoCall] = useState(false)
  const [participants, setParticipants] = useState([])
  const { editor, onReady } = useFabricJSEditor()
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!editor || !roomId) return

    // Listen for canvas updates from other users
    const handleCanvasUpdate = (data) => {
      editor.canvas.loadFromJSON(data, () => {
        editor.canvas.renderAll()
      })
    }
    
    // Backend WebSocket integration point
    // socket.on('canvas-update', handleCanvasUpdate)
    
    return () => {
      // socket.off('canvas-update', handleCanvasUpdate)
    }
  }, [editor, roomId])

  const handleCanvasChange = () => {
    if (!editor || !roomId) return
    const canvasData = editor.canvas.toJSON()
    // Emit canvas update to backend
    // socket.emit('canvas-update', { roomId, canvasData })
  }

  const startVideoCall = async () => {
    setShowVideoCall(true)
    // Backend integration to create Daily room
    // const { token } = await api.createDailyRoom(roomId)
    // return token
  }

  if (!roomId || !userName) {
    return <RoomAccess />
  }

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col">
      {/* Toolbar */}
      <div className="bg-white p-4 shadow flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Toolbar editor={editor} />
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            icon={<Video size={16} />}
            onClick={startVideoCall}
            className="flex items-center gap-2"
          >
            Start Call
          </Button>
          <span className="text-sm text-gray-600">{userName}</span>
        </div>
      </div>

      {/* Whiteboard Canvas */}
      <div className="flex-1 relative">
        <FabricJSCanvas
          className="w-full h-full"
          onReady={onReady}
          ref={canvasRef}
          onObjectModified={handleCanvasChange}
          onSelectionCreated={handleCanvasChange}
          onSelectionUpdated={handleCanvasChange}
        />
      </div>

      {/* Video Call Modal */}
      <Modal
        open={showVideoCall}
        onCancel={() => setShowVideoCall(false)}
        footer={null}
        width="80vw"
        centered
      >
        <VideoCall roomId={roomId} />
      </Modal>
    </div>
  )
}

export default WhiteboardPage