import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const TimeDisplayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  padding: 8px 12px;
  border-radius: 0 0 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 1000;
`;

const TimeLabel = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 2px;
`;

const CurrentTime = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1f1f1f;
  line-height: 1;
`;

const DateLabel = styled.div`
  font-size: 13px;
  color: #666;
`;

const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}年${month}月${day}日`;
  };

  return (
    <TimeDisplayWrapper>
      <TimeLabel>当前时间</TimeLabel>
      <CurrentTime>{formatTime(currentTime)}</CurrentTime>
      <DateLabel>{formatDate(currentTime)}</DateLabel>
    </TimeDisplayWrapper>
  );
};

export default TimeDisplay; 