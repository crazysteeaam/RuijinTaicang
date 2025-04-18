import React from 'react';
import { Row, Col, Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';
import styled from '@emotion/styled';

const MetricCard = styled.div`
  background: ${ANALYTICS_THEME.background};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
`;

const MetricTitle = styled.div`
  color: ${ANALYTICS_THEME.text.secondary};
  font-size: 14px;
  margin-bottom: 8px;
`;

const MetricValue = styled.div`
  color: ${ANALYTICS_THEME.text.primary};
  font-size: 24px;
  font-weight: 500;
`;

const MetricUnit = styled.span`
  color: ${ANALYTICS_THEME.text.secondary};
  font-size: 14px;
  margin-left: 4px;
`;

const cardStyle = {
  background: ANALYTICS_THEME.background,
  border: 'none',
  borderRadius: '8px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
};

interface ProcessAnalysisProps {
  dateRange?: [Date | null, Date | null];
}

export default function ProcessAnalysis({ dateRange }: ProcessAnalysisProps) {
  // 关键指标数据
  const metrics = {
    processingRate: 120,
    waitingCount: 225,
    avgProcessTime: 185,
    avgWaitTime: 32,
    utilization: 75,
    walkingTimeRatio: 70
  };

  // 时间分布图表配置
  const timeBreakdownChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}分钟 ({d}%)'
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
        data: [
          { value: 45, name: '检查时间' },
          { value: 32, name: '等待时间' },
          { value: 15, name: '走路时间' },
          { value: 8, name: '其他时间' }
        ]
      }
    ]
  };

  // 等待时间分析图表配置
  const waitingTimeChartOption = {
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
      left: 60
    },
    xAxis: {
      type: 'category',
      data: ['心电图', '超声检查', 'CT检查', '血检', '内科', '外科', '眼科', '五官科'],
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary,
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      name: '等待时间(分钟)',
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
        type: 'bar',
        data: [32, 55, 32, 28, 25, 22, 18, 20],
        itemStyle: {
          color: ANALYTICS_THEME.chart.primary
        }
      }
    ]
  };

  // 利用率图表配置
  const utilizationChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: 30,
      right: 20,
      bottom: 30,
      left: 60
    },
    xAxis: {
      type: 'category',
      data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
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
        name: '心电图',
        type: 'line',
        smooth: true,
        data: [65, 75, 85, 80, 70, 75, 82, 85, 80],
        itemStyle: { color: '#1890ff' }
      },
      {
        name: '超声检查',
        type: 'line',
        smooth: true,
        data: [60, 70, 75, 73, 65, 68, 73, 78, 75],
        itemStyle: { color: '#52c41a' }
      },
      {
        name: 'CT检查',
        type: 'line',
        smooth: true,
        data: [55, 65, 70, 68, 60, 63, 68, 72, 70],
        itemStyle: { color: '#faad14' }
      },
      {
        name: '血检',
        type: 'line',
        smooth: true,
        data: [70, 80, 90, 85, 75, 80, 88, 92, 88],
        itemStyle: { color: '#ff4d4f' }
      }
    ]
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={8}>
          <MetricCard>
            <MetricTitle>单位时间处理人数</MetricTitle>
            <MetricValue>{metrics.processingRate}<MetricUnit>人/秒</MetricUnit></MetricValue>
          </MetricCard>
        </Col>
        <Col span={8}>
          <MetricCard>
            <MetricTitle>平均等待人数</MetricTitle>
            <MetricValue>{metrics.waitingCount}<MetricUnit>人</MetricUnit></MetricValue>
          </MetricCard>
        </Col>
        <Col span={8}>
          <MetricCard>
            <MetricTitle>走路时间占比</MetricTitle>
            <MetricValue>{metrics.walkingTimeRatio}<MetricUnit>%</MetricUnit></MetricValue>
          </MetricCard>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card 
            title="体检时间分布" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={timeBreakdownChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="各科室等待时间" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={waitingTimeChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card 
            title="科室利用率趋势" 
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