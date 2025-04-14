import React, { useState } from 'react';
import { Dropdown, App } from 'antd';
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
  positions?: Record<string, { x: number; y: number }>;
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
  width: 800px;
  height: 600px;
  margin: 0 auto;
`;

const Label = styled.div<StyledProps>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: ${(props: StyledProps) => {
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
  transform: translate(-50%, -50%) ${props => props.$isDragging ? 'scale(1.05)' : ''};
  z-index: ${props => props.$isDragging ? 100 : props.$isActive ? 2 : 1};
  opacity: ${props => props.$isDragging ? 0.8 : 1};

  &:hover {
    transform: translate(-50%, -50%) ${props => props.$isDragging ? 'scale(1.05)' : 'translateY(-2px)'};
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

// 默认位置配置（更新后的坐标）
const defaultPositions: Record<string, { x: number; y: number }> = {
  '1': { x: 200, y: 100 },  // 血常规
  '2': { x: 400, y: 100 },  // 生化检验
  '3': { x: 600, y: 100 },  // 心电图
  '4': { x: 200, y: 300 },  // 超声
  '5': { x: 400, y: 300 },  // CT室
  '6': { x: 600, y: 300 },  // DR室
  '7': { x: 200, y: 500 },  // 内科
  '8': { x: 400, y: 500 },  // 外科
  '9': { x: 600, y: 500 },  // 眼科
  '10': { x: 400, y: 400 }, // 总检
};

export default function RoomLabels({ rooms, onStatusChange, onRoomSwap, positions = defaultPositions }: RoomLabelProps) {
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
      {rooms.map(room => (
        <Label
          key={room.id}
          $isActive={room.status === 'active'}
          $x={positions[room.id]?.x}
          $y={positions[room.id]?.y}
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
      ))}

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