import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Avatar, Tooltip } from 'antd';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

// Import adapter for browser compatibility
import 'webrtc-adapter';

const VideoCall = ({ visible, roomId, onClose, socket }) => {
  const [localStream, setLocalStream] = useState(null);
  const [peers, setPeers] = useState({});
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const localVideoRef = useRef(null);
  const peerConnections = useRef({});

  // Initialize media when modal opens
  useEffect(() => {
    if (visible && socket) {
      initializeMedia();
      
      // Set up WebRTC signaling
      socket.on('webrtc-offer', handleOffer);
      socket.on('webrtc-answer', handleAnswer);
      socket.on('webrtc-ice-candidate', handleIceCandidate);
      socket.on('webrtc-user-joined', handleUserJoined);
      socket.on('webrtc-user-left', handleUserLeft);
      
      // Signal that we've joined the call
      socket.emit('webrtc-join', roomId);
    }
    
    return () => {
      if (socket) {
        socket.off('webrtc-offer');
        socket.off('webrtc-answer');
        socket.off('webrtc-ice-candidate');
        socket.off('webrtc-user-joined');
        socket.off('webrtc-user-left');
      }
      
      // Clean up media streams
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      
      // Close peer connections
      Object.values(peerConnections.current).forEach(pc => pc.close());
      peerConnections.current = {};
      setPeers({});
    };
  }, [visible, socket, roomId]);
  
  // Initialize webcam and microphone
  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      
      setLocalStream(stream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Tell existing users we've joined
      socket.emit('webrtc-ready', roomId);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };
  
  // Handle a new user joining
  const handleUserJoined = (userId) => {
    if (userId !== socket.id && localStream) {
      createPeerConnection(userId);
      
      // Create and send offer
      const pc = peerConnections.current[userId];
      pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .then(() => {
          socket.emit('webrtc-offer', {
            target: userId,
            caller: socket.id,
            sdp: pc.localDescription
          });
        })
        .catch(err => console.error('Error creating offer:', err));
    }
  };
  
  // Handle receiving an offer
  const handleOffer = async ({ caller, sdp }) => {
    if (caller !== socket.id && localStream) {
      const pc = createPeerConnection(caller);
      
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      
      socket.emit('webrtc-answer', {
        target: caller,
        caller: socket.id,
        sdp: pc.localDescription
      });
    }
  };
  
  // Handle receiving an answer
  const handleAnswer = ({ caller, sdp }) => {
    const pc = peerConnections.current[caller];
    if (pc) {
      pc.setRemoteDescription(new RTCSessionDescription(sdp))
        .catch(err => console.error('Error setting remote description:', err));
    }
  };
  
  // Handle ICE candidates
  const handleIceCandidate = ({ caller, candidate }) => {
    const pc = peerConnections.current[caller];
    if (pc) {
      pc.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(err => console.error('Error adding ICE candidate:', err));
    }
  };
  
  // Handle user disconnect
  const handleUserLeft = (userId) => {
    if (peerConnections.current[userId]) {
      peerConnections.current[userId].close();
      delete peerConnections.current[userId];
      
      setPeers(prevPeers => {
        const newPeers = { ...prevPeers };
        delete newPeers[userId];
        return newPeers;
      });
    }
  };
  
  // Create a new peer connection
  const createPeerConnection = (userId) => {
    // Using Google's public STUN servers
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };
    
    const pc = new RTCPeerConnection(configuration);
    peerConnections.current[userId] = pc;
    
    // Add local tracks to the connection
    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream);
    });
    
    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('webrtc-ice-candidate', {
          target: userId,
          caller: socket.id,
          candidate: event.candidate
        });
      }
    };
    
    // Handle incoming streams
    pc.ontrack = (event) => {
      setPeers(prevPeers => ({
        ...prevPeers,
        [userId]: {
          stream: event.streams[0]
        }
      }));
    };
    
    return pc;
  };
  
  // Toggle audio
  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };
  
  // Toggle video
  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };
  
  // End call and close modal
  const endCall = () => {
    socket.emit('webrtc-leave', roomId);
    onClose();
  };
  
  return (
    <Modal
      title="Video Call"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="video-call-modal"
    >
      <div className="flex flex-col h-[60vh]">
        <div className="flex-1 grid grid-cols-2 gap-4 overflow-y-auto p-4">
          {/* Local video */}
          <div className="relative rounded-lg overflow-hidden bg-gray-800">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-gray-800/60 px-3 py-1 rounded-full text-white">
              You
            </div>
          </div>
          
          {/* Remote videos */}
          {Object.entries(peers).map(([userId, { stream }]) => (
            <div key={userId} className="relative rounded-lg overflow-hidden bg-gray-800">
              <video
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                ref={node => {
                  if (node) node.srcObject = stream;
                }}
              />
              <div className="absolute bottom-2 left-2 bg-gray-800/60 px-3 py-1 rounded-full text-white">
                Participant
              </div>
            </div>
          ))}
        </div>
        
        {/* Controls */}
        <div className="flex justify-center items-center gap-4 p-4 bg-gray-100 rounded-b-lg">
          <Button
            shape="circle"
            size="large"
            type={isAudioEnabled ? "primary" : "default"}
            className={isAudioEnabled ? "bg-blue-500" : "bg-gray-300"}
            icon={isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
            onClick={toggleAudio}
          />
          <Button
            shape="circle"
            size="large"
            type={isVideoEnabled ? "primary" : "default"}
            className={isVideoEnabled ? "bg-blue-500" : "bg-gray-300"}
            icon={isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
            onClick={toggleVideo}
          />
          <Button
            shape="circle"
            size="large"
            type="primary"
            danger
            icon={<PhoneOff size={20} />}
            onClick={endCall}
          />
        </div>
      </div>
    </Modal>
  );
};

export default VideoCall;