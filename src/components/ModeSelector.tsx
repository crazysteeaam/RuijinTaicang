import { Space } from 'antd';
import { HistoryOutlined, PlayCircleOutlined, ExperimentOutlined, LineChartOutlined } from '@ant-design/icons';

interface ModeSelectorProps {
  currentMode: 'trace' | 'realtime' | 'simulate' | 'optimize';
  onModeChange: (mode: 'trace' | 'realtime' | 'simulate' | 'optimize') => void;
}

export default function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <Space size={0} style={{
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderRadius: '32px',
      padding: '4px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
    }}>
      <div
        onClick={() => onModeChange('trace')}
        style={{
          padding: '8px 24px',
          borderRadius: '28px',
          cursor: 'pointer',
          background: currentMode === 'trace' ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s'
        }}
      >
        <HistoryOutlined />
        <span>追溯</span>
      </div>
      <div
        onClick={() => onModeChange('realtime')}
        style={{
          padding: '8px 24px',
          borderRadius: '28px',
          cursor: 'pointer',
          background: currentMode === 'realtime' ? '#1890ff' : 'transparent',
          color: currentMode === 'realtime' ? '#fff' : 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s'
        }}
      >
        <LineChartOutlined />
        <span>实时</span>
      </div>
      <div
        onClick={() => onModeChange('simulate')}
        style={{
          padding: '8px 24px',
          borderRadius: '28px',
          cursor: 'pointer',
          background: currentMode === 'simulate' ? '#1890ff' : 'transparent',
          color: currentMode === 'simulate' ? '#fff' : 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s'
        }}
      >
        <PlayCircleOutlined />
        <span>推演</span>
      </div>
      <div
        onClick={() => onModeChange('optimize')}
        style={{
          padding: '8px 24px',
          borderRadius: '28px',
          cursor: 'pointer',
          background: currentMode === 'optimize' ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s'
        }}
      >
        <ExperimentOutlined />
        <span>决策</span>
      </div>
    </Space>
  );
} 