
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   StreamVideoClient,
//   StreamCall,
//   StreamTheme,
//   SpeakerLayout,
//   CallControls,
//   useCallStateHooks,
//   StreamVideo,
//   CallPanel,
//   PaginatedGridLayout,
//   ParticipantView,
//   useStreamVideoClient,
// } from '@stream-io/video-react-sdk';
// import { Loader, Copy, X } from 'lucide-react';
// import { QRCodeSVG } from 'qrcode.react';
// import '@stream-io/video-react-sdk/dist/css/styles.css';

// const VideoCall = () => {
//   const { callId } = useParams();
//   const navigate = useNavigate();
//   const [client, setClient] = useState(null);
//   const [call, setCall] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showInvitePanel, setShowInvitePanel] = useState(true);
//   const { useCallCallingState } = useCallStateHooks();
//   const callingState = useCallCallingState?.();

//   useEffect(() => {
//     if (!callId) {
//       navigate('/createcall'); // Redirect to call creation page if no ID
//       return;
//     }

//     const initializeCall = async () => {
//       try {
//         setLoading(true);

//         const userId = localStorage.getItem('streamUserId') || `user-${Math.random().toString(36).substring(2, 9)}`;
//         localStorage.setItem('streamUserId', userId);

//         const userName = localStorage.getItem('streamUserName') || prompt('Enter your name for the call:');
//         if (userName) localStorage.setItem('streamUserName', userName);

//         // Fetch token from backend
//         const response = await fetch('http://localhost:3001/api/get-stream-token', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ userId, userName }),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to get authentication token');
//         }

//         const { token, userImage } = await response.json();

//         // Create user object
//         const user = {
//           id: userId,
//           name: userName,
//           image: userImage,
//         };

//         // Initialize Stream client
//         const streamClient = new StreamVideoClient({
//           apiKey: process.env.REACT_APP_STREAM_API_KEY,
//           user,
//           token,
//         });

//         // Create or join call
//         const streamCall = streamClient.call('default', callId);
//         await streamCall.join({ create: true });

//         setClient(streamClient);
//         setCall(streamCall);
//       } catch (err) {
//         console.error('Failed to join call', err);
//         setError(`Failed to join call: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeCall();

//     return () => {
//       if (call) {
//         call.leave().catch(console.error);
//       }
//       if (client) {
//         client.disconnectUser().catch(console.error);
//       }
//     };
//   }, [callId, navigate]);

//   // Function to handle ending the call
//   const handleEndCall = async () => {
//     try {
//       // Turn off camera and microphone
//       if (call) {
//         await call.camera.disable();
//         await call.microphone.disable();
//         await call.leave();
//       }
//       if (client) {
//         await client.disconnectUser();
//       }
//       // Navigate bbackack to home or create call page
//       navigate('/createcall');
//     } catch (error) {
//       console.error('Error ending call:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center w-full h-screen bg-black">
//         <div className="flex flex-col items-center justify-center space-y-4">
//           <Loader className="w-8 h-8 text-blue-500 animate-spin" />
//           <span className="text-white text-lg">Connecting to call...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center w-full h-screen bg-black">
//         <div className="p-4 bg-red-800 text-white rounded-md max-w-md">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!client || !call) {
//     return (
//       <div className="flex items-center justify-center w-full h-screen bg-black">
//         <div className="flex flex-col items-center justify-center space-y-4">
//           <Loader className="w-8 h-8 text-blue-500 animate-spin" />
//           <span className="text-white text-lg">Setting up video session...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-screen bg-black overflow-hidden">
//       <StreamVideo client={client}>
//         <StreamCall call={call}>
//           <StreamTheme>
//             <div className="relative w-full h-full flex flex-col">
//               {/* Header section with Stream logo and call info */}
//               <div className="w-full bg-gray-900 text-white px-4 py-2 flex items-center justify-between shadow-md">
//                 <div className="flex items-center">
//                   <svg className="w-8 h-8 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
//                   </svg>
//                   <span className="font-semibold">Stream Video Calling</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center">
//                     <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
//                     00:38
//                   </span>
//                   <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
//                     98 ms
//                   </span>
//                 </div>
//               </div>

//               {/* Main content */}
//               <div className="flex-1 relative">
//                 {/* Custom Video Layout - Using SpeakerLayout instead of SpeakerView */}
//                 <div className="w-full h-full bg-black">
//                   <SpeakerLayout />
//                 </div>

//                 {/* Custom Controls */}
//                 <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
//                   <div className="bg-gray-900 bg-opacity-60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-4">
//                     <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
//                       <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//                         <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//                         <line x1="12" y1="19" x2="12" y2="23" />
//                         <line x1="8" y1="23" x2="16" y2="23" />
//                       </svg>
//                     </button>
//                     <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
//                       <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M23 7l-7 5 7 5V7z" />
//                         <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
//                       </svg>
//                     </button>
//                     <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
//                       <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <circle cx="12" cy="12" r="1" />
//                         <circle cx="12" cy="5" r="1" />
//                         <circle cx="12" cy="19" r="1" />
//                       </svg>
//                     </button>
//                     <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
//                       <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                         <circle cx="12" cy="7" r="4" />
//                       </svg>
//                     </button>
//                     <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
//                       <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
//                         <line x1="8" y1="21" x2="16" y2="21" />
//                         <line x1="12" y1="17" x2="12" y2="21" />
//                       </svg>
//                     </button>
//                     <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
//                       <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <circle cx="12" cy="12" r="10" />
//                         <circle cx="12" cy="12" r="4" />
//                         <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
//                       </svg>
//                     </button>
//                     <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
//                       <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//                       </svg>
//                     </button>
//                     <button 
//                       className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
//                       onClick={handleEndCall}
//                     >
//                       <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
//                         <line x1="1" y1="1" x2="23" y2="23" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Controls at the corners */}
//                 <div className="absolute top-4 right-4 flex space-x-2">
//                   <button className="p-2 rounded-full bg-gray-800 bg-opacity-60 text-white hover:bg-opacity-80 transition-colors">
//                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
//                     </svg>
//                   </button>
//                   <button className="p-2 rounded-full bg-gray-800 bg-opacity-60 text-white hover:bg-opacity-80 transition-colors">
//                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <circle cx="12" cy="12" r="5" />
//                       <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
//                     </svg>
//                   </button>
//                   <button className="p-2 rounded-full bg-gray-800 bg-opacity-60 text-white hover:bg-opacity-80 transition-colors">
//                     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <rect x="3" y="3" width="18" height="18" rx="2" />
//                       <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Invite Panel */}
//             {showInvitePanel && (
//               <div className="absolute top-20 right-4 z-50 bg-gray-900 rounded-lg shadow-lg w-64 text-white overflow-hidden">
//                 <div className="flex justify-between items-center p-3 bg-gray-800">
//                   <h3 className="font-medium">Your meeting is live!</h3>
//                   <button 
//                     onClick={() => setShowInvitePanel(false)}
//                     className="text-gray-400 hover:text-white"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//                 <div className="p-4 space-y-4">
//                   <button 
//                     className="w-full py-2 bg-blue-600 rounded-md font-medium flex justify-center items-center space-x-2 hover:bg-blue-700 transition-colors"
//                     onClick={() => {
//                       navigator.clipboard.writeText(window.location.href);
//                       alert('Call link copied to clipboard!');
//                     }}
//                   >
//                     <Copy size={16} />
//                     <span>Copy invite link</span>
//                   </button>

//                   <p className="text-xs text-gray-300">
//                     Or share this call ID with the others you want in the meeting:
//                   </p>

//                   <div className="flex items-center justify-between bg-gray-800 rounded p-2 text-sm">
//                     <code>HL{callId}</code>
//                     <button 
//                       className="text-gray-400 hover:text-white"
//                       onClick={() => {
//                         navigator.clipboard.writeText(callId);
//                         alert('Call ID copied to clipboard!');
//                       }}
//                     >
//                       <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
//                         <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
//                       </svg>
//                     </button>
//                   </div>

//                   <div className="space-y-2">
//                     <p className="text-xs text-gray-300">
//                       To test on a mobile device, scan the QR code below:
//                     </p>
//                     <div className="bg-white p-2 rounded-lg flex justify-center">
//                       <QRCodeSVG value={window.location.href} size={128} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Participant Label */}
//             <div className="absolute bottom-20 left-4 bg-black bg-opacity-60 text-white text-sm py-1 px-2 rounded">
//               Jango_Fett
//             </div>
//           </StreamTheme>
//         </StreamCall>
//       </StreamVideo>
//     </div>
//   );
// };

// export default VideoCall;


import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  useCallStateHooks,
  StreamVideo,
  CallParticipantsList,
  PaginatedGridLayout,
  
} from '@stream-io/video-react-sdk';
import { Loader, Copy, X, Mic, MicOff, Video, VideoOff, Phone, Share2, Users, Monitor, MoreHorizontal, Maximize, Settings } from 'lucide-react';
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
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [layout, setLayout] = useState('speaker'); // 'speaker' or 'grid'
  const timerRef = useRef(null);
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState?.();
  const participantCount = useParticipantCount?.() || 0;

  useEffect(() => {
    if (!callId) {
      navigate('/createcall'); // Redirect to call creation page if no ID
      return;
    }

    const initializeCall = async () => {
      try {
        setLoading(true);

        // Get or generate user ID
        const userId = localStorage.getItem('streamUserId') || `user-${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('streamUserId', userId);

        // Get or prompt for user name
        let userName = localStorage.getItem('streamUserName');
        if (!userName) {
          userName = prompt('Enter your name for the call:') || 'Anonymous User';
          localStorage.setItem('streamUserName', userName);
        }

        // Fetch token from backend
        const response = await fetch('https://olabs-backend-1.onrender.com/api/get-stream-token', {
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
          image: userImage || 'https://getstream.io/random_svg/?name=' + userName,
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

        // Start call timer
        timerRef.current = setInterval(() => {
          setCallDuration(prev => prev + 1);
        }, 1000);
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
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [callId, navigate]);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      // Navigate back to home or create call page
      navigate('/createcall');
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  // Toggle microphone
  const toggleMicrophone = async () => {
    try {
      if (!call) return;

      if (isMicOn) {
        await call.microphone.disable();
      } else {
        await call.microphone.enable();
      }
      setIsMicOn(!isMicOn);
    } catch (error) {
      console.error('Error toggling microphone:', error);
    }
  };

  // Toggle camera
  const toggleCamera = async () => {
    try {
      if (!call) return;

      if (isCameraOn) {
        await call.camera.disable();
      } else {
        await call.camera.enable();
      }
      setIsCameraOn(!isCameraOn);
    } catch (error) {
      console.error('Error toggling camera:', error);
    }
  };

  // Toggle screen sharing
  const toggleScreenShare = async () => {
    try {
      if (!call) return;

      if (isScreenSharing) {
        await call.stopScreenShare();
      } else {
        await call.startScreenShare();
      }
      setIsScreenSharing(!isScreenSharing);
    } catch (error) {
      console.error('Error toggling screen share:', error);
    }
  };

  // Copy invite link to clipboard
  const copyInviteLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Call link copied to clipboard!');
  };

  // Copy call ID to clipboard
  const copyCallId = () => {
    navigator.clipboard.writeText(callId);
    alert('Call ID copied to clipboard!');
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Toggle layout
  const toggleLayout = () => {
    setLayout(layout === 'speaker' ? 'grid' : 'speaker');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-900">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader className="w-10 h-10 text-blue-500 animate-spin" />
          <span className="text-white text-lg">Connecting to call...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-900">
        <div className="p-6 bg-red-800 text-white rounded-lg max-w-md shadow-lg">
          <h3 className="text-xl font-bold mb-3">Connection Error</h3>
          <p>{error}</p>
          <button
            onClick={() => navigate('/createcall')}
            className="mt-4 px-4 py-2 bg-white text-red-800 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-900">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader className="w-10 h-10 text-blue-500 animate-spin" />
          <span className="text-white text-lg">Setting up video session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900 overflow-hidden">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <div className="relative w-full h-full flex flex-col">
              {/* Header section with logo and call info */}
              <div className="w-full bg-gray-800 text-white px-4 py-3 flex items-center justify-between shadow-md z-10">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1z" />
                      <rect width="15" height="10" x="1" y="7" rx="2" ry="2" />
                    </svg>
                  </div>
                  <span className="font-bold text-lg hidden sm:inline">Olabs Collaborative</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                    {formatTime(callDuration)}
                  </span>
                  <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
                    <Users className="w-3 h-3 inline mr-1" />
                    {participantCount}
                  </span>
                  <button
                    onClick={() => setShowInvitePanel(!showInvitePanel)}
                    className="hidden sm:flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md px-2 py-1 text-xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Invite</span>
                  </button>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 relative">
                {/* Video Layout */}
                <div className="w-full h-full bg-gray-900">
                  {layout === 'speaker' ? (
                    <SpeakerLayout />
                  ) : (
                    <PaginatedGridLayout />
                  )}
                </div>

                {/* Custom Controls */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 px-4">
                  <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-center flex-wrap gap-3 sm:gap-6 shadow-lg">
                    {/* Microphone control */}
                    <button
                      className={`p-3 rounded-full transition-colors flex items-center justify-center ${isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
                      onClick={toggleMicrophone}
                      title={isMicOn ? "Mute microphone" : "Unmute microphone"}
                    >
                      {isMicOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
                    </button>

                    {/* Camera control */}
                    <button
                      className={`p-3 rounded-full transition-colors flex items-center justify-center ${isCameraOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
                      onClick={toggleCamera}
                      title={isCameraOn ? "Turn off camera" : "Turn on camera"}
                    >
                      {isCameraOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
                    </button>

                    {/* Screen share */}
                    <button
                      className={`p-3 rounded-full transition-colors flex items-center justify-center ${isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                      onClick={toggleScreenShare}
                      title={isScreenSharing ? "Stop sharing screen" : "Share screen"}
                    >
                      <Monitor className="w-5 h-5 text-white" />
                    </button>

                    {/* Participants */}
                    <button
                      className={`p-3 rounded-full transition-colors flex items-center justify-center ${showParticipants ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                      onClick={() => setShowParticipants(!showParticipants)}
                      title="Show participants"
                    >
                      <Users className="w-5 h-5 text-white" />
                    </button>

                    {/* Layout toggle */}
                    <button
                      className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center"
                      onClick={toggleLayout}
                      title={layout === 'speaker' ? "Switch to grid view" : "Switch to speaker view"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {layout === 'speaker' ? (
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                        ) : (
                          <>
                            <rect x="2" y="2" width="9" height="9" />
                            <rect x="13" y="2" width="9" height="9" />
                            <rect x="2" y="13" width="9" height="9" />
                            <rect x="13" y="13" width="9" height="9" />
                          </>
                        )}
                      </svg>
                    </button>

                    {/* Settings button - mobile only */}
                    <button
                      className="sm:hidden p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors flex items-center justify-center"
                      title="Settings"
                    >
                      <Settings className="w-5 h-5 text-white" />
                    </button>

                    {/* More options - desktop only */}
                    <button
                      className="hidden sm:flex p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors items-center justify-center"
                      title="More options"
                    >
                      <MoreHorizontal className="w-5 h-5 text-white" />
                    </button>

                    {/* End call */}
                    <button
                      className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center"
                      onClick={handleEndCall}
                      title="End call"
                    >
                      <Phone className="w-5 h-5 text-white transform rotate-135" />
                    </button>
                  </div>
                </div>

                {/* Top controls */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    className="p-2 rounded-full bg-gray-800 bg-opacity-60 text-white hover:bg-opacity-80 transition-colors"
                    onClick={toggleFullscreen}
                    title="Toggle fullscreen"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Invite Panel */}
            {showInvitePanel && (
              <div className="absolute top-16 sm:top-20 right-4 z-50 bg-gray-800 rounded-lg shadow-xl w-72 text-white overflow-hidden border border-gray-700">
                <div className="flex justify-between items-center p-3 bg-gray-700">
                  <h3 className="font-medium">Invite participants</h3>
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
                    onClick={copyInviteLink}
                  >
                    <Copy size={16} />
                    <span>Copy invite link</span>
                  </button>

                  <p className="text-xs text-gray-300">
                    Or share this call ID with others:
                  </p>

                  <div className="flex items-center justify-between bg-gray-700 rounded-md p-2 text-sm">
                    <code className="font-mono">HL-{callId.substring(0, 8)}</code>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={copyCallId}
                    >
                      <Copy size={16} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-gray-300">
                      Scan QR code to join from a mobile device:
                    </p>
                    <div className="bg-white p-2 rounded-lg flex justify-center">
                      <QRCodeSVG value={window.location.href} size={160} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Participants Panel */}
            {showParticipants && (
              <div className="absolute top-16 sm:top-20 left-4 z-50 bg-gray-800 rounded-lg shadow-xl w-72 text-white overflow-hidden border border-gray-700">
                <div className="flex justify-between items-center p-3 bg-gray-700">
                  <h3 className="font-medium">Participants ({participantCount})</h3>
                  <button
                    onClick={() => setShowParticipants(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="p-2 max-h-96 overflow-y-auto">
                  <CallParticipantsList />
                </div>
              </div>
            )}
          </StreamTheme>
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

export default VideoCall;