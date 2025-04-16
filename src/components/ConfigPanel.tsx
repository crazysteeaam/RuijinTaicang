import { Button, Space } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined, ForwardOutlined } from '@ant-design/icons';

export default function ConfigPanel() {
  const handleSimulationControl = (action: 'start' | 'pause' | 'reset') => {
    console.log('Simulation action:', action);
  };

  return (
    <Space style={{
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderRadius: '24px',
      padding: '8px 16px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
    }}>
      <Button
        type="primary"
        icon={<PlayCircleOutlined />}
        onClick={() => handleSimulationControl('start')}
        style={{
          background: '#1890ff',
          borderColor: '#1890ff'
        }}
      >
        推演
      </Button>
      <Button
        icon={<PauseCircleOutlined />}
        onClick={() => handleSimulationControl('pause')}
      >
        暂停
      </Button>
      <Button
        icon={<ReloadOutlined />}
        onClick={() => handleSimulationControl('reset')}
      >
        重置
      </Button>
      <Button 
                  icon={<ForwardOutlined />} 
                  style={{ flex: 1 }}
                >
                  跳过动画
                </Button>
    </Space>
  );
} 