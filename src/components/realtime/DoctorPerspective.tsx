import React from 'react';
import styled from '@emotion/styled';
import { 诊室状态数据 } from '../../mock/realtimeData';
import TimeDisplay from './TimeDisplay';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 800px;
  min-width: 1200px;
  background: transparent;
`;

const RoomCard = styled.div<{ status: string }>`
  position: absolute;
  width: 280px;
  height: 120px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoomName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1f1f1f;
`;

const PatientInfo = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: 4px;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CountRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const CountGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const CountNumber = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #1890ff;
  line-height: 1;
`;

const WaitingNumber = styled(CountNumber)`
  color: #ff4d4f;
`;

const CountLabel = styled.span`
  font-size: 13px;
  color: #666;
`;

const Separator = styled.span`
  color: #d9d9d9;
  padding: 0 4px;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: ${props => {
    switch (props.status) {
      case '忙碌': return '#fff1f0';
      case '空闲': return '#f6ffed';
      case '过渡中': return '#fffbe6';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case '忙碌': return '#ff4d4f';
      case '空闲': return '#52c41a';
      case '过渡中': return '#faad14';
      default: return '#d9d9d9';
    }
  }};
`;

const roomPositions: Record<string, { left: string; top: string }> = {
  '1': { left: '15%', top: '15%' },        // 血常规
  '2': { left: '15%', top: '35%' },        // 生化检验
  '3': { left: '40%', top: '25%' },        // 心电图
  '4': { left: '40%', top: '45%' },        // 超声
  '5': { left: '40%', top: '65%' },        // CT室
  '6': { left: '65%', top: '25%' },        // DR室
  '7': { left: '65%', top: '45%' },        // 内科
  '8': { left: '65%', top: '65%' },        // 外科
  '9': { left: '85%', top: '35%' }         // 眼科
};

const DoctorPerspective: React.FC = () => {
  return (
    <Container>
      <TimeDisplay />
      {诊室状态数据.map(room => {
        const position = roomPositions[room.id];
        if (!position) return null;
        
        return (
          <RoomCard 
            key={room.id} 
            status={room.状态}
            style={{
              left: position.left,
              top: position.top,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <TopSection>
              <RoomName>{room.名称}</RoomName>
              <StatusBadge status={room.状态}>{room.状态}</StatusBadge>
            </TopSection>

            {room.当前患者 && (
              <PatientInfo>
                当前患者：{room.当前患者.姓名} ({room.当前患者.开始时间} - {room.当前患者.预计结束时间})
              </PatientInfo>
            )}

            <BottomSection>
              <CountRow>
                <CountGroup>
                  <WaitingNumber>{room.等待患者数}</WaitingNumber>
                  <CountLabel>人等待中</CountLabel>
                </CountGroup>
              </CountRow>
              <CountRow>
                <CountGroup>
                  <CountNumber>{room.已签到未检查人数}</CountNumber>
                  <CountLabel>已签到待检</CountLabel>
                </CountGroup>
                <Separator>/</Separator>
                <CountGroup>
                  <CountNumber>{room.预约未检查总人数}</CountNumber>
                  <CountLabel>总预约待检</CountLabel>
                </CountGroup>
              </CountRow>
            </BottomSection>
          </RoomCard>
        );
      })}
    </Container>
  );
};

export default DoctorPerspective; 