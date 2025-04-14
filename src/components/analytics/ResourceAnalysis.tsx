import React from 'react';
import { Card, Row, Col } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';

interface ResourceAnalysisProps {
  dateRange: [Date | null, Date | null];
}

// 模拟数据
const mockData = {
  equipmentUtilization: [
    { equipment: '心电图机1号', utilization: 85, status: 'high' },
    { equipment: '心电图机2号', utilization: 75, status: 'medium' },
    { equipment: '超声1号', utilization: 92, status: 'high' },
    { equipment: '超声2号', utilization: 88, status: 'high' },
    { equipment: 'CT设备', utilization: 78, status: 'medium' },
    { equipment: '采血台1号', utilization: 95, status: 'high' },
    { equipment: '采血台2号', utilization: 82, status: 'high' }
  ],
  staffWorkload: [
    { staff: '心电图室', workload: 88, status: 'normal' },
    { staff: '超声科室', workload: 95, status: 'overload' },
    { staff: 'CT室', workload: 75, status: 'normal' },
    { staff: '采血室', workload: 92, status: 'overload' }
  ]
};

const cardStyle = {
  background: ANALYTICS_THEME.cardBg,
  border: ANALYTICS_THEME.border,
  borderRadius: '8px',
  marginBottom: '16px'
};

export default function ResourceAnalysis({ dateRange }: ResourceAnalysisProps) {
  // 设备利用率图表配置
  const equipmentChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: 30,
      right: 20,
      bottom: 30,
      left: 120,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary,
        formatter: '{value}%'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: mockData.equipmentUtilization.map(item => item.equipment),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    series: [
      {
        type: 'bar',
        data: mockData.equipmentUtilization.map(item => ({
          value: item.utilization,
          itemStyle: {
            color: item.utilization > 90 
              ? ANALYTICS_THEME.chart.error 
              : item.utilization > 80 
                ? ANALYTICS_THEME.chart.warning 
                : ANALYTICS_THEME.chart.success
          }
        }))
      }
    ]
  };

  // 人员工作负荷图表配置
  const staffChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: 30,
      right: 20,
      bottom: 30,
      left: 80,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.staffWorkload.map(item => item.staff),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary,
        formatter: '{value}%'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: mockData.staffWorkload.map(item => ({
          value: item.workload,
          itemStyle: {
            color: item.workload > 90 
              ? ANALYTICS_THEME.chart.error 
              : item.workload > 80 
                ? ANALYTICS_THEME.chart.warning 
                : ANALYTICS_THEME.chart.success
          }
        }))
      }
    ]
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Card 
            title="设备利用率分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={equipmentChartOption} style={{ height: '400px' }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card 
            title="人员工作负荷分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={staffChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 