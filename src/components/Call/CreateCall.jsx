import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateCall.css';

const CreateCall = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('streamUserName') || '');

  const createNewCall = async () => {
    setIsCreating(true);
    try {
      // Save username to localStorage
      if (userName) {
        localStorage.setItem('streamUserName', userName);
      }
      
      // Generate a unique call ID
      const callId = `call-${Math.random().toString(36).substring(2, 9)}-${Date.now()}`;
      
      // Navigate to the call page
      navigate(`/call/${callId}`);
    } catch (error) {
      console.error('Failed to create call:', error);
      alert('Failed to create call. Please try again.');
      setIsCreating(false);
    }
  };

  const joinExistingCall = () => {
    const callLink = prompt('Enter the call link or ID:');
    
    if (!callLink) return;
    
    // Extract call ID from link if it's a full URL
    let callId;
    if (callLink.includes('/call/')) {
      callId = callLink.split('/call/')[1];
    } else {
      callId = callLink;
    }
    
    if (callId) {
      navigate(`/call/${callId}`);
    } else {
      alert('Invalid call link or ID');
    }
  };

  return (
    <div className="create-call-container">
      <div className="create-call-card">
        <h1>Video Calling</h1>
        <div className="input-group">
          <label htmlFor="username">Your Name</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="button-group">
          <button 
            className="create-button" 
            onClick={createNewCall} 
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create New Call'}
          </button>
          <div className="or-divider">OR</div>
          <button 
            className="join-button" 
            onClick={joinExistingCall}
          >
            Join Existing Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCall;