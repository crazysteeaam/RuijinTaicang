import React from 'react';
import styled from '@emotion/styled';
import { 等待时间数据列表 } from '../../mock/realtimeData';
import TimeDisplay from './TimeDisplay';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 800px;
  background: transparent;
`;

const RoomCard = styled.div<{ status: string }>`
  position: absolute;
  width: 220px;
  height: 100px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const RoomName = styled.h3`
  margin: 0;
  font-size: 15px;
  color: #1f1f1f;
  font-weight: 500;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case '拥挤': return '#fff1f0';
      case '适中': return '#fff7e6';
      case '空闲': return '#f6ffed';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case '拥挤': return '#ff4d4f';
      case '适中': return '#faad14';
      case '空闲': return '#52c41a';
      default: return '#666';
    }
  }};
`;

const WaitingTime = styled.div`
  margin: 6px 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const WaitingLabel = styled.span`
  font-size: 13px;
  color: #666;
  margin-bottom: 1px;
`;

const TimeRow = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 2px;
`;

const TimeValue = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #1f1f1f;
  line-height: 1.1;
`;

const TimeUnit = styled.span`
  font-size: 14px;
  color: #666;
  margin-left: 4px;
`;

const QueueInfo = styled.span`
  font-size: 13px;
  color: #8c8c8c;
  margin-left: 8px;
`;

// 定义诊室位置映射
const roomPositions = {
  'blood': { left: '15%', top: '15%' },        // 血常规
  'biochemical': { left: '15%', top: '35%' },  // 生化检验
  'heart': { left: '40%', top: '25%' },        // 心电图
  'ultrasound': { left: '40%', top: '45%' },   // 超声
  'ct': { left: '40%', top: '65%' },           // CT室
  'dr': { left: '65%', top: '25%' },           // DR室
  'internal': { left: '65%', top: '45%' },     // 内科
  'surgery': { left: '65%', top: '65%' },      // 外科
  'eye': { left: '85%', top: '35%' }           // 眼科
};

const PatientPerspective: React.FC = () => {
  return (
    <Container>
      <TimeDisplay />
      {等待时间数据列表.map((room) => (
        <RoomCard 
          key={room.id}
          status={room.状态}
          style={{
            left: roomPositions[room.id as keyof typeof roomPositions]?.left || '0%',
            top: roomPositions[room.id as keyof typeof roomPositions]?.top || '0%',
            transform: `translate(-50%, -50%)`
          }}
        >
          <TopSection>
            <RoomName>{room.诊室名称}</RoomName>
            <StatusBadge status={room.状态}>
              {room.状态}
            </StatusBadge>
          </TopSection>

          <WaitingTime>
            <WaitingLabel>预计等待</WaitingLabel>
            <TimeRow>
              <TimeValue>{room.预计等待时间}</TimeValue>
              <TimeUnit>分钟</TimeUnit>
              <QueueInfo>（当前等待{room.排队人数}人）</QueueInfo>
            </TimeRow>
          </WaitingTime>
        </RoomCard>
      ))}
    </Container>
  );
};

export default PatientPerspective; 