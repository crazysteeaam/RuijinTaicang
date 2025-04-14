import React, { useState } from 'react';
import styled from '@emotion/styled';
import { RightOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import RealtimeAnalyticsPanel from './realtime/RealtimeAnalyticsPanel';

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const TimeItem = styled.div`
  text-align: center;
  min-width: 80px;
`;

const TimeLabel = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
  white-space: nowrap;
`;

const TimeValue = styled.div`
  color: #1f1f1f;
  font-size: 18px;
  font-weight: 500;
  font-family: monospace;
`;

const WaitTimeCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

  .wait-times {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .wait-time-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .wait-time-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ServiceList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const ServiceItem = styled.div`
  text-align: center;
  flex: 1;
  min-width: 80px;
`;

const ServiceLabel = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
`;

const ServiceValue = styled.div`
  color: #1f1f1f;
  font-size: 16px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const MoreButton = styled.button`
  flex: 1;
  height: 48px;
  font-size: 16px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #1f1f1f;

  &:hover {
    background: #fafafa;
  }
`;

export default function RealtimeMonitor() {
  const [showAnalytics, setShowAnalytics] = useState(false);

  const utilizationChartOption = {
    grid: {
      top: 30,
      right: 8,
      bottom: 24,
      left: 24
    },
    xAxis: {
      type: 'category',
      data: ['8:00', '10:00', '12:00', '14:00', '16:00'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#999' }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      interval: 20,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: '#f0f0f0' }
      },
      axisLabel: {
        color: '#999',
        formatter: '{value}%'
      }
    },
    series: [{
      data: [15, 18, 15, 12, 18],
      type: 'bar',
      barWidth: 16,
      itemStyle: {
        color: '#52c41a'
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
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.3, '#91d5ff'],
            [0.7, '#faad14'],
            [1, '#ff4d4f']
          ]
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '12%',
        width: 20,
        offsetCenter: [0, '-60%'],
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        length: 12,
        lineStyle: {
          color: 'auto',
          width: 2
        }
      },
      splitLine: {
        length: 20,
        lineStyle: {
          color: 'auto',
          width: 3
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: 12,
        distance: -60
      },
      title: {
        offsetCenter: [0, '-20%'],
        fontSize: 20
      },
      detail: {
        fontSize: 30,
        offsetCenter: [0, '0%'],
        valueAnimation: true,
        formatter: function (value: number) {
          return value + '%';
        },
        color: 'auto'
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
      </TimeList>

      <WaitTimeCard>
        <div className="wait-times">
          <TimeLabel>平均等待时长</TimeLabel>
          <div className="wait-time-list">
            <div className="wait-time-item">
              <TimeLabel>心电图</TimeLabel>
              <TimeValue>00:32:04</TimeValue>
            </div>
            <div className="wait-time-item">
              <TimeLabel>超声检查</TimeLabel>
              <TimeValue>00:55:00</TimeValue>
            </div>
            <div className="wait-time-item">
              <TimeLabel>CT检查</TimeLabel>
              <TimeValue>00:32:04</TimeValue>
            </div>
          </div>
        </div>
        <div>
          <TimeLabel>走路时间占比</TimeLabel>
          <ReactECharts option={gaugeChartOption} style={{ height: '180px' }} />
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
        <MoreButton onClick={() => setShowAnalytics(true)}>
          更多数据详情
          <RightOutlined />
        </MoreButton>
      </ButtonGroup>

      <RealtimeAnalyticsPanel
        visible={showAnalytics}
        onClose={() => setShowAnalytics(false)}
      />
    </Container>
  );
} 