import React from 'react';
import { Drawer, Tabs, theme } from 'antd';
import type { TabsProps } from 'antd';
import ProcessAnalysis from '../analytics/ProcessAnalysis';
import ResourceAnalysis from '../analytics/ResourceAnalysis';
import PeakAnalysis from '../analytics/PeakAnalysis';
import LayoutAnalysis from '../analytics/LayoutAnalysis';
import OperationAnalysis from '../analytics/OperationAnalysis';
import { ANALYTICS_THEME } from '../analytics/theme';

interface HistoryAnalyticsPanelProps {
  visible: boolean;
  onClose: () => void;
}

// 标签页配置
const TAB_ITEMS: TabsProps['items'] = [
  {
    key: 'process',
    label: '流程分析',
    children: <ProcessAnalysis dateRange={[null, null]} />
  },
  {
    key: 'resource',
    label: '资源利用',
    children: <ResourceAnalysis dateRange={[null, null]} />
  },
  {
    key: 'peak',
    label: '高峰表现',
    children: <PeakAnalysis dateRange={[null, null]} />
  },
  {
    key: 'layout',
    label: '空间布局',
    children: <LayoutAnalysis dateRange={[null, null]} />
  },
  {
    key: 'operation',
    label: '运营策略',
    children: <OperationAnalysis />
  }
];

export default function HistoryAnalyticsPanel({ visible, onClose }: HistoryAnalyticsPanelProps) {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <Drawer
      title="历史数据分析"
      placement="right"
      width="80vw"
      onClose={onClose}
      open={visible}
      styles={{
        header: {
          background: ANALYTICS_THEME.background,
          borderBottom: ANALYTICS_THEME.border,
          color: ANALYTICS_THEME.text.primary,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
          fontWeight: 500
        },
        body: {
          background: token.colorBgLayout,
          padding: '16px 24px',
        },
        mask: {
          background: 'rgba(0, 0, 0, 0.25)'
        }
      }}
    >
      <Tabs
        items={TAB_ITEMS}
        type="card"
        style={{
          color: ANALYTICS_THEME.text.primary,
          background: ANALYTICS_THEME.background,
          padding: '16px',
          borderRadius: token.borderRadius,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
        }}
      />
    </Drawer>
  );
} 