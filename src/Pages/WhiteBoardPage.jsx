import { useState } from 'react'
import { Button, Modal, Input, Space } from 'antd'
import { Monitor, User, Video, Share } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const [name, setName] = useState('')
  const [roomId, setRoomId] = useState('')
  const navigate = useNavigate()

  const handleCreateRoom = () => {
    Modal.confirm({
      title: 'Start New Session',
      icon: <Monitor size={20} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Input
            placeholder="Your Name"
            prefix={<User size={16} />}
            onChange={(e) => setName(e.target.value)}
          />
        </Space>
      ),
      onOk: () => {
        const newRoomId = Math.random().toString(36).substr(2, 9)
        navigate(`/whiteboard/${newRoomId}`, { state: { userName: name } })
      }
    })
  }

  const handleJoinRoom = () => {
    Modal.confirm({
      title: 'Join Existing Session',
      icon: <Share size={20} />,
      content: (
        <Space direction="vertical" className="w-full">
          <Input
            placeholder="Your Name"
            prefix={<User size={16} />}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Room ID"
            prefix={<Monitor size={16} />}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </Space>
      ),
      onOk: () => {
        navigate(`/whiteboard/${roomId}`, { state: { userName: name } })
      }
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-8">Collaborative Whiteboard</h1>
        
        <div className="flex gap-6 justify-center mb-12">
          <Button 
            type="primary" 
            size="large"
            icon={<Monitor size={20} />}
            onClick={handleCreateRoom}
          >
            New Session
          </Button>
          
          <Button 
            size="large"
            icon={<Share size={20} />}
            onClick={handleJoinRoom}
          >
            Join Session
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8 text-gray-600">
          <div className="p-4 bg-white rounded-lg shadow">
            <Video className="mb-4 mx-auto" size={32} />
            <h3 className="font-semibold mb-2">Real-time Video</h3>
            <p className="text-sm">Start instant video conferences with participants</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="mb-4 mx-auto">
              <svg className="mx-auto" width="32" height="32" viewBox="0 0 60 60">
                <path d="M45 5H15a10 10 0 0 0-10 10v30a10 10 0 0 0 10 10h30a10 10 0 0 0 10-10V15a10 10 0 0 0-10-10zm-8 39H23a2 2 0 0 1 0-4h14a2 2 0 0 1 0 4zm6-10H23a2 2 0 0 1 0-4h20a2 2 0 0 1 0 4z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Collaborative Editing</h3>
            <p className="text-sm">Work together in real-time with multiple users</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow">
            <svg className="mb-4 mx-auto" width="32" height="32" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
            </svg>
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm">End-to-end encrypted collaboration sessions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

