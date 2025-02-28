// src/components/ToolbarButton.jsx
import React from 'react';
import { Tooltip, Button } from 'antd';

const ToolbarButton = ({ icon, onClick, isActive, tooltip, isAlert }) => {
  return (
    <Tooltip title={tooltip} placement="right">
      <Button
        type={isActive ? "primary" : "default"}
        icon={icon}
        onClick={onClick}
        className={`flex items-center justify-center ${isAlert ? 'hover:text-red-500' : ''}`}
        danger={isAlert}
      />
    </Tooltip>
  );
};

export default ToolbarButton;

