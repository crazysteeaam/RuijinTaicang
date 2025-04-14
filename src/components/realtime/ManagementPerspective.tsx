import React from 'react';
import styled from '@emotion/styled';
import { 管理者建议列表 } from '../../mock/realtimeData';
import { 管理者建议 } from '../../types/realtime';
import TimeDisplay from './TimeDisplay';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  background: transparent;
  position: relative;
`;

const RoomCard = styled.div`
  position: absolute;
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:nth-of-type(1) { left: 5%; top: 15%; }    // 血常规
  &:nth-of-type(2) { left: 15%; top: 35%; }   // 生化检验
  &:nth-of-type(3) { left: 35%; top: 25%; }   // 心电图
  &:nth-of-type(4) { left: 35%; top: 45%; }   // 超声
  &:nth-of-type(5) { left: 35%; top: 65%; }   // CT室
  &:nth-of-type(6) { left: 55%; top: 25%; }   // DR室
  &:nth-of-type(7) { left: 55%; top: 45%; }   // 内科
  &:nth-of-type(8) { left: 55%; top: 65%; }   // 外科
  &:nth-of-type(9) { left: 75%; top: 35%; }   // 眼科
  &:nth-of-type(10) { left: 75%; top: 55%; }  // 总检
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const RoomName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const UtilizationBadge = styled.span<{ utilization: number }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: ${props => {
    if (props.utilization >= 90) return '#ff4d4f';
    if (props.utilization >= 70) return '#faad14';
    return '#52c41a';
  }};
`;

const InfoSection = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;

  > div {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const SuggestionSection = styled.div`
  background: #f5f5f5;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: #666;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ImpactInfo = styled.div`
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #666;
  margin-top: 8px;
`;

const ManagementPerspective: React.FC = () => {
  return (
    <Container>
      <TimeDisplay />
      {管理者建议列表.map((room: 管理者建议) => (
        <RoomCard key={room.诊室ID}>
          <TopSection>
            <RoomName>{room.诊室名称}</RoomName>
            <UtilizationBadge utilization={room.当前利用率}>
              {room.当前利用率}%
            </UtilizationBadge>
          </TopSection>
          <InfoSection>
            <div>等待患者: {room.等待患者数}人</div>
          </InfoSection>
          {room.待分流患者数 > 0 && (
            <SuggestionSection>
              <div>建议分流: {room.待分流患者数}人</div>
              <div>目标诊室: {room.目标诊室.join(' → ')}</div>
              <ImpactInfo>
                <span>⏱️ -{room.预计影响.等待时间减少}分钟</span>
                <span>📈 +{room.预计影响.吞吐量增加}%</span>
              </ImpactInfo>
            </SuggestionSection>
          )}
        </RoomCard>
      ))}
    </Container>
  );
};

export default ManagementPerspective; 