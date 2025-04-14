import React from 'react';
import { Modal, Button, Space } from 'antd';
import { SettingOutlined, ExportOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 16px 24px;
  text-align: left;
  font-weight: normal;
  color: #666;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
`;

const Td = styled.td`
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
`;

const TimeTag = styled.span<{ status: 'normal' | 'warning' | 'danger' }>`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  
  ${props => {
    switch (props.status) {
      case 'normal':
        return 'background: #f6ffed; color: #52c41a;';
      case 'warning':
        return 'background: #fff7e6; color: #fa8c16;';
      case 'danger':
        return 'background: #fff1f0; color: #f5222d;';
      default:
        return '';
    }
  }}
`;

const ActionButton = styled(Button)`
  padding: 4px 8px;
  height: auto;
  border: none;
  box-shadow: none;
  
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

interface HistoryPanelProps {
  visible: boolean;
  onClose: () => void;
}

const mockData = [
  {
    id: 1,
    time: '2024/11/13 13:23:11',
    name: '-',
    total: '245人',
    avgWait: '00:15:30',
    waitStatus: 'normal' as const
  },
  {
    id: 2,
    time: '2024/11/13 13:23:11',
    name: '早高峰配置',
    total: '320人',
    avgWait: '00:35:20',
    waitStatus: 'danger' as const
  },
  {
    id: 3,
    time: '2024/11/13 13:23:11',
    name: '下午测试配置',
    total: '180人',
    avgWait: '00:20:15',
    waitStatus: 'warning' as const
  }
];

export default function HistoryPanel({ visible, onClose }: HistoryPanelProps) {
  console.log('HistoryPanel rendering, visible:', visible);
  
  React.useEffect(() => {
    console.log('HistoryPanel visibility changed:', visible);
  }, [visible]);

  return (
    <Modal
      title="历史仿真记录"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      destroyOnClose
      maskClosable={true}
      centered
      style={{ top: 20 }}
    >
      <Table>
        <thead>
          <tr>
            <Th>结束时间</Th>
            <Th>备注</Th>
            <Th>总处理人数</Th>
            <Th>平均等待</Th>
            <Th>操作</Th>
          </tr>
        </thead>
        <tbody>
          {mockData.map(record => (
            <tr key={record.id}>
              <Td>{record.time}</Td>
              <Td>{record.name}</Td>
              <Td>{record.total}</Td>
              <Td>
                <TimeTag status={record.waitStatus}>
                  {record.avgWait}
                </TimeTag>
              </Td>
              <Td>
                <Space>
                  <ActionButton
                    type="text"
                    icon={<SettingOutlined />}
                  >
                    应用配置
                  </ActionButton>
                  <ActionButton
                    type="text"
                    icon={<ExportOutlined />}
                  >
                    下载结果
                  </ActionButton>
                  <ActionButton
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                  >
                    删除
                  </ActionButton>
                </Space>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Modal>
  );
} 