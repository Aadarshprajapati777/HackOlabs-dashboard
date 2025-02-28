// src/components/VideoCall.jsx
import { useDailyEvent, useDaily } from '@daily-co/daily-react'
import { useEffect } from 'react'

const VideoCall = ({ roomId }) => {
  const callObject = useDaily()
  const [participants, setParticipants] = useState([])

  useEffect(() => {
    if (!roomId) return
    
    // Initialize Daily call
    const startCall = async () => {
      // Fetch token from backend
      // const token = await api.getDailyToken(roomId)
      
      await callObject.join({
        url: `https://yourteam.daily.co/${roomId}`,
        // token
      })
    }

    startCall()
    return () => callObject.leave()
  }, [roomId])

  useDailyEvent('participant-joined', (e) => {
    setParticipants(prev => [...prev, e.participant])
  })

  useDailyEvent('participant-left', (e) => {
    setParticipants(prev => prev.filter(p => p.id !== e.participant.id))
  })

  return (
    <div className="w-full h-[70vh] bg-gray-900 rounded-lg overflow-hidden">
      <div 
        id="daily-call-frame" 
        className="w-full h-full"
      />
    </div>
  )
}

export default VideoCall