import { Avatar, List } from 'antd';
import { User } from 'lucide-react';

export default function RoomSidebar({ participants }) {
  return (
    <div className="p-4">
      <h3 className="font-semibold mb-4">Participants ({participants.length})</h3>
      <List
        dataSource={participants}
        renderItem={participant => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<User size={16} />} />}
              title={participant.name}
            />
          </List.Item>
        )}
      />
    </div>
  );
}