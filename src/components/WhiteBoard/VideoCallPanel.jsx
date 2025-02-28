// src/components/VideoCallPanel.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Video, VideoOff, Mic, MicOff } from 'lucide-react';
import { Button, Card } from 'antd';
import socket from '../../utils/socket';

const VideoCallPanel = ({ isVideoOn, isAudioOn, toggleVideo, toggleAudio, participants, roomId }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [peerConnections, setPeerConnections] = useState({});
  const localVideoRef = useRef(null);
  
  useEffect(() => {
    // Set up WebRTC
    const setupWebRTC = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: isVideoOn,
          audio: isAudioOn
        });
        
        setLocalStream(stream);
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        // Inform server that we're ready for WebRTC
        socket.emit('webrtcReady', { roomId });
        
        // Set up WebRTC event listeners
        socket.on('userJoinedWebRTC', handleUserJoined);
        socket.on('webrtcOffer', handleWebRTCOffer);
        socket.on('webrtcAnswer', handleWebRTCAnswer);
        socket.on('webrtcIceCandidate', handleWebRTCIceCandidate);
        socket.on('userDisconnected', handleUserDisconnected);
        
        return () => {
          stream.getTracks().forEach(track => track.stop());
          
          // Clean up WebRTC event listeners
          socket.off('userJoinedWebRTC');
          socket.off('webrtcOffer');
          socket.off('webrtcAnswer');
          socket.off('webrtcIceCandidate');
          socket.off('userDisconnected');
          
          // Close all peer connections
          Object.values(peerConnections).forEach(pc => pc.close());
        };
      } catch (err) {
        console.error('Error accessing media devices:', err);
      }
    };
    
    setupWebRTC();
  }, [roomId]);
  
  useEffect(() => {
    if (localStream) {
      // Update tracks based on isVideoOn and isAudioOn
      localStream.getVideoTracks().forEach(track => {
        track.enabled = isVideoOn;
      });
      
      localStream.getAudioTracks().forEach(track => {
        track.enabled = isAudioOn;
      });
    }
  }, [isVideoOn, isAudioOn, localStream]);
  
  const createPeerConnection = (userId) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    });
    
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('webrtcIceCandidate', {
          roomId,
          targetUserId: userId,
          candidate: event.candidate
        });
      }
    };
    
    pc.ontrack = (event) => {
      setRemoteStreams(prev => ({
        ...prev,
        [userId]: event.streams[0]
      }));
    };
    
    if (localStream) {
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }
    
    setPeerConnections(prev => ({
      ...prev,
      [userId]: pc
    }));
    
    return pc;
  };
  
  const handleUserJoined = async ({ userId }) => {
    try {
      const pc = createPeerConnection(userId);
      
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      
      socket.emit('webrtcOffer', {
        roomId,
        targetUserId: userId,
        offer
      });
    } catch (err) {
      console.error('Error creating offer:', err);
    }
  };
  
  const handleWebRTCOffer = async ({ userId, offer }) => {
    try {
      const pc = createPeerConnection(userId);
      
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      
      socket.emit('webrtcAnswer', {
        roomId,
        targetUserId: userId,
        answer
      });
    } catch (err) {
      console.error('Error handling offer:', err);
    }
  };
  
  const handleWebRTCAnswer = async ({ userId, answer }) => {
    try {
      const pc = peerConnections[userId];
      
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    } catch (err) {
      console.error('Error handling answer:', err);
    }
  };
  
  const handleWebRTCIceCandidate = async ({ userId, candidate }) => {
    try {
      const pc = peerConnections[userId];
      
      if (pc) {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (err) {
      console.error('Error handling ICE candidate:', err);
    }
  };
  
  const handleUserDisconnected = ({ userId }) => {
    const pc = peerConnections[userId];
    
    if (pc) {
      pc.close();
      
      setPeerConnections(prev => {
        const newConnections = { ...prev };
        delete newConnections[userId];
        return newConnections;
      });
      
      setRemoteStreams(prev => {
        const newStreams = { ...prev };
        delete newStreams[userId];
        return newStreams;
      });
    }
  };
  
  const RemoteVideo = ({ stream, participantName }) => {
    const videoRef = useRef(null);
    
    useEffect(() => {
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);
    
    return (
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
          {participantName || 'Participant'}
        </div>
      </div>
    );
  };
  
  return (
    <div className="absolute bottom-4 right-4 w-64 bg-white rounded-lg shadow-lg overflow-hidden">
<div className="p-2 bg-gray-100 border-b">
  <h3 className="text-sm font-medium">Video Call</h3>
</div>
<div className="p-2">
  <div className="mb-2 bg-gray-900 rounded-lg overflow-hidden">
    <video
      ref={localVideoRef}
      autoPlay
      playsInline
      muted
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
      You
    </div>
  </div>
  
  <div className="grid grid-cols-2 gap-2 mt-2">
    {Object.keys(remoteStreams).map((userId) => {
      const participant = participants.find(p => p.id === userId);
      return (
        <RemoteVideo 
          key={userId} 
          stream={remoteStreams[userId]} 
          participantName={participant?.name || 'Participant'} 
        />
      );
    })}
  </div>
  
  <div className="flex justify-center space-x-2 mt-3">
    <Button
      type={isAudioOn ? "primary" : "default"}
      shape="circle"
      icon={isAudioOn ? <Mic size={16} /> : <MicOff size={16} />}
      onClick={toggleAudio}
    />
    <Button
      type={isVideoOn ? "primary" : "default"}
      shape="circle"
      icon={isVideoOn ? <Video size={16} /> : <VideoOff size={16} />}
      onClick={toggleVideo}
    />
  </div>
</div>
</div>
  );
};

export default VideoCallPanel;