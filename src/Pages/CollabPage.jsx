import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  StreamVideo,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

export default function CollabPage() {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const { callId } = useParams();

  // Load your token and API key from env or constants.
  // IMPORTANT: Ensure your token's payload includes a user_id that exactly matches the user id below.
  const token = process.env.REACT_APP_STREAM_TOKEN || 'YOUR_PREGENERATED_TOKEN';
  const apiKey = process.env.REACT_APP_STREAM_API_KEY || 'YOUR_STREAM_API_KEY';

  // Use a fixed userId that matches your token payload, e.g. "user1"
  const userId = 'user1';

  useEffect(() => {
    if (!token || !callId || !apiKey) {
      console.warn('Missing token, callId, or apiKey');
      return;
    }

    // Create the user object
    const user = {
      id: userId,
      name: `User-${userId}`,
      image: 'https://placekitten.com/50/50',
    };

    // Use the recommended getOrCreateInstance method to prevent duplicate instances.
    const streamClient = StreamVideoClient.getOrCreateInstance({ apiKey, user, token });
    const streamCall = streamClient.call('default', callId);

    streamCall
      .join({ create: true })
      .then(() => {
        setClient(streamClient);
        setCall(streamCall);
      })
      .catch((err) => {
        console.error('Failed to join call:', err);
      });

    // Cleanup on unmount
    return () => {
      if (streamCall) {
        streamCall.leave().catch((err) => console.error('Error leaving call:', err));
      }
      if (streamClient) {
        streamClient.disconnectUser().catch((err) => console.error('Error disconnecting user:', err));
      }
    };
  }, [token, callId, apiKey, userId]);

  if (!client || !call) {
    return (
      <div style={{ padding: '2rem', color: '#fff', background: '#333', height: '100vh' }}>
        <h2>Joining call...</h2>
        <p>Check the console for any errors.</p>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <div style={{ width: '100vw', height: '100vh' }}>
            <SpeakerLayout participantsBarPosition="bottom" />
            <CallControls />
          </div>
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
}
