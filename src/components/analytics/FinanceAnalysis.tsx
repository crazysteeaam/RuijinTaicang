import React from 'react';
import { Card, Row, Col } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';

interface FinanceAnalysisProps {
  dateRange: [Date | null, Date | null];
}

// 模拟数据
const mockData = {
  packageRevenue: [
    { name: '标准套餐A', value: 450000 },
    { name: '标准套餐B', value: 320000 },
    { name: '高端套餐A', value: 280000 },
    { name: '高端套餐B', value: 220000 },
    { name: '特需套餐', value: 180000 }
  ],
  additionalItems: [
    { name: '心脏彩超', value: 85000 },
    { name: '肝胆彩超', value: 65000 },
    { name: '乳腺彩超', value: 45000 },
    { name: '甲状腺彩超', value: 35000 }
  ],
  costBenefit: [
    { department: '心电图室', cost: 150000, revenue: 280000 },
    { department: '超声科室', cost: 220000, revenue: 450000 },
    { department: 'CT室', cost: 350000, revenue: 580000 },
    { department: '采血室', cost: 120000, revenue: 180000 }
  ]
};

const cardStyle = {
  background: ANALYTICS_THEME.cardBg,
  border: ANALYTICS_THEME.border,
  borderRadius: '8px',
  marginBottom: '16px'
};

export default function FinanceAnalysis({ dateRange }: FinanceAnalysisProps) {
  // 套餐收入分布图表配置
  const packageRevenueChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: ANALYTICS_THEME.background,
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: mockData.packageRevenue.map(item => ({
          name: item.name,
          value: item.value
        }))
      }
    ]
  };

  // 增补项目收入图表配置
  const additionalItemsChartOption = {
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
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary,
        formatter: '{value} 元'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: mockData.additionalItems.map(item => item.name),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    series: [
      {
        type: 'bar',
        data: mockData.additionalItems.map(item => ({
          value: item.value,
          itemStyle: {
            color: ANALYTICS_THEME.chart.primary
          }
        }))
      }
    ]
  };

  // 成本效益分析图表配置
  const costBenefitChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['成本', '收入'],
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
      data: mockData.costBenefit.map(item => item.department),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary,
        formatter: '{value} 元'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: '成本',
        type: 'bar',
        stack: 'total',
        data: mockData.costBenefit.map(item => ({
          value: item.cost,
          itemStyle: {
            color: ANALYTICS_THEME.chart.error
          }
        }))
      },
      {
        name: '收入',
        type: 'bar',
        stack: 'total',
        data: mockData.costBenefit.map(item => ({
          value: item.revenue,
          itemStyle: {
            color: ANALYTICS_THEME.chart.success
          }
        }))
      }
    ]
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card 
            title="套餐收入分布" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={packageRevenueChartOption} style={{ height: '400px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="增补项目收入" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={additionalItemsChartOption} style={{ height: '400px' }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card 
            title="科室成本效益分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={costBenefitChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 