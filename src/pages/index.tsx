import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, InputNumber, DatePicker, Slider, message } from 'antd';
import { SettingOutlined, BulbOutlined, PlayCircleOutlined, PauseCircleOutlined, UndoOutlined, ForwardOutlined } from '@ant-design/icons';
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
import HistoryMonitor from '../components/history/HistoryMonitor';
import dayjs from 'dayjs';
import styled from 'styled-components';
import HistoryDatePicker from '../components/history/HistoryDatePicker';
import HistoryAnalyticsPanel from '../components/history/HistoryAnalyticsPanel';
import TemplateConfig from '../components/TemplateConfig';

const { Content } = Layout;

type Mode = 'realtime' | 'simulate' | 'optimize' | 'history';
type ViewType = 'patient' | 'staff' | 'management';

type Room = {
  id: string;
  name: string;
  status: 'active' | 'inactive';
};

// 模拟诊室数据
const initialRooms: Room[] = [
  { id: 'blood_1', name: '血检1', status: 'active' },
  { id: 'blood_2', name: '血检2', status: 'active' },
  { id: 'blood_3', name: '血检3', status: 'active' },
  { id: 'urine_1', name: '尿检', status: 'active' },
  { id: 'ultrasound_male_1', name: '超声检查男1', status: 'active' },
  { id: 'ultrasound_male_2', name: '超声检查男2', status: 'active' },
  { id: 'ultrasound_female_1', name: '超声检查女1', status: 'active' },
  { id: 'ultrasound_female_2', name: '超声检查女2', status: 'active' },
  { id: 'breathing_1', name: '呼气试验', status: 'active' },
  { id: 'ecg_male_1', name: '心电图男', status: 'active' },
  { id: 'ecg_female_1', name: '心电图女', status: 'active' },
  { id: 'chest_1', name: '胸片', status: 'active' },
  { id: 'internal_male_1', name: '内科男', status: 'active' },
  { id: 'internal_female_1', name: '内科女', status: 'active' },
  { id: 'surgery_male_1', name: '外科男', status: 'active' },
  { id: 'surgery_female_1', name: '外科女', status: 'active' },
  { id: 'eye_1', name: '眼科1', status: 'active' },
  { id: 'eye_2', name: '眼科2', status: 'active' },
  { id: 'eye_3', name: '眼科3', status: 'active' },
  { id: 'ent_1', name: '五官科', status: 'active' },
  { id: 'ct_1', name: 'CT检查1', status: 'active' },
  { id: 'ct_2', name: 'CT检查2', status: 'active' },
  { id: 'gynecology_1', name: '妇科检查', status: 'active' },
  { id: 'gynecology_us_1', name: '妇科超声', status: 'active' }
];

const defaultPositions = {
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
  'gynecology_us_1': { x: 300, y: 550 }, // 总检
};

const LeftSidebar = styled.div<{ visible: boolean }>`
  position: fixed;
  left: 16px;
  top: 80px;
  z-index: 100;
  opacity: ${props => props.visible ? 1 : 0};
  pointer-events: ${props => props.visible ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
`;

export default function Home() {
  const [currentMode, setCurrentMode] = useState<Mode>('simulate');
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [configVisible, setConfigVisible] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('patient');
  const [selectedHistoryDate, setSelectedHistoryDate] = useState<dayjs.Dayjs | null>(null);
  const [historyProgress, setHistoryProgress] = useState(0);
  const [historyAnalyticsVisible, setHistoryAnalyticsVisible] = useState(false);
  const [simulationConfig, setSimulationConfig] = useState({
    speed: 1000,
    startTime: '2024-04-25 16:00:12',
    duration: 24000
  });
  const templateConfigRef = useRef<React.ElementRef<typeof TemplateConfig>>(null);

  useEffect(() => {
    document.title = '瑞金太仓健康管理';
  }, []);

  const handleModeChange = (mode: Mode) => {
    setCurrentMode(mode);
  };

  const handleRoomStatusChange = (roomId: string, newStatus: 'active' | 'inactive') => {
    console.log('Changing status for room:', roomId, 'to:', newStatus);
    setRooms(prevRooms => prevRooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
  };

  const handleRoomSwap = (roomId1: string, roomId2: string) => {
    console.log('Swapping rooms:', roomId1, roomId2);
    setRooms(prevRooms => {
      const room1 = prevRooms.find(r => r.id === roomId1);
      const room2 = prevRooms.find(r => r.id === roomId2);
      
      if (!room1 || !room2) {
        console.warn('Room not found:', !room1 ? roomId1 : roomId2);
        return prevRooms;
      }

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

  const handleHistoryDateChange = (date: dayjs.Dayjs | null) => {
    console.log('Selected date:', date);
    // TODO: 处理历史数据加载
  };

  const handleHistoryDateApply = (date: dayjs.Dayjs) => {
    setSelectedHistoryDate(date);
  };

  const handleHistorySync = (date: dayjs.Dayjs) => {
    console.log('handleHistorySync - start with date:', date.format('YYYY-MM-DD HH:mm:ss'));
    
    if (!templateConfigRef.current) {
      console.error('handleHistorySync - templateConfigRef is not available');
      message.error('模版配置组件未初始化');
      return;
    }

    // 更新模拟配置
    const newConfig = {
      speed: 1000,
      startTime: date.format('YYYY-MM-DD HH:mm:ss'),
      duration: 28800 // 默认8小时
    };
    console.log('handleHistorySync - created newConfig:', newConfig);

    try {
      // 创建模版
      console.log('handleHistorySync - attempting to create template...');
      const templateName = templateConfigRef.current.addTemplateFromHistory(
        date.format('YYYY-MM-DD'),
        newConfig
      );
      console.log('handleHistorySync - template creation result:', templateName);

      if (templateName) {
        // 更新配置并切换到推演模式
        setSimulationConfig(newConfig);
        console.log('handleHistorySync - updated simulation config');
        
        setCurrentMode('simulate');
        console.log('handleHistorySync - switched to simulate mode');
        
        message.success(`已同步参数到推演模式并应用模版：${templateName}`);
      } else {
        console.error('handleHistorySync - template creation returned null');
        message.error('模版创建失败');
      }
    } catch (error) {
      console.error('handleHistorySync - Error during template creation:', error);
      message.error('同步参数失败');
    }
  };

  const handleApplyTemplate = (config: typeof simulationConfig) => {
    setSimulationConfig(config);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Content style={{ position: 'relative', overflow: 'hidden' }}>
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
          {/* 控制按钮组 */}
          {currentMode === 'history' && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '12px 16px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              minWidth: '360px'
            }}>
              {selectedHistoryDate && (
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '4px',
                  textAlign: 'center'
                }}>
                  当前回溯日期：{selectedHistoryDate.format('YYYY-MM-DD')}
                </div>
              )}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button 
                  type="primary" 
                  icon={<PlayCircleOutlined />} 
                  style={{ flex: 1 }}
                  disabled={!selectedHistoryDate}
                >
                  回溯
                </Button>
                <Button 
                  icon={<PauseCircleOutlined />} 
                  style={{ flex: 1 }}
                  disabled={!selectedHistoryDate}
                >
                  暂停
                </Button>
                <Button 
                  icon={<UndoOutlined />} 
                  style={{ flex: 1 }}
                  disabled={!selectedHistoryDate}
                >
                  重置
                </Button>
                <Button 
                  icon={<ForwardOutlined />} 
                  style={{ flex: 1 }}
                  disabled={!selectedHistoryDate}
                >
                  跳过动画
                </Button>
              </div>
            </div>
          )}
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
          {/* 始终渲染 TemplateConfig，但使用 CSS 控制显示/隐藏 */}
          <div style={{ display: currentMode === 'simulate' ? 'block' : 'none' }}>
            <TemplateConfig 
              ref={templateConfigRef}
              currentConfig={simulationConfig}
              onApplyTemplate={handleApplyTemplate}
            />
          </div>

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
                      value={simulationConfig.speed}
                      onChange={(value) => setSimulationConfig(prev => ({ ...prev, speed: value || 1000 }))}
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
                      value={dayjs(simulationConfig.startTime)}
                      onChange={(date) => setSimulationConfig(prev => ({ 
                        ...prev, 
                        startTime: date?.format('YYYY-MM-DD HH:mm:ss') || prev.startTime 
                      }))}
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
                      value={simulationConfig.duration}
                      onChange={(value) => setSimulationConfig(prev => ({ ...prev, duration: value || 24000 }))}
                    />
                  </div>
                </div>
                {/* <h3 style={{ 
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
                </h3> */}
                {/* <div style={{ 
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
                </div> */}
              </div>
            </>
          )}
          {currentMode === 'optimize' && (
            <DecisionConfig />
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
        ) : currentMode === 'history' ? (
          <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 100 }}>
            <HistoryMonitor 
              onShowAnalytics={() => setHistoryAnalyticsVisible(true)}
            />
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
                positions={defaultPositions}
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

        <LeftSidebar visible={currentMode === 'history'}>
          <HistoryDatePicker 
            onDateChange={handleHistoryDateChange} 
            onApplyDate={handleHistoryDateApply}
            onSwitchToSimulate={(date) => {
              handleHistorySync(date);
            }}
          />
        </LeftSidebar>

        {/* 底部进度条 */}
        {currentMode === 'history' && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
            zIndex: 1000
          }}>
            <span style={{ fontSize: '12px', color: '#666', minWidth: '40px' }}>
              07:30
            </span>
            <Slider
              value={historyProgress}
              onChange={setHistoryProgress}
              style={{ flex: 1 }}
              disabled={!selectedHistoryDate}
              tooltip={{
                formatter: (value?: number) => {
                  if (typeof value !== 'number') return '';
                  // 计算当前时间
                  const startMinutes = 7 * 60 + 30; // 7:30
                  const endMinutes = 16 * 60 + 30;  // 16:30
                  const totalMinutes = endMinutes - startMinutes;
                  const currentMinutes = startMinutes + (totalMinutes * value / 100);
                  const hours = Math.floor(currentMinutes / 60);
                  const minutes = Math.floor(currentMinutes % 60);
                  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                }
              }}
            />
            <span style={{ fontSize: '12px', color: '#666', minWidth: '40px' }}>
              16:30
            </span>
          </div>
        )}

        {/* 历史数据分析面板 */}
        <HistoryAnalyticsPanel
          visible={historyAnalyticsVisible}
          onClose={() => setHistoryAnalyticsVisible(false)}
        />
      </Content>
    </Layout>
  );
}
