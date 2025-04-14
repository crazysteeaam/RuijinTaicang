import React from 'react';
import { Button } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import ReactECharts from 'echarts-for-react';
import HistoryPanel from './HistoryPanel';
import AnalyticsPanel from './AnalyticsPanel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 400px;
  margin-left: auto;
  margin-right: 16px;
  margin-top: 16px;
`;

const TopCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const LargeCard = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled.div`
  color: #666;
  font-size: 16px;
  margin-bottom: 16px;
`;

const LargeValue = styled.div`
  color: #1f1f1f;
  font-size: 48px;
  font-weight: 500;
  text-align: center;
`;

const Unit = styled.span`
  color: #666;
  font-size: 14px;
  margin-left: 8px;
`;

const ChartCard = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const TimeList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const TimeItem = styled.div`
  text-align: center;
`;

const TimeLabel = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

const TimeValue = styled.div`
  color: #1f1f1f;
  font-size: 24px;
  font-weight: 500;
`;

const WaitTimeCard = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const ServiceList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const ServiceItem = styled.div`
  text-align: center;
`;

const ServiceLabel = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

const ServiceValue = styled.div`
  color: #1f1f1f;
  font-size: 24px;
  font-weight: 500;
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

  console.log('DataMonitor rendering, showHistory:', showHistory);

  const utilizationChartOption = {
    grid: {
      top: 30,
      right: 20,
      bottom: 30,
      left: 40
    },
    xAxis: {
      type: 'category',
      data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      axisLabel: {
        color: '#666'
      }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value}%',
        color: '#666'
      },
      splitLine: {
        lineStyle: {
          color: '#eee'
        }
      }
    },
    series: [{
      data: [65, 75, 85, 80, 70, 60, 75, 85, 90],
      type: 'bar',
      itemStyle: {
        color: '#4CAF50'
      }
    }]
  };

  const gaugeChartOption = {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      splitNumber: 8,
      progress: {
        show: true,
        roundCap: true,
        width: 18,
        itemStyle: {
          color: '#FFC107'
        }
      },
      pointer: {
        show: false
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 18,
          color: [[1, '#eee']]
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      title: {
        show: false
      },
      detail: {
        offsetCenter: [0, '20%'],
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1f1f1f',
        formatter: '68%'
      },
      data: [{
        value: 68
      }]
    }]
  };

  return (
    <Container>
      <TopCards>
        <LargeCard>
          <CardTitle>单位时间处理人数</CardTitle>
          <LargeValue>120<Unit>人/秒</Unit></LargeValue>
        </LargeCard>
        <LargeCard>
          <CardTitle>当前等待人数</CardTitle>
          <LargeValue>225<Unit>人</Unit></LargeValue>
        </LargeCard>
      </TopCards>

      <ChartCard>
        <CardTitle>诊室利用率</CardTitle>
        <ReactECharts option={utilizationChartOption} style={{ height: '200px' }} />
      </ChartCard>

      <TimeList>
        <TimeItem>
          <TimeLabel>心电图</TimeLabel>
          <TimeValue>13:32:04</TimeValue>
        </TimeItem>
        <TimeItem>
          <TimeLabel>超声检查</TimeLabel>
          <TimeValue>14:32:04</TimeValue>
        </TimeItem>
        <TimeItem>
          <TimeLabel>CT检查</TimeLabel>
          <TimeValue>16:32:04</TimeValue>
        </TimeItem>
        <TimeItem>
          <TimeLabel>血检</TimeLabel>
          <TimeValue>18:32:04</TimeValue>
        </TimeItem>
        <TimeItem>
          <TimeLabel>内科</TimeLabel>
          <TimeValue>15:32:04</TimeValue>
        </TimeItem>
      </TimeList>

      <WaitTimeCard>
        <div>
          <TimeLabel>平均等待时长</TimeLabel>
          <div>
            <TimeItem>
              <TimeLabel>心电图</TimeLabel>
              <TimeValue>00:32:04</TimeValue>
            </TimeItem>
            <TimeItem>
              <TimeLabel>超声检查</TimeLabel>
              <TimeValue>00:55:00</TimeValue>
            </TimeItem>
            <TimeItem>
              <TimeLabel>CT检查</TimeLabel>
              <TimeValue>00:32:04</TimeValue>
            </TimeItem>
          </div>
        </div>
        <div>
          <TimeLabel>走路时间占比</TimeLabel>
          <ReactECharts option={gaugeChartOption} style={{ height: '200px' }} />
        </div>
      </WaitTimeCard>

      <ServiceList>
        <ServiceItem>
          <ServiceLabel>心电图</ServiceLabel>
          <ServiceValue>210人</ServiceValue>
        </ServiceItem>
        <ServiceItem>
          <ServiceLabel>超声检查</ServiceLabel>
          <ServiceValue>120人</ServiceValue>
        </ServiceItem>
        <ServiceItem>
          <ServiceLabel>CT检查</ServiceLabel>
          <ServiceValue>89人</ServiceValue>
        </ServiceItem>
        <ServiceItem>
          <ServiceLabel>血检</ServiceLabel>
          <ServiceValue>220人</ServiceValue>
        </ServiceItem>
        <ServiceItem>
          <ServiceLabel>内科</ServiceLabel>
          <ServiceValue>220人</ServiceValue>
        </ServiceItem>
      </ServiceList>

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