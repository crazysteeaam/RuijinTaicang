import React from 'react';
import { Radio } from 'antd';
import { UserOutlined, TeamOutlined, DashboardOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const ViewSwitcherContainer = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 32px;
  padding: 8px 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

interface ViewSwitcherProps {
  currentView: 'patient' | 'staff' | 'management';
  onViewChange: (view: 'patient' | 'staff' | 'management') => void;
}

export default function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <ViewSwitcherContainer>
      <Radio.Group 
        value={currentView} 
        onChange={(e) => onViewChange(e.target.value)}
        buttonStyle="solid"
        optionType="button"
      >
        <Radio.Button value="patient">
          <UserOutlined /> 患者视角
        </Radio.Button>
        <Radio.Button value="staff">
          <TeamOutlined /> 医护人员视角
        </Radio.Button>
        <Radio.Button value="management">
          <DashboardOutlined /> 管理视角
        </Radio.Button>
      </Radio.Group>
    </ViewSwitcherContainer>
  );
} 