import React from 'react';
import { Row, Col, Card, Alert, Space, Button } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';
import styled from '@emotion/styled';
import { ArrowRightOutlined } from '@ant-design/icons';

const MetricCard = styled.div`
  padding: 16px;
  background: ${ANALYTICS_THEME.background};
  border-radius: 8px;
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

const SuggestionCard = styled.div`
  background: ${ANALYTICS_THEME.background};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid ${props => props.color};
`;

const SuggestionTitle = styled.div`
  color: ${ANALYTICS_THEME.text.primary};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const SuggestionContent = styled.div`
  color: ${ANALYTICS_THEME.text.secondary};
  font-size: 14px;
  margin-bottom: 12px;
`;

const ImpactInfo = styled.div`
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: ${ANALYTICS_THEME.text.tertiary};
  margin-top: 8px;
`;

interface OperationAnalysisProps {
  dateRange?: [Date | null, Date | null];
}

export default function RealtimeOperationAnalysis({ dateRange }: OperationAnalysisProps) {
  // 运营指标数据
  const metrics = {
    currentPatients: 85,    // 当前在检人数
    completedToday: 365,    // 今日已完成
    currentProgress: 82,    // 当前完成进度
    targetCompletion: 450   // 今日目标人数
  };

  // 运营策略建议
  const strategySuggestions = [
    {
      title: '血检室人流量预警',
      content: '当前等待患者: 15人，建议分流8人至备用采血室',
      impact: { waitTime: 12, throughput: 15 },
      targetRooms: ['备用采血室 1', '备用采血室 2'],
      severity: 'error'
    },
    {
      title: '超声检查室调配建议',
      content: '当前等待患者: 12人，建议开放午休时段检查',
      impact: { waitTime: 15, throughput: 20 },
      targetRooms: ['超声室 3', '超声室 4'],
      severity: 'warning'
    },
    {
      title: '内科诊室优化建议',
      content: '建议增加一名医生，预计可减少等待时间',
      impact: { waitTime: 8, throughput: 10 },
      targetRooms: ['内科诊室 5'],
      severity: 'info'
    }
  ];

  // 实时科室负载数据
  const departmentLoadData = [
    { name: '心电图室', value: 92, status: 'error' },
    { name: '超声检查室', value: 88, status: 'warning' },
    { name: 'CT室', value: 75, status: 'normal' },
    { name: '血检室', value: 95, status: 'error' },
    { name: '内科诊室', value: 82, status: 'warning' },
    { name: '外科诊室', value: 78, status: 'normal' },
    { name: '眼科诊室', value: 65, status: 'normal' },
    { name: '五官科诊室', value: 70, status: 'normal' }
  ];

  // 实时科室负载图表配置
  const departmentLoadChartOption = {
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
      left: 100
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
      data: departmentLoadData.map(item => item.name),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    series: [
      {
        type: 'bar',
        data: departmentLoadData.map(item => ({
          value: item.value,
          itemStyle: {
            color: item.status === 'error' ? ANALYTICS_THEME.chart.error :
                   item.status === 'warning' ? ANALYTICS_THEME.chart.warning :
                   ANALYTICS_THEME.chart.success
          }
        }))
      }
    ]
  };

  // 实时套餐分布数据
  const packageDistributionData = [
    { name: '套餐一男', value: 35, total: 120 },
    { name: '套餐一女', value: 32, total: 110 },
    { name: '套餐二男', value: 25, total: 80 },
    { name: '套餐二女', value: 22, total: 75 },
    { name: '套餐三男', value: 12, total: 35 },
    { name: '套餐三女', value: 10, total: 30 }
  ];

  // 实时套餐分布图表配置
  const packageDistributionChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}/{d}人'
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
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        data: packageDistributionData.map(item => ({
          name: item.name,
          value: item.value,
          total: item.total,
          itemStyle: {
            color: item.name.includes('一') ? ANALYTICS_THEME.chart.primary :
                   item.name.includes('二') ? ANALYTICS_THEME.chart.success :
                   ANALYTICS_THEME.chart.warning
          }
        })),
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {c}/{d}人',
          color: ANALYTICS_THEME.text.primary
        }
      }
    ]
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={6}>
          <MetricCard>
            <MetricTitle>当前在检人数</MetricTitle>
            <MetricValue>{metrics.currentPatients}<MetricUnit>人</MetricUnit></MetricValue>
          </MetricCard>
        </Col>
        <Col span={6}>
          <MetricCard>
            <MetricTitle>今日已完成</MetricTitle>
            <MetricValue>{metrics.completedToday}<MetricUnit>人</MetricUnit></MetricValue>
          </MetricCard>
        </Col>
        <Col span={6}>
          <MetricCard>
            <MetricTitle>当前完成进度</MetricTitle>
            <MetricValue>{metrics.currentProgress}<MetricUnit>%</MetricUnit></MetricValue>
          </MetricCard>
        </Col>
        <Col span={6}>
          <MetricCard>
            <MetricTitle>今日目标人数</MetricTitle>
            <MetricValue>{metrics.targetCompletion}<MetricUnit>人</MetricUnit></MetricValue>
          </MetricCard>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={12}>
          <Card 
            title="实时套餐分布" 
            style={{ background: ANALYTICS_THEME.background, border: 'none', borderRadius: '8px' }}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={packageDistributionChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="实时科室负载" 
            style={{ background: ANALYTICS_THEME.background, border: 'none', borderRadius: '8px' }}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={departmentLoadChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card
            title="运营策略建议"
            style={{ background: ANALYTICS_THEME.background, border: 'none', borderRadius: '8px' }}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {strategySuggestions.map((suggestion, index) => (
                <SuggestionCard 
                  key={index}
                  color={
                    suggestion.severity === 'error' ? ANALYTICS_THEME.chart.error :
                    suggestion.severity === 'warning' ? ANALYTICS_THEME.chart.warning :
                    ANALYTICS_THEME.chart.success
                  }
                >
                  <SuggestionTitle>{suggestion.title}</SuggestionTitle>
                  <SuggestionContent>{suggestion.content}</SuggestionContent>
                  <Space>
                    {suggestion.targetRooms.map((room, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <ArrowRightOutlined style={{ color: ANALYTICS_THEME.text.tertiary }} />}
                        <Button size="small">{room}</Button>
                      </React.Fragment>
                    ))}
                  </Space>
                  <ImpactInfo>
                    <span>⏱️ 等待时间 -{suggestion.impact.waitTime}分钟</span>
                    <span>📈 吞吐量 +{suggestion.impact.throughput}%</span>
                  </ImpactInfo>
                </SuggestionCard>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 