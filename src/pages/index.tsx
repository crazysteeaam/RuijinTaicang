import React, { useState, useEffect } from 'react';
import { Layout, Button, InputNumber, DatePicker } from 'antd';
import { SettingOutlined, BulbOutlined } from '@ant-design/icons';
import ConfigPanel from '../components/ConfigPanel';
import DataMonitor from '../components/DataMonitor';
import BackgroundImage from '../components/BackgroundImage';
import ModeSelector from '../components/ModeSelector';
import RoomLabels from '../components/RoomLabels';
import SimulationConfigPanel from '../components/SimulationConfigPanel';
import DecisionConfig from '../components/DecisionConfig';
import DecisionMonitor from '../components/DecisionMonitor';
import PatientPerspective from '../components/realtime/PatientPerspective';
import DoctorPerspective from '../components/realtime/DoctorPerspective';
import ManagementPerspective from '../components/realtime/ManagementPerspective';
import ViewSwitcher from '../components/realtime/ViewSwitcher';
import RealtimeMonitor from '../components/RealtimeMonitor';
import dayjs from 'dayjs';

const { Content } = Layout;

type Mode = 'trace' | 'realtime' | 'simulate' | 'optimize';

// 模拟诊室数据
const initialRooms = [
  { id: '1', name: '血常规', status: 'active' as const },
  { id: '2', name: '生化检验', status: 'inactive' as const },
  { id: '3', name: '心电图', status: 'active' as const },
  { id: '4', name: '超声', status: 'active' as const },
  { id: '5', name: 'CT室', status: 'active' as const },
  { id: '6', name: 'DR室', status: 'active' as const },
  { id: '7', name: '内科', status: 'active' as const },
  { id: '8', name: '外科', status: 'active' as const },
  { id: '9', name: '眼科', status: 'active' as const },
  { id: '10', name: '总检', status: 'active' as const }
];

export default function Home() {
  const [currentMode, setCurrentMode] = useState<Mode>('simulate');
  const [rooms, setRooms] = useState(initialRooms);
  const [configVisible, setConfigVisible] = useState(false);
  const [currentView, setCurrentView] = useState<'patient' | 'staff' | 'management'>('patient');

  useEffect(() => {
    document.title = '瑞金太仓健康管理';
  }, []);

  const handleModeChange = (mode: Mode) => {
    setCurrentMode(mode);
  };

  const handleRoomStatusChange = (roomId: string, newStatus: 'active' | 'inactive') => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
  };

  const handleRoomSwap = (roomId1: string, roomId2: string) => {
    setRooms(prevRooms => {
      const room1 = prevRooms.find(r => r.id === roomId1);
      const room2 = prevRooms.find(r => r.id === roomId2);
      
      if (!room1 || !room2) return prevRooms;

      return prevRooms.map(room => {
        if (room.id === roomId1) {
          return { ...room, name: room2.name };
        }
        if (room.id === roomId2) {
          return { ...room, name: room1.name };
        }
        return room;
      });
    });
  };

  const handleViewChange = (view: 'patient' | 'staff' | 'management') => {
    setCurrentView(view);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Content style={{ position: 'relative' }}>
        {/* 顶部控制栏 */}
        <div style={{
          position: 'absolute',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <ModeSelector currentMode={currentMode} onModeChange={handleModeChange} />
          {currentMode === 'simulate' && <ConfigPanel />}
        </div>

        {/* 左侧面板 */}
        <div style={{ 
          position: 'absolute', 
          left: 24, 
          top: 24, 
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {currentMode === 'simulate' && (
            <>
              <Button 
                icon={<SettingOutlined />}
                onClick={() => setConfigVisible(true)}
                style={{
                  background: 'white',
                  border: '1px solid #e8e8e8',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  height: '40px',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 11
                }}
              >
                模拟参数配置
              </Button>
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                width: 360,
                padding: '20px'
              }}>
                <h3 style={{ 
                  marginBottom: '20px',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#1f1f1f'
                }}>
                  门诊场景推演全局配置项
                </h3>
                <div style={{ 
                  marginBottom: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div>
                    <div style={{ 
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      推演速度
                    </div>
                    <InputNumber
                      style={{ width: '100%' }}
                      min={1}
                      max={10000}
                      defaultValue={1000}
                      onChange={(value) => console.log('速度:', value)}
                    />
                  </div>
                  <div>
                    <div style={{ 
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      开始时间
                    </div>
                    <DatePicker
                      showTime
                      style={{ width: '100%' }}
                      defaultValue={dayjs('2024-04-25 16:00:12')}
                      onChange={(date) => console.log('时间:', date)}
                    />
                  </div>
                  <div>
                    <div style={{ 
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      推演时长（秒）
                    </div>
                    <InputNumber
                      style={{ width: '100%' }}
                      min={1}
                      max={86400}
                      defaultValue={24000}
                      onChange={(value) => console.log('时长:', value)}
                    />
                  </div>
                </div>
                <h3 style={{ 
                  marginBottom: '16px',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#1f1f1f',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <BulbOutlined style={{ color: '#faad14' }} />
                  经营管理化建议
                </h3>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{
                    padding: '12px 16px',
                    background: '#fff7e6',
                    border: '1px solid #ffd591',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#d46b08',
                    lineHeight: '1.5'
                  }}>
                    <strong style={{ color: '#d48806' }}>区域拥堵：</strong>
                    XX区域排队拥堵过长，建议分流至XX区域，需要优化人员配置
                  </div>
                  <div style={{
                    padding: '12px 16px',
                    background: '#e6f7ff',
                    border: '1px solid #91d5ff',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#096dd9',
                    lineHeight: '1.5'
                  }}>
                    <strong style={{ color: '#0050b3' }}>流程优化：</strong>
                    XX诊室利用XX分钟就诊时间过长，建议进行流程优化
                  </div>
                </div>
              </div>
            </>
          )}
          {currentMode === 'optimize' && (
            <DecisionConfig />
          )}
          {currentMode === 'trace' && (
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              width: 360,
              padding: '20px'
            }}>
              <h3 style={{ 
                marginBottom: '20px',
                fontSize: '16px',
                fontWeight: 500,
                color: '#1f1f1f'
              }}>
                历史数据追溯
              </h3>
              {/* Add trace mode specific content here */}
            </div>
          )}
        </div>
        
        {/* 右侧数据监控 */}
        {currentMode === 'simulate' ? (
          <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 1 }}>
            <DataMonitor />
          </div>
        ) : currentMode === 'optimize' ? (
          <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 1 }}>
            <DecisionMonitor />
          </div>
        ) : currentMode === 'realtime' && currentView === 'management' ? (
          <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 100 }}>
            <RealtimeMonitor />
          </div>
        ) : currentMode === 'trace' ? (
          <div style={{
            position: 'absolute',
            top: 24,
            right: 24,
            zIndex: 1,
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: 360,
            padding: '20px'
          }}>
            <h3 style={{ 
              marginBottom: '20px',
              fontSize: '16px',
              fontWeight: 500,
              color: '#1f1f1f'
            }}>
              历史数据追溯
            </h3>
            {/* Add trace mode specific content here */}
          </div>
        ) : null}

        {/* 实时模式内容 */}
        {currentMode === 'realtime' && (
          <div style={{ 
            position: 'absolute',
            top: 100,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {currentView === 'patient' ? (
              <PatientPerspective />
            ) : currentView === 'staff' ? (
              <DoctorPerspective />
            ) : (
              <ManagementPerspective />
            )}
          </div>
        )}
        
        {/* 背景图 */}
        <div style={{ height: '100vh' }}>
          <BackgroundImage />
        </div>

        {/* 检查站标签 */}
        {currentMode !== 'realtime' && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '200px 400px',
            pointerEvents: 'none'
          }}>
            <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
              <RoomLabels 
                rooms={rooms}
                onStatusChange={handleRoomStatusChange}
                onRoomSwap={handleRoomSwap}
              />
            </div>
          </div>
        )}

        {/* 模拟参数配置面板 */}
        <SimulationConfigPanel
          visible={configVisible}
          onClose={() => setConfigVisible(false)}
        />

        {/* 视角切换器 - 仅在实时模式下显示 */}
        {currentMode === 'realtime' && (
          <ViewSwitcher 
            currentView={currentView} 
            onViewChange={handleViewChange} 
          />
        )}
      </Content>
    </Layout>
  );
}
