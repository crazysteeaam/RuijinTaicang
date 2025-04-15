import React from 'react';
import { Button } from 'antd';
import { 
  HistoryOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  BulbOutlined,
  LineChartOutlined,
  TeamOutlined,
  BarChartOutlined 
} from '@ant-design/icons';
import styled from '@emotion/styled';
import ReactECharts from 'echarts-for-react';
import HistoryPanel from './HistoryPanel';
import AnalyticsPanel from './AnalyticsPanel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 450px;
  margin-left: auto;
  margin-right: 16px;
  margin-top: 2px;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const MetricCard = styled.div`
  text-align: center;
`;

const MetricTitle = styled.div`
  color: #666;
  font-size: 14px;
  font-weight: 500;
`;

const MetricValue = styled.div`
  color: #1f1f1f;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const MetricTrend = styled.div<{ isPositive: boolean }>`
  color: ${props => props.isPositive ? '#52c41a' : '#ff4d4f'};
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const ChartCard = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  background: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const DepartmentCard = styled.div`
  text-align: center;
`;

const DepartmentName = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
  font-weight: 500;
`;

const DepartmentMetric = styled.div`
  color: #1f1f1f;
  font-size: 14px;
  margin-bottom: 2px;
`;

const MetricLabel = styled.div`
  color: #999;
  font-size: 12px;
  // margin-bottom: 4px;
`;

const DepartmentMetricGroup = styled.div`
  // margin-bottom: 2px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #1f1f1f;
  margin-bottom: 3px;
  
  .anticon {
    color: #1890ff;
  }
`;

const SuggestionCard = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const SuggestionGroup = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SuggestionCategory = styled.div<{ type: 'area' | 'process' }>`
  background: ${props => props.type === 'area' ? '#fff7e6' : '#e6f7ff'};
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
  color: ${props => props.type === 'area' ? '#d46b08' : '#096dd9'};
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  position: relative;
  z-index: 1000;
  pointer-events: auto;
`;

export default function DataMonitor() {
  const [showHistory, setShowHistory] = React.useState(false);
  const [showAnalytics, setShowAnalytics] = React.useState(false);

  const utilizationChartOption = {
    grid: {
      top: 35,
      right: 20,
      bottom: 30,
      left: 40
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>{a}: {c}%'
    },
    legend: {
      data: ['心电图', '超声检查', 'CT检查', '血检'],
      top: 0,
      textStyle: {
        fontSize: 12,
        color: '#666'
      }
    },
    xAxis: {
      type: 'category',
      data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      axisLabel: {
        color: '#666',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value}%',
        color: '#666',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          color: '#eee'
        }
      }
    },
    series: [
      {
        name: '心电图',
        type: 'line',
        smooth: true,
        data: [65, 75, 85, 80, 70, 75, 82, 85, 80],
        itemStyle: { color: '#1890ff' },
        lineStyle: { width: 2 }
      },
      {
        name: '超声检查',
        type: 'line',
        smooth: true,
        data: [60, 70, 75, 73, 65, 68, 73, 78, 75],
        itemStyle: { color: '#52c41a' },
        lineStyle: { width: 2 }
      },
      {
        name: 'CT检查',
        type: 'line',
        smooth: true,
        data: [55, 65, 70, 68, 60, 63, 68, 72, 70],
        itemStyle: { color: '#faad14' },
        lineStyle: { width: 2 }
      },
      {
        name: '血检',
        type: 'line',
        smooth: true,
        data: [70, 80, 90, 85, 75, 80, 88, 92, 88],
        itemStyle: { color: '#ff4d4f' },
        lineStyle: { width: 2 }
      }
    ]
  };

  return (
    <Container>
      <SectionTitle>
        <BarChartOutlined />
        关键运营指标
      </SectionTitle>
      <MetricsGrid>
        <MetricCard>
          <MetricTitle>平均等待人数</MetricTitle>
          <MetricValue>180</MetricValue>
          <MetricTrend isPositive={false}>
            <ArrowUpOutlined />
            较上周+12%
          </MetricTrend>
        </MetricCard>
        <MetricCard>
          <MetricTitle>平均利用率</MetricTitle>
          <MetricValue>78%</MetricValue>
          <MetricTrend isPositive={true}>
            <ArrowUpOutlined />
            较上周+5%
          </MetricTrend>
        </MetricCard>
        <MetricCard>
          <MetricTitle>利润率</MetricTitle>
          <MetricValue>32%</MetricValue>
          <MetricTrend isPositive={false}>
            <ArrowDownOutlined />
            较上周-2%
          </MetricTrend>
        </MetricCard>
        <MetricCard>
          <MetricTitle>高峰期</MetricTitle>
          <MetricValue>14:00</MetricValue>
        </MetricCard>
      </MetricsGrid>

      <SectionTitle>
        <LineChartOutlined />
        诊室利用率趋势
      </SectionTitle>
      <ChartCard>
        <ReactECharts 
          option={utilizationChartOption} 
          style={{ height: '240px' }}  // 增加图表高度以容纳图例
        />
      </ChartCard>

      <SectionTitle>
        <TeamOutlined />
        科室状态
      </SectionTitle>
      <DepartmentGrid>
        <DepartmentCard>
          <DepartmentName>心电图</DepartmentName>
          <DepartmentMetricGroup>
            <MetricLabel>平均就诊量</MetricLabel>
            <DepartmentMetric>180人/时</DepartmentMetric>
          </DepartmentMetricGroup>
          <DepartmentMetricGroup>
            <MetricLabel>平均等待</MetricLabel>
            <DepartmentMetric>35分钟</DepartmentMetric>
          </DepartmentMetricGroup>
          <DepartmentMetricGroup>
            <MetricLabel>利用率</MetricLabel>
            <DepartmentMetric>82%</DepartmentMetric>
          </DepartmentMetricGroup>
        </DepartmentCard>
        <DepartmentCard>
          <DepartmentName>超声检查</DepartmentName>
          <DepartmentMetricGroup>
            <MetricLabel>平均就诊量</MetricLabel>
            <DepartmentMetric>110人/时</DepartmentMetric>
          </DepartmentMetricGroup>
          <DepartmentMetricGroup>
            <MetricLabel>平均等待</MetricLabel>
            <DepartmentMetric>50分钟</DepartmentMetric>
          </DepartmentMetricGroup>
          <DepartmentMetricGroup>
            <MetricLabel>利用率</MetricLabel>
            <DepartmentMetric>73%</DepartmentMetric>
          </DepartmentMetricGroup>
        </DepartmentCard>
        <DepartmentCard>
          <DepartmentName>CT检查</DepartmentName>
          <DepartmentMetricGroup>
            <MetricLabel>平均就诊量</MetricLabel>
            <DepartmentMetric>85人/时</DepartmentMetric>
          </DepartmentMetricGroup>
          <DepartmentMetricGroup>
            <MetricLabel>平均等待</MetricLabel>
            <DepartmentMetric>30分钟</DepartmentMetric>
          </DepartmentMetricGroup>
          <DepartmentMetricGroup>
            <MetricLabel>利用率</MetricLabel>
            <DepartmentMetric>68%</DepartmentMetric>
          </DepartmentMetricGroup>
        </DepartmentCard>
        <DepartmentCard>
          <DepartmentName>血检</DepartmentName>
          <DepartmentMetricGroup>
            <MetricLabel>平均就诊量</MetricLabel>
            <DepartmentMetric>200人/时</DepartmentMetric>
          </DepartmentMetricGroup>
          <DepartmentMetricGroup>
            <MetricLabel>平均等待</MetricLabel>
            <DepartmentMetric>25分钟</DepartmentMetric>
          </DepartmentMetricGroup>
          <DepartmentMetricGroup>
            <MetricLabel>利用率</MetricLabel>
            <DepartmentMetric>88%</DepartmentMetric>
          </DepartmentMetricGroup>
        </DepartmentCard>
      </DepartmentGrid>

      <SectionTitle>
        <BulbOutlined />
        经营管理化建议
      </SectionTitle>
      <SuggestionCard>
        <SuggestionGroup>
          <SuggestionCategory type="area">
            区域拥堵：超声检查区域排队拥堵过长，建议分流至CT区域，需要优化人员配置
          </SuggestionCategory>
        </SuggestionGroup>
        <SuggestionGroup>
          <SuggestionCategory type="process">
            流程优化：心电图诊室利用率过高，建议进行流程优化
          </SuggestionCategory>
        </SuggestionGroup>
      </SuggestionCard>

      <ButtonGroup>
        <Button
          type="primary"
          icon={<HistoryOutlined />}
          style={{ 
            flex: 1, 
            height: 48, 
            fontSize: 16,
            position: 'relative',
            zIndex: 1000,
            pointerEvents: 'auto'
          }}
          onClick={() => setShowHistory(true)}
        >
          查看历史仿真
        </Button>
        <Button
          type="default"
          style={{ 
            flex: 1, 
            height: 48, 
            fontSize: 16,
            position: 'relative',
            zIndex: 1000,
            pointerEvents: 'auto'
          }}
          onClick={() => setShowAnalytics(true)}
        >
          更多数据详情
        </Button>
      </ButtonGroup>

      <HistoryPanel
        visible={showHistory}
        onClose={() => setShowHistory(false)}
      />
      <AnalyticsPanel
        visible={showAnalytics}
        onClose={() => setShowAnalytics(false)}
      />
    </Container>
  );
} 