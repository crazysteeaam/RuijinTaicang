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

export default function RealtimeProcessAnalysis({ dateRange }: ProcessAnalysisProps) {
  // 关键指标数据
  const metrics = {
    processingRate: 8,  // 当前每分钟处理人数
    waitingCount: 25,   // 当前等待人数
    avgProcessTime: 45, // 当前平均处理时间
    avgWaitTime: 15,    // 当前平均等待时间
    utilization: 85,    // 当前系统利用率
  };

  // 时间分布图表配置
  const timeBreakdownChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}分钟 ({d}%)'
    },
    legend: {
      bottom: 0,
      left: 'center',
      textStyle: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: ANALYTICS_THEME.background,
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {c}分钟',
          color: ANALYTICS_THEME.text.primary
        },
        data: [
          { value: 25, name: '检查时间' },
          { value: 15, name: '等待时间' },
          { value: 5, name: '登记时间' }
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

  // 流程状态分析图表配置
  const processStatusChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['当前人数', '已完成人数', '等待人数'],
      bottom: 0,
      left: 'center',
      textStyle: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    grid: {
      top: 30,
      right: 20,
      bottom: 50,
      left: 60
    },
    xAxis: {
      type: 'category',
      data: ['登记', '抽血', '心电图', '超声', 'CT', '内科', '外科', '眼科', '五官科', '总检'],
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary,
        interval: 0,
        rotate: 30
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
        name: '当前人数',
        type: 'bar',
        stack: 'total',
        data: [15, 20, 12, 18, 8, 10, 6, 5, 4, 12],
        itemStyle: { color: ANALYTICS_THEME.chart.primary }
      },
      {
        name: '已完成人数',
        type: 'bar',
        stack: 'total',
        data: [85, 75, 68, 62, 52, 45, 38, 32, 28, 68],
        itemStyle: { color: ANALYTICS_THEME.chart.success }
      },
      {
        name: '等待人数',
        type: 'bar',
        stack: 'total',
        data: [25, 30, 15, 22, 10, 8, 5, 4, 3, 15],
        itemStyle: { color: ANALYTICS_THEME.chart.warning }
      }
    ]
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={8}>
          <MetricCard>
            <MetricTitle>当前处理速率</MetricTitle>
            <MetricValue>{metrics.processingRate}<MetricUnit>人/分钟</MetricUnit></MetricValue>
          </MetricCard>
        </Col>
        <Col span={8}>
          <MetricCard>
            <MetricTitle>当前等待人数</MetricTitle>
            <MetricValue>{metrics.waitingCount}<MetricUnit>人</MetricUnit></MetricValue>
          </MetricCard>
        </Col>
        <Col span={8}>
          <MetricCard>
            <MetricTitle>当前系统利用率</MetricTitle>
            <MetricValue>{metrics.utilization}<MetricUnit>%</MetricUnit></MetricValue>
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
            title="等待时间分析" 
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

      <Row gutter={16}>
        <Col span={24}>
          <Card 
            title="流程状态分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={processStatusChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 