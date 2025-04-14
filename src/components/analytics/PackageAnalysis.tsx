import React from 'react';
import { Card, Row, Col } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';

interface PackageAnalysisProps {
  dateRange: [Date | null, Date | null];
}

// 模拟数据
const mockData = {
  projectFrequency: [
    { name: '心电图', frequency: 95, category: 'high' },
    { name: '血常规', frequency: 92, category: 'high' },
    { name: '肝功能', frequency: 88, category: 'high' },
    { name: '胸部CT', frequency: 75, category: 'medium' },
    { name: '甲状腺彩超', frequency: 65, category: 'medium' },
    { name: '乳腺彩超', frequency: 45, category: 'low' }
  ],
  packageImpact: [
    { package: '标准套餐A', duration: 125, efficiency: 85 },
    { package: '标准套餐B', duration: 145, efficiency: 75 },
    { package: '高端套餐A', duration: 180, efficiency: 70 },
    { package: '高端套餐B', duration: 210, efficiency: 65 }
  ],
  additionalItems: [
    { name: '心脏彩超', conversion: 35, price: 380 },
    { name: '肝胆彩超', conversion: 28, price: 320 },
    { name: '乳腺彩超', conversion: 22, price: 280 },
    { name: '甲状腺彩超', conversion: 18, price: 260 }
  ]
};

const cardStyle = {
  background: ANALYTICS_THEME.cardBg,
  border: ANALYTICS_THEME.border,
  borderRadius: '8px',
  marginBottom: '16px'
};

export default function PackageAnalysis({ dateRange }: PackageAnalysisProps) {
  // 项目频率分析图表配置
  const frequencyChartOption = {
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
      left: 100,
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
      data: mockData.projectFrequency.map(item => item.name),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    series: [
      {
        type: 'bar',
        data: mockData.projectFrequency.map(item => ({
          value: item.frequency,
          itemStyle: {
            color: item.category === 'high' 
              ? ANALYTICS_THEME.chart.success 
              : item.category === 'medium'
                ? ANALYTICS_THEME.chart.warning
                : ANALYTICS_THEME.chart.error
          }
        }))
      }
    ]
  };

  // 套餐影响分析图表配置
  const impactChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['耗时(分钟)', '效率(%)'],
      textStyle: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    grid: {
      top: 50,
      right: 20,
      bottom: 30,
      left: 80,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.packageImpact.map(item => item.package),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '耗时(分钟)',
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
      {
        type: 'value',
        name: '效率(%)',
        nameTextStyle: {
          color: ANALYTICS_THEME.text.secondary
        },
        axisLabel: {
          color: ANALYTICS_THEME.text.secondary,
          formatter: '{value}%'
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '耗时(分钟)',
        type: 'bar',
        data: mockData.packageImpact.map(item => ({
          value: item.duration,
          itemStyle: {
            color: ANALYTICS_THEME.chart.primary
          }
        }))
      },
      {
        name: '效率(%)',
        type: 'line',
        yAxisIndex: 1,
        data: mockData.packageImpact.map(item => ({
          value: item.efficiency,
          itemStyle: {
            color: ANALYTICS_THEME.chart.success
          }
        }))
      }
    ]
  };

  // 增补项目分析图表配置
  const additionalChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['转化率(%)', '价格(元)'],
      textStyle: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    grid: {
      top: 50,
      right: 20,
      bottom: 30,
      left: 80,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.additionalItems.map(item => item.name),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '转化率(%)',
        nameTextStyle: {
          color: ANALYTICS_THEME.text.secondary
        },
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
      {
        type: 'value',
        name: '价格(元)',
        nameTextStyle: {
          color: ANALYTICS_THEME.text.secondary
        },
        axisLabel: {
          color: ANALYTICS_THEME.text.secondary
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '转化率(%)',
        type: 'bar',
        data: mockData.additionalItems.map(item => ({
          value: item.conversion,
          itemStyle: {
            color: ANALYTICS_THEME.chart.primary
          }
        }))
      },
      {
        name: '价格(元)',
        type: 'line',
        yAxisIndex: 1,
        data: mockData.additionalItems.map(item => ({
          value: item.price,
          itemStyle: {
            color: ANALYTICS_THEME.chart.warning
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
            title="项目频率分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={frequencyChartOption} style={{ height: '400px' }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card 
            title="套餐影响分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={impactChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="增补项目分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={additionalChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 