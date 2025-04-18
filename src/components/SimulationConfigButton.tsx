import React from 'react';
import { Button, Badge, Tooltip } from 'antd';
import { SettingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: 40px;
  cursor: pointer;
  position: relative;
  z-index: 11;
  width: 100%;
  margin-bottom: 8px;
`;

interface SimulationConfigButtonProps {
  onClick: () => void;
  isCompleted: boolean;
  configData?: {
    speed?: number;
    startTime?: string;
    duration?: number;
    rooms?: Record<string, number>;
    packages?: Record<string, number>;
  };
}

const SimulationConfigButton: React.FC<SimulationConfigButtonProps> = ({ 
  onClick, 
  isCompleted,
  configData 
}) => {
  return (
    <Tooltip title={isCompleted ? "配置已完成" : "点击配置模拟参数"}>
      <StyledButton 
        icon={isCompleted ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> : <SettingOutlined />} 
        onClick={onClick}
      >
        模拟参数配置 {isCompleted && <Badge status="success" />}
      </StyledButton>
    </Tooltip>
  );
};

export default SimulationConfigButton; 