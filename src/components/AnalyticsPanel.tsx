import React, { useState } from 'react';
import { Drawer, Tabs, DatePicker, theme } from 'antd';
import type { TabsProps } from 'antd';
import ProcessAnalysis from './analytics/ProcessAnalysis';
import ResourceAnalysis from './analytics/ResourceAnalysis';
import PeakAnalysis from './analytics/PeakAnalysis';
import FinanceAnalysis from './analytics/FinanceAnalysis';
import PackageAnalysis from './analytics/PackageAnalysis';
import LayoutAnalysis from './analytics/LayoutAnalysis';
import OperationAnalysis from './analytics/OperationAnalysis';
import { ANALYTICS_THEME } from './analytics/theme';

const { RangePicker } = DatePicker;

interface AnalyticsPanelProps {
  visible: boolean;
  onClose: () => void;
}

// 标签页配置
const TAB_ITEMS: TabsProps['items'] = [
  {
    key: 'process',
    label: '流程分析',
    children: <ProcessAnalysis />
  },
  {
    key: 'resource',
    label: '资源利用',
    children: <ResourceAnalysis />
  },
  {
    key: 'peak',
    label: '高峰表现',
    children: <PeakAnalysis />
  },
  {
    key: 'finance',
    label: '财务分析',
    children: <FinanceAnalysis />
  },
  {
    key: 'package',
    label: '套餐优化',
    children: <PackageAnalysis />
  },
  {
    key: 'layout',
    label: '空间布局',
    children: <LayoutAnalysis />
  },
  {
    key: 'operation',
    label: '运营策略',
    children: <OperationAnalysis />
  }
];

export default function AnalyticsPanel({ visible, onClose }: AnalyticsPanelProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const { useToken } = theme;
  const { token } = useToken();

  // 根据日期范围生成标签页配置
  const getTabItems = (): TabsProps['items'] => [
    {
      key: 'process',
      label: '流程分析',
      children: <ProcessAnalysis dateRange={dateRange} />
    },
    {
      key: 'resource',
      label: '资源利用',
      children: <ResourceAnalysis dateRange={dateRange} />
    },
    {
      key: 'peak',
      label: '高峰表现',
      children: <PeakAnalysis dateRange={dateRange} />
    },
    {
      key: 'finance',
      label: '财务分析',
      children: <FinanceAnalysis dateRange={dateRange} />
    },
    {
      key: 'package',
      label: '套餐优化',
      children: <PackageAnalysis dateRange={dateRange} />
    },
    {
      key: 'layout',
      label: '空间布局',
      children: <LayoutAnalysis dateRange={dateRange} />
    },
    {
      key: 'operation',
      label: '运营策略',
      children: <OperationAnalysis dateRange={dateRange} />
    }
  ];

  return (
    <Drawer
      title="健康管理中心数据分析"
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
      extra={
        <RangePicker
          onChange={(dates) => {
            if (dates && dates[0] && dates[1]) {
              setDateRange([dates[0].toDate(), dates[1].toDate()]);
            } else {
              setDateRange([null, null]);
            }
          }}
          style={{ marginRight: 16 }}
        />
      }
    >
      <Tabs
        items={getTabItems()}
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