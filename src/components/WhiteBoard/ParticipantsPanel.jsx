import React from 'react';
import { List, Avatar, Typography } from 'antd';
import { Crown, UserCheck } from 'lucide-react';

const ParticipantsPanel = ({ participants }) => {
  // Sort participants: room owner first, then alphabetically
  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.isOwner && !b.isOwner) return -1;
    if (!a.isOwner && b.isOwner) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="p-2 h-full bg-gray-800 rounded-lg">
      <Typography.Title level={5} className="text-gray-200 mb-4 px-2">
        Participants ({participants.length})
      </Typography.Title>
      
      <List
        dataSource={sortedParticipants}
        renderItem={participant => (
          <List.Item className="border-b border-gray-700 py-3 px-2">
            <div className="flex items-center w-full">
              <Avatar 
                style={{ backgroundColor: participant.color }}
                className="mr-3"
              >
                {participant.name[0]}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <Typography.Text className="text-gray-200">
                    {participant.name}
                  </Typography.Text>
                  {participant.isOwner && (
                    <Crown 
                      size={16} 
                      className="ml-2 text-yellow-500" 
                    />
                  )}
                </div>
                <Typography.Text className="text-gray-400 text-xs">
                  {participant.isActive ? 'Active now' : 'Idle'}
                </Typography.Text>
              </div>
              {participant.isEditing && (
                <UserCheck size={16} className="text-green-500" />
              )}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ParticipantsPanel;