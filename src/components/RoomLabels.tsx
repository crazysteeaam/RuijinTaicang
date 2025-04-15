import React, { useState } from 'react';
import { App } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import RoomConfigPanel from './RoomConfigPanel';

interface RoomLabelProps {
  rooms: Array<{
    id: string;
    name: string;
    status: 'active' | 'inactive';
  }>;
  onStatusChange?: (roomId: string, newStatus: 'active' | 'inactive') => void;
  onRoomSwap?: (roomId1: string, roomId2: string) => void;
  positions: Record<string, { x: number; y: number }>;
}

interface StyledProps {
  $isActive: boolean;
  $x?: number;
  $y?: number;
  $isDragging?: boolean;
  $isDropTarget?: boolean;
}

const LabelContainer = styled.div`
  position: relative;
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  background: transparent;
  border-radius: 8px;
  padding: 20px;
  user-select: none;
  // border: 2px solid #e8e8e8;
  
  // /* Debug grid */
  // background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
  //                   linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  // background-size: 100px 100px;
`;

const Label = styled.div<{ $isActive: boolean; $x: number; $y: number; $isDragging?: boolean; $isDropTarget?: boolean }>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${props => {
    if (props.$isDragging) return 'rgba(24, 144, 255, 0.5)';
    if (props.$isDropTarget) return '#52c41a';
    return props.$isActive ? '#1890ff' : 'rgba(0, 0, 0, 0.45)';
  }};
  border-radius: 24px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: move;
  transition: all 0.3s ease;
  min-width: 120px;
  justify-content: center;
  transform: ${props => props.$isDragging ? 'scale(1.05)' : 'none'};
  z-index: ${props => props.$isDragging ? 100 : props.$isActive ? 2 : 1};
  opacity: ${props => props.$isDragging ? 0.8 : 1};
  pointer-events: auto;
  white-space: nowrap;

  &:hover {
    transform: ${props => props.$isDragging ? 'scale(1.05)' : 'translateY(-2px)'};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const StatusDot = styled.div<StyledProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props: StyledProps) => props.$isActive ? '#52c41a' : '#8c8c8c'};
  box-shadow: 0 0 4px ${(props: StyledProps) => props.$isActive ? '#52c41a80' : 'transparent'};
  flex-shrink: 0;
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  margin-left: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const LabelText = styled.span`
  flex: 1;
  text-align: center;
  white-space: nowrap;
`;

// 默认位置配置（更新后的坐标，调整间距）
const defaultPositions: Record<string, { x: number; y: number }> = {
  // 血检区域
  'blood_1': { x: 100, y: 50 },
  'blood_2': { x: 300, y: 50 },
  'blood_3': { x: 500, y: 50 },
  
  // 检查区域第一排
  'urine_1': { x: 100, y: 150 },
  'ultrasound_male_1': { x: 300, y: 150 },
  'ultrasound_male_2': { x: 500, y: 150 },
  'ultrasound_female_1': { x: 700, y: 150 },
  'ultrasound_female_2': { x: 900, y: 150 },
  
  // 检查区域第二排
  'breathing_1': { x: 100, y: 250 },
  'ecg_male_1': { x: 300, y: 250 },
  'ecg_female_1': { x: 500, y: 250 },
  'chest_1': { x: 700, y: 250 },
  'ct_1': { x: 900, y: 250 },
  
  // 诊室区域第一排
  'internal_male_1': { x: 100, y: 350 },
  'internal_female_1': { x: 300, y: 350 },
  'surgery_male_1': { x: 500, y: 350 },
  'surgery_female_1': { x: 700, y: 350 },
  'ct_2': { x: 900, y: 350 },
  
  // 诊室区域第二排
  'eye_1': { x: 100, y: 450 },
  'eye_2': { x: 300, y: 450 },
  'eye_3': { x: 500, y: 450 },
  'ent_1': { x: 700, y: 450 },
  
  // 妇科区域
  'gynecology_1': { x: 100, y: 550 },
  'gynecology_us_1': { x: 300, y: 550 },
};

const defaultRooms = [
  { id: 'blood_1', name: '血检1', status: 'active' as const },
  { id: 'blood_2', name: '血检2', status: 'active' as const },
  { id: 'blood_3', name: '血检3', status: 'active' as const },
  { id: 'urine_1', name: '尿检', status: 'active' as const },
  { id: 'ultrasound_male_1', name: '超声检查男1', status: 'active' as const },
  { id: 'ultrasound_male_2', name: '超声检查男2', status: 'active' as const },
  { id: 'ultrasound_female_1', name: '超声检查女1', status: 'active' as const },
  { id: 'ultrasound_female_2', name: '超声检查女2', status: 'active' as const },
  { id: 'breathing_1', name: '呼气试验', status: 'active' as const },
  { id: 'ecg_male_1', name: '心电图男', status: 'active' as const },
  { id: 'ecg_female_1', name: '心电图女', status: 'active' as const },
  { id: 'chest_1', name: '胸片', status: 'active' as const },
  { id: 'internal_male_1', name: '内科男', status: 'active' as const },
  { id: 'internal_female_1', name: '内科女', status: 'active' as const },
  { id: 'surgery_male_1', name: '外科男', status: 'active' as const },
  { id: 'surgery_female_1', name: '外科女', status: 'active' as const },
  { id: 'eye_1', name: '眼科1', status: 'active' as const },
  { id: 'eye_2', name: '眼科2', status: 'active' as const },
  { id: 'eye_3', name: '眼科3', status: 'active' as const },
  { id: 'ent_1', name: '五官科', status: 'active' as const },
  { id: 'ct_1', name: 'CT检查1', status: 'active' as const },
  { id: 'ct_2', name: 'CT检查2', status: 'active' as const },
  { id: 'gynecology_1', name: '妇科检查', status: 'active' as const },
  { id: 'gynecology_us_1', name: '妇科超声', status: 'active' as const }
];

export default function RoomLabels({ rooms = defaultRooms, onStatusChange, onRoomSwap, positions = defaultPositions }: RoomLabelProps) {
  const [configVisible, setConfigVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [draggedRoom, setDraggedRoom] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [staffGroups] = useState([
    { key: '1', name: '医生组' },
    { key: '2', name: '护士组' },
    { key: '3', name: '技师组' },
    { key: '4', name: '导医组' }
  ]);

  const handleLabelClick = (e: React.MouseEvent, roomId: string, status: 'active' | 'inactive') => {
    e.stopPropagation();
    if (onStatusChange) {
      onStatusChange(roomId, status === 'active' ? 'inactive' : 'active');
    }
  };

  const handleSettingsClick = (e: React.MouseEvent, roomId: string) => {
    e.stopPropagation();
    setSelectedRoom(roomId);
    setConfigVisible(true);
  };

  const handleDragStart = (e: React.DragEvent, roomId: string) => {
    setDraggedRoom(roomId);
    e.dataTransfer.setData('text/plain', roomId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, roomId: string) => {
    e.preventDefault();
    if (draggedRoom !== roomId) {
      setDropTarget(roomId);
    }
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (e: React.DragEvent, targetRoomId: string) => {
    e.preventDefault();
    const sourceRoomId = draggedRoom;
    setDraggedRoom(null);
    setDropTarget(null);

    if (sourceRoomId && sourceRoomId !== targetRoomId && onRoomSwap) {
      onRoomSwap(sourceRoomId, targetRoomId);
    }
  };

  const handleDragEnd = () => {
    setDraggedRoom(null);
    setDropTarget(null);
  };

  const selectedRoomData = rooms.find(room => room.id === selectedRoom);

  return (
    <LabelContainer>
      {rooms.map(room => {
        // 调试日志
        console.log('Rendering room:', {
          id: room.id,
          name: room.name,
          position: positions[room.id],
          allPositions: positions
        });

        const position = positions[room.id];
        if (!position) {
          console.warn(`Missing position for room ${room.id}`);
          return null;
        }

        return (
          <Label
            key={room.id}
            $isActive={room.status === 'active'}
            $x={position.x}
            $y={position.y}
            $isDragging={draggedRoom === room.id}
            $isDropTarget={dropTarget === room.id}
            draggable
            onDragStart={(e) => handleDragStart(e, room.id)}
            onDragOver={(e) => handleDragOver(e, room.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, room.id)}
            onDragEnd={handleDragEnd}
            onClick={(e) => handleLabelClick(e, room.id, room.status)}
          >
            <StatusDot $isActive={room.status === 'active'} />
            <LabelText>{room.name}</LabelText>
            <MenuButton onClick={(e) => handleSettingsClick(e, room.id)}>
              <EllipsisOutlined style={{ color: 'white', fontSize: 16 }} />
            </MenuButton>
          </Label>
        );
      })}
      
      <App>
        <RoomConfigPanel
          visible={configVisible}
          onClose={() => setConfigVisible(false)}
          roomName={selectedRoomData?.name || ''}
          staffGroups={staffGroups}
        />
      </App>
    </LabelContainer>
  );
} 