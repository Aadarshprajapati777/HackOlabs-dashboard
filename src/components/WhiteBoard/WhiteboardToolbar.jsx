import { Button, Tooltip } from 'antd';
import { Eraser, MousePointer, Square, Circle, Text, Image, Download } from 'lucide-react';

export default function WhiteboardToolbar() {
  return (
    <div className="flex items-center p-4 gap-2 border-b">
      <Tooltip title="Select">
        <Button icon={<MousePointer size={18} />} />
      </Tooltip>
      <Tooltip title="Rectangle">
        <Button icon={<Square size={18} />} />
      </Tooltip>
      <Tooltip title="Circle">
        <Button icon={<Circle size={18} />} />
      </Tooltip>
      <Tooltip title="Text">
        <Button icon={<Text size={18} />} />
      </Tooltip>
      <Tooltip title="Image">
        <Button icon={<Image size={18} />} />
      </Tooltip>
      <Tooltip title="Eraser">
        <Button icon={<Eraser size={18} />} />
      </Tooltip>
      <div className="flex-1" />
      <Tooltip title="Export">
        <Button icon={<Download size={18} />} />
      </Tooltip>
    </div>
  );
}