import React from 'react';
import { Card, Row, Col } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';

interface PeakAnalysisProps {
  dateRange: [Date | null, Date | null];
}

// 模拟数据
const mockData = {
  peakFlow: [
    { time: '08:00', flow: 25, wait: 15 },
    { time: '09:00', flow: 45, wait: 25 },
    { time: '10:00', flow: 65, wait: 35 },
    { time: '11:00', flow: 55, wait: 30 },
    { time: '14:00', flow: 40, wait: 20 },
    { time: '15:00', flow: 50, wait: 28 },
    { time: '16:00', flow: 35, wait: 18 },
    { time: '17:00', flow: 20, wait: 10 }
  ],
  bottleneck: [
    { department: '心电图室', congestion: 85 },
    { department: '超声科室', congestion: 92 },
    { department: 'CT室', congestion: 78 },
    { department: '采血室', congestion: 88 }
  ]
};

const cardStyle = {
  background: ANALYTICS_THEME.cardBg,
  border: ANALYTICS_THEME.border,
  borderRadius: '8px',
  marginBottom: '16px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
};

export default function PeakAnalysis({ dateRange }: PeakAnalysisProps) {
  // 高峰期客流量与等待时间分析图表配置
  const peakFlowChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: ANALYTICS_THEME.border,
      textStyle: {
        color: ANALYTICS_THEME.text.primary
      }
    },
    legend: {
      data: ['客流量', '等待时间'],
      textStyle: {
        color: ANALYTICS_THEME.text.primary
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
      data: mockData.peakFlow.map(item => item.time),
      axisLabel: {
        color: ANALYTICS_THEME.text.primary
      },
      axisLine: {
        lineStyle: {
          color: ANALYTICS_THEME.border
        }
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '客流量',
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
      {
        type: 'value',
        name: '等待时间(分钟)',
        nameTextStyle: {
          color: ANALYTICS_THEME.text.secondary
        },
        axisLabel: {
          color: ANALYTICS_THEME.text.primary
        },
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: ANALYTICS_THEME.border
          }
        }
      }
    ],
    series: [
      {
        name: '客流量',
        type: 'bar',
        data: mockData.peakFlow.map(item => ({
          value: item.flow,
          itemStyle: {
            color: ANALYTICS_THEME.chart.primary,
            borderRadius: [6, 6, 0, 0]
          }
        }))
      },
      {
        name: '等待时间',
        type: 'line',
        yAxisIndex: 1,
        data: mockData.peakFlow.map(item => ({
          value: item.wait,
          itemStyle: {
            color: ANALYTICS_THEME.chart.warning
          }
        })),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3
        }
      }
    ]
  };

  // 瓶颈科室拥堵程度图表配置
  const bottleneckChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: ANALYTICS_THEME.border,
      textStyle: {
        color: ANALYTICS_THEME.text.primary
      }
    },
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 5,
        radius: '90%',
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, ANALYTICS_THEME.chart.success],
              [0.7, ANALYTICS_THEME.chart.warning],
              [1, ANALYTICS_THEME.chart.error]
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: ANALYTICS_THEME.text.primary
          }
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: ANALYTICS_THEME.text.primary,
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: ANALYTICS_THEME.text.primary,
            width: 2
          }
        },
        axisLabel: {
          color: ANALYTICS_THEME.text.primary,
          distance: -40,
          fontSize: 12
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: ANALYTICS_THEME.text.primary,
          fontSize: 24,
          fontWeight: 500,
          offsetCenter: [0, '70%']
        },
        data: mockData.bottleneck.map(item => ({
          value: item.congestion,
          name: item.department,
          title: {
            color: ANALYTICS_THEME.text.primary
          }
        }))
      }
    ]
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={16}>
          <Card 
            title="高峰期客流量与等待时间分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={peakFlowChartOption} style={{ height: '400px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="瓶颈科室拥堵程度" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={bottleneckChartOption} style={{ height: '400px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 