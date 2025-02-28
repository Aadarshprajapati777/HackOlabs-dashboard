// components/RoomParticipants.jsx
import React, { useState, useEffect } from 'react';
import { UserPlus, Users, Video, Phone, Mic, MicOff, Video as VideoIcon, VideoOff } from 'lucide-react';
import { Avatar, Tooltip, Badge, Button, Input, Modal, List } from 'antd';
import { generateRandomColor } from '../../utils/helpers';

const RoomParticipants = ({ 
  participants, 
  currentUser, 
  onInviteUser, 
  onToggleAudio, 
  onToggleVideo, 
  onStartCall,
  audioEnabled,
  videoEnabled,
  isCallActive
}) => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredParticipants = participants.filter(participant => 
    participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = () => {
    if (inviteEmail) {
      onInviteUser(inviteEmail);
      setInviteEmail('');
      setInviteModalVisible(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Users className="mr-2" size={18} />
          Participants ({participants.length})
        </h3>
        <div className="flex space-x-2">
          {isCallActive ? (
            <>
              <Tooltip title={audioEnabled ? "Mute" : "Unmute"}>
                <Button 
                  type="text" 
                  shape="circle" 
                  icon={audioEnabled ? <Mic size={16} /> : <MicOff size={16} />} 
                  onClick={onToggleAudio}
                />
              </Tooltip>
              <Tooltip title={videoEnabled ? "Turn off video" : "Turn on video"}>
                <Button 
                  type="text" 
                  shape="circle" 
                  icon={videoEnabled ? <VideoIcon size={16} /> : <VideoOff size={16} />} 
                  onClick={onToggleVideo}
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Start audio call">
                <Button 
                  type="text" 
                  shape="circle" 
                  icon={<Phone size={16} />} 
                  onClick={() => onStartCall('audio')}
                />
              </Tooltip>
              <Tooltip title="Start video call">
                <Button 
                  type="text" 
                  shape="circle" 
                  icon={<Video size={16} />} 
                  onClick={() => onStartCall('video')}
                />
              </Tooltip>
            </>
          )}
          <Tooltip title="Invite someone">
            <Button 
              type="text" 
              shape="circle" 
              icon={<UserPlus size={16} />} 
              onClick={() => setInviteModalVisible(true)}
            />
          </Tooltip>
        </div>
      </div>
      
      <Input 
        placeholder="Search participants..." 
        prefix={<Users size={16} />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      
      <div className="overflow-y-auto flex-grow">
        <List
          dataSource={filteredParticipants}
          renderItem={participant => {
            const isCurrentUser = participant.id === currentUser.id;
            return (
              <List.Item className="py-2 px-4 hover:bg-gray-50 rounded-md">
                <div className="flex items-center w-full">
                  <div className="relative">
                    {participant.avatar ? (
                      <Avatar src={participant.avatar} />
                    ) : (
                      <Avatar style={{ backgroundColor: generateRandomColor(participant.id) }}>
                        {getInitials(participant.name)}
                      </Avatar>
                    )}
                    <Badge 
                      status={participant.isOnline ? "success" : "default"} 
                      className="absolute -bottom-1 -right-1 border-2 border-white"
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <div className="flex items-center">
                      <span className="font-medium">
                        {participant.name} {isCurrentUser && "(You)"}
                      </span>
                      {participant.isTyping && (
                        <span className="ml-2 text-xs text-gray-500 italic">typing...</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{participant.role || "Viewer"}</div>
                  </div>
                  {participant.hasAudioEnabled && (
                    <Mic size={14} className="text-gray-500 mr-1" />
                  )}
                  {participant.hasVideoEnabled && (
                    <VideoIcon size={14} className="text-gray-500" />
                  )}
                </div>
              </List.Item>
            );
          }}
        />
      </div>

      <Modal
        title="Invite Participant"
        open={inviteModalVisible}
        onCancel={() => setInviteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setInviteModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="invite" type="primary" onClick={handleInvite}>
            Invite
          </Button>
        ]}
      >
        <p className="mb-3">Enter an email address to invite someone to this room:</p>
        <Input
          placeholder="email@example.com"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          onPressEnter={handleInvite}
        />
      </Modal>
    </div>
  );
};

export default RoomParticipants;