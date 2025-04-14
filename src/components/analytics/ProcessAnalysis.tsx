import React from 'react';
import { Card, Row, Col } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';

interface ProcessAnalysisProps {
  dateRange: [Date | null, Date | null];
}

// 模拟数据
const mockData = {
  averageTime: {
    total: 180,
    breakdown: [
      { stage: '签到', time: 5 },
      { stage: '抽血', time: 15 },
      { stage: '心电图', time: 20 },
      { stage: '超声', time: 30 },
      { stage: 'CT', time: 25 },
      { stage: '总检', time: 15 }
    ]
  },
  waitingTime: [
    { time: '08:00', wait: 10 },
    { time: '09:00', wait: 25 },
    { time: '10:00', wait: 35 },
    { time: '11:00', wait: 20 },
    { time: '14:00', wait: 15 },
    { time: '15:00', wait: 30 },
    { time: '16:00', wait: 15 },
    { time: '17:00', wait: 5 }
  ],
  utilization: [
    { time: '08:00', rate: 65 },
    { time: '09:00', rate: 85 },
    { time: '10:00', rate: 95 },
    { time: '11:00', rate: 80 },
    { time: '14:00', rate: 75 },
    { time: '15:00', rate: 90 },
    { time: '16:00', rate: 70 },
    { time: '17:00', rate: 50 }
  ]
};

const cardStyle = {
  background: ANALYTICS_THEME.cardBg,
  border: ANALYTICS_THEME.border,
  borderRadius: '8px',
  marginBottom: '16px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
};

export default function ProcessAnalysis({ dateRange }: ProcessAnalysisProps) {
  // 平均体检时长图表配置
  const timeBreakdownChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}分钟',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: ANALYTICS_THEME.border,
      textStyle: {
        color: ANALYTICS_THEME.text.primary
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}\n{c}分钟',
          color: ANALYTICS_THEME.text.primary
        },
        data: mockData.averageTime.breakdown.map(item => ({
          name: item.stage,
          value: item.time,
          itemStyle: {
            color: ANALYTICS_THEME.chart.primary
          }
        }))
      }
    ]
  };

  // 等待时间分析图表配置
  const waitingTimeChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: ANALYTICS_THEME.border,
      textStyle: {
        color: ANALYTICS_THEME.text.primary
      }
    },
    grid: {
      top: 30,
      right: 20,
      bottom: 30,
      left: 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.waitingTime.map(item => item.time),
      axisLabel: {
        color: ANALYTICS_THEME.text.primary
      },
      axisLine: {
        lineStyle: {
          color: ANALYTICS_THEME.border
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '等待时间(分钟)',
      nameTextStyle: {
        color: ANALYTICS_THEME.text.secondary
      },
      axisLabel: {
        color: ANALYTICS_THEME.text.primary
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      axisLine: {
        lineStyle: {
          color: ANALYTICS_THEME.border
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: mockData.waitingTime.map(item => ({
          value: item.wait,
          itemStyle: {
            color: item.wait > 30 
              ? ANALYTICS_THEME.chart.error 
              : item.wait > 20 
                ? ANALYTICS_THEME.chart.warning 
                : ANALYTICS_THEME.chart.success,
            borderRadius: [6, 6, 0, 0]
          }
        }))
      }
    ]
  };

  // 项目利用率图表配置
  const utilizationChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: ANALYTICS_THEME.border,
      textStyle: {
        color: ANALYTICS_THEME.text.primary
      }
    },
    grid: {
      top: 30,
      right: 20,
      bottom: 30,
      left: 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.utilization.map(item => item.time),
      axisLabel: {
        color: ANALYTICS_THEME.text.primary
      },
      axisLine: {
        lineStyle: {
          color: ANALYTICS_THEME.border
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '利用率(%)',
      max: 100,
      nameTextStyle: {
        color: ANALYTICS_THEME.text.secondary
      },
      axisLabel: {
        color: ANALYTICS_THEME.text.primary,
        formatter: '{value}%'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      axisLine: {
        lineStyle: {
          color: ANALYTICS_THEME.border
        }
      }
    },
    series: [
      {
        type: 'line',
        data: mockData.utilization.map(item => ({
          value: item.rate,
          itemStyle: {
            color: ANALYTICS_THEME.chart.primary
          }
        })),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: ANALYTICS_THEME.chart.primary + '20'
            }, {
              offset: 1,
              color: ANALYTICS_THEME.chart.primary + '05'
            }]
          }
        }
      }
    ]
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card 
            title="平均体检时长分布" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <span style={{ 
                fontSize: '32px', 
                color: ANALYTICS_THEME.text.primary,
                fontWeight: 500
              }}>
                {mockData.averageTime.total}
              </span>
              <span style={{ 
                fontSize: '16px',
                color: ANALYTICS_THEME.text.secondary,
                marginLeft: '8px'
              }}>
                分钟
              </span>
            </div>
            <ReactECharts option={timeBreakdownChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="等待时间分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={waitingTimeChartOption} style={{ height: '350px' }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card 
            title="项目利用率" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={utilizationChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 