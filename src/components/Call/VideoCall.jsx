
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  useCallStateHooks,
  StreamVideo,
  CallPanel,
  PaginatedGridLayout,
  ParticipantView,
  useStreamVideoClient,
} from '@stream-io/video-react-sdk';
import { Loader, Copy, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const VideoCall = () => {
  const { callId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInvitePanel, setShowInvitePanel] = useState(true);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState?.();

  useEffect(() => {
    if (!callId) {
      navigate('/createcall'); // Redirect to call creation page if no ID
      return;
    }

    const initializeCall = async () => {
      try {
        setLoading(true);

        // Generate a user ID or get from localStorage if exists
        const userId = localStorage.getItem('streamUserId') || `user-${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('streamUserId', userId);

        // Get username from localStorage or prompt user
        const userName = localStorage.getItem('streamUserName') || prompt('Enter your name for the call:');
        if (userName) localStorage.setItem('streamUserName', userName);

        // Fetch token from backend
        const response = await fetch('http://localhost:3001/api/get-stream-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, userName }),
        });

        if (!response.ok) {
          throw new Error('Failed to get authentication token');
        }

        const { token, userImage } = await response.json();

        // Create user object
        const user = {
          id: userId,
          name: userName,
          image: userImage,
        };

        // Initialize Stream client
        const streamClient = new StreamVideoClient({
          apiKey: process.env.REACT_APP_STREAM_API_KEY,
          user,
          token,
        });

        // Create or join call
        const streamCall = streamClient.call('default', callId);
        await streamCall.join({ create: true });

        setClient(streamClient);
        setCall(streamCall);
      } catch (err) {
        console.error('Failed to join call', err);
        setError(`Failed to join call: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    initializeCall();

    return () => {
      if (call) {
        call.leave().catch(console.error);
      }
      if (client) {
        client.disconnectUser().catch(console.error);
      }
    };
  }, [callId, navigate]);

  // Function to handle ending the call
  const handleEndCall = async () => {
    try {
      // Turn off camera and microphone
      if (call) {
        await call.camera.disable();
        await call.microphone.disable();
        await call.leave();
      }
      if (client) {
        await client.disconnectUser();
      }
      // Navigate back to home or create call page
      navigate('/createcall');
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="text-white text-lg">Connecting to call...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black">
        <div className="p-4 bg-red-800 text-white rounded-md max-w-md">
          {error}
        </div>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="text-white text-lg">Setting up video session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <div className="relative w-full h-full flex flex-col">
              {/* Header section with Stream logo and call info */}
              <div className="w-full bg-gray-900 text-white px-4 py-2 flex items-center justify-between shadow-md">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                  <span className="font-semibold">Stream Video Calling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                    00:38
                  </span>
                  <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                    98 ms
                  </span>
                </div>
              </div>
              
              {/* Main content */}
              <div className="flex-1 relative">
                {/* Custom Video Layout - Using SpeakerLayout instead of SpeakerView */}
                <div className="w-full h-full bg-black">
                  <SpeakerLayout />
                </div>
                
                {/* Custom Controls */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
                  <div className="bg-gray-900 bg-opacity-60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-4">
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="23" />
                        <line x1="8" y1="23" x2="16" y2="23" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 7l-7 5 7 5V7z" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="4" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </button>
                    <button 
                      className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                      onClick={handleEndCall}
                    >
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Controls at the corners */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 rounded-full bg-gray-800 bg-opacity-60 text-white hover:bg-opacity-80 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-800 bg-opacity-60 text-white hover:bg-opacity-80 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-800 bg-opacity-60 text-white hover:bg-opacity-80 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Invite Panel */}
            {showInvitePanel && (
              <div className="absolute top-20 right-4 z-50 bg-gray-900 rounded-lg shadow-lg w-64 text-white overflow-hidden">
                <div className="flex justify-between items-center p-3 bg-gray-800">
                  <h3 className="font-medium">Your meeting is live!</h3>
                  <button 
                    onClick={() => setShowInvitePanel(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <button 
                    className="w-full py-2 bg-blue-600 rounded-md font-medium flex justify-center items-center space-x-2 hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Call link copied to clipboard!');
                    }}
                  >
                    <Copy size={16} />
                    <span>Copy invite link</span>
                  </button>
                  
                  <p className="text-xs text-gray-300">
                    Or share this call ID with the others you want in the meeting:
                  </p>
                  
                  <div className="flex items-center justify-between bg-gray-800 rounded p-2 text-sm">
                    <code>HL{callId}</code>
                    <button 
                      className="text-gray-400 hover:text-white"
                      onClick={() => {
                        navigator.clipboard.writeText(callId);
                        alert('Call ID copied to clipboard!');
                      }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-gray-300">
                      To test on a mobile device, scan the QR code below:
                    </p>
                    <div className="bg-white p-2 rounded-lg flex justify-center">
                      <QRCodeSVG value={window.location.href} size={128} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Participant Label */}
            <div className="absolute bottom-20 left-4 bg-black bg-opacity-60 text-white text-sm py-1 px-2 rounded">
              Jango_Fett
            </div>
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default VideoCall;