import React from 'react';
import { InputNumber, DatePicker } from 'antd';
import dayjs from 'dayjs';
import styled from '@emotion/styled';

const ConfigContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 360px;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #1f1f1f;
`;

const ConfigSection = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ConfigItem = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
`;

interface SimulationGlobalConfigProps {
  config: {
    speed: number;
    startTime: string;
    duration: number;
  };
  onConfigChange: (newConfig: {
    speed: number;
    startTime: string;
    duration: number;
  }) => void;
}

const SimulationGlobalConfig: React.FC<SimulationGlobalConfigProps> = ({ config, onConfigChange }) => {
  return (
    <ConfigContainer>
      <Title>门诊场景推演全局配置项</Title>
      <ConfigSection>
        <ConfigItem>
          <Label>推演速度</Label>
          <InputNumber
            style={{ width: '100%' }}
            min={1}
            max={10000}
            value={config.speed}
            onChange={(value) => onConfigChange({ ...config, speed: value || 1000 })}
          />
        </ConfigItem>
        <ConfigItem>
          <Label>开始时间</Label>
          <DatePicker
            showTime
            style={{ width: '100%' }}
            value={dayjs(config.startTime)}
            onChange={(date) => onConfigChange({ 
              ...config, 
              startTime: date?.format('YYYY-MM-DD HH:mm:ss') || config.startTime 
            })}
          />
        </ConfigItem>
        <ConfigItem>
          <Label>推演时长（秒）</Label>
          <InputNumber
            style={{ width: '100%' }}
            min={1}
            max={86400}
            value={config.duration}
            onChange={(value) => onConfigChange({ ...config, duration: value || 24000 })}
          />
        </ConfigItem>
      </ConfigSection>
    </ConfigContainer>
  );
};

export default SimulationGlobalConfig; 