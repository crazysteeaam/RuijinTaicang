import React from 'react';
import { Card, Row, Col } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';

interface LayoutAnalysisProps {
  dateRange: [Date | null, Date | null];
}

// 模拟数据
const mockData = {
  waitingAreaUsage: [
    { time: '08:00', count: 15, capacity: 50 },
    { time: '09:00', count: 35, capacity: 50 },
    { time: '10:00', count: 48, capacity: 50 },
    { time: '11:00', count: 42, capacity: 50 },
    { time: '14:00', count: 38, capacity: 50 },
    { time: '15:00', count: 45, capacity: 50 },
    { time: '16:00', count: 30, capacity: 50 },
    { time: '17:00', count: 20, capacity: 50 }
  ],
  movementEfficiency: [
    { path: '签到→抽血', distance: 30, time: 2.5 },
    { path: '抽血→心电图', distance: 45, time: 3.5 },
    { path: '心电图→超声', distance: 60, time: 4.5 },
    { path: '超声→CT', distance: 80, time: 6.0 },
    { path: 'CT→总检', distance: 50, time: 4.0 }
  ],
  spaceUtilization: [
    { area: '签到大厅', utilization: 85 },
    { area: '抽血候诊区', utilization: 92 },
    { area: '心电图候诊区', utilization: 78 },
    { area: '超声候诊区', utilization: 88 },
    { area: 'CT候诊区', utilization: 75 },
    { area: '总检区', utilization: 70 }
  ]
};

const cardStyle = {
  background: ANALYTICS_THEME.cardBg,
  border: ANALYTICS_THEME.border,
  borderRadius: '8px',
  marginBottom: '16px'
};

export default function LayoutAnalysis({ dateRange }: LayoutAnalysisProps) {
  // 候诊区使用率图表配置
  const waitingAreaChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['实际人数', '容量'],
      textStyle: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    grid: {
      top: 50,
      right: 20,
      bottom: 30,
      left: 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.waitingAreaUsage.map(item => item.time),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    yAxis: {
      type: 'value',
      name: '人数',
      nameTextStyle: {
        color: ANALYTICS_THEME.text.secondary
      },
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: '实际人数',
        type: 'bar',
        data: mockData.waitingAreaUsage.map(item => ({
          value: item.count,
          itemStyle: {
            color: item.count > item.capacity * 0.9 
              ? ANALYTICS_THEME.chart.error
              : item.count > item.capacity * 0.7
                ? ANALYTICS_THEME.chart.warning
                : ANALYTICS_THEME.chart.success
          }
        }))
      },
      {
        name: '容量',
        type: 'line',
        data: mockData.waitingAreaUsage.map(item => ({
          value: item.capacity,
          itemStyle: {
            color: ANALYTICS_THEME.text.secondary
          }
        })),
        lineStyle: {
          type: 'dashed'
        }
      }
    ]
  };

  // 动线效率图表配置
  const movementChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['距离(米)', '时间(分钟)'],
      textStyle: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    grid: {
      top: 50,
      right: 20,
      bottom: 30,
      left: 100,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: mockData.movementEfficiency.map(item => item.path),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    series: [
      {
        name: '距离(米)',
        type: 'bar',
        data: mockData.movementEfficiency.map(item => ({
          value: item.distance,
          itemStyle: {
            color: ANALYTICS_THEME.chart.primary
          }
        }))
      },
      {
        name: '时间(分钟)',
        type: 'bar',
        data: mockData.movementEfficiency.map(item => ({
          value: item.time * 20, // 缩放时间以便于在同一图表显示
          itemStyle: {
            color: ANALYTICS_THEME.chart.warning
          }
        }))
      }
    ]
  };

  // 空间利用率图表配置
  const spaceUtilizationChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    series: [
      {
        type: 'treemap',
        data: mockData.spaceUtilization.map(item => ({
          name: item.area,
          value: item.utilization,
          itemStyle: {
            color: item.utilization > 90 
              ? ANALYTICS_THEME.chart.error 
              : item.utilization > 80 
                ? ANALYTICS_THEME.chart.warning 
                : ANALYTICS_THEME.chart.success
          }
        })),
        label: {
          show: true,
          formatter: '{b}\n{c}%',
          color: ANALYTICS_THEME.text.primary
        }
      }
    ]
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card 
            title="候诊区使用率分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={waitingAreaChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="动线效率分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={movementChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card 
            title="空间利用热力图" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={spaceUtilizationChartOption} style={{ height: '400px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 