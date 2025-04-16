import React from 'react';
import styled from '@emotion/styled';
import { RightOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const Container = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TopCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const MetricCard = styled.div`
  padding: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled.div`
  color: #666;
  font-size: 12px;
  margin-bottom: 4px;
  white-space: nowrap;
`;

const CardValue = styled.div`
  color: #1f1f1f;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;

const Unit = styled.span`
  color: #666;
  font-size: 12px;
  margin-left: 2px;
`;

const ChartCard = styled.div`
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const StatsCard = styled(ChartCard)`
  padding: 16px;
`;

const StatsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitle = styled.div`
  color: #1f1f1f;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background: #f0f0f0;
  }
`;

const DepartmentStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DepartmentGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const DepartmentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DepartmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  height: 32px;
`;

const DepartmentValue = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  min-width: 120px;
  color: #666;
`;

const DepartmentBar = styled.div<{ value: number }>`
  height: 6px;
  width: ${props => props.value}%;
  background: ${props => props.color || '#1890ff'};
  border-radius: 3px;
  flex: 1;
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatsGroup = styled.div`
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const GroupTitle = styled.div`
  color: #1f1f1f;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 13px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const MoreButton = styled.button`
  flex: 1;
  height: 40px;
  font-size: 14px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #1f1f1f;

  &:hover {
    background: #fafafa;
  }
`;

interface HistoryMonitorProps {
  onShowAnalytics: () => void;
}

export default function HistoryMonitor({ onShowAnalytics }: HistoryMonitorProps) {
  // 全天运营趋势图表配置
  const trendChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['人流量', '等待人数'],
      top: 0
    },
    grid: {
      top: 30,
      right: 20,
      bottom: 24,
      left: 40
    },
    xAxis: {
      type: 'category',
      data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#999' }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: '#f0f0f0' }
      },
      axisLabel: { color: '#999' }
    },
    series: [
      {
        name: '人流量',
        type: 'line',
        smooth: true,
        data: [45, 82, 96, 88, 70, 78, 85, 76, 45],
        itemStyle: { color: '#1890ff' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(24,144,255,0.2)' },
              { offset: 1, color: 'rgba(24,144,255,0.01)' }
            ]
          }
        }
      },
      {
        name: '等待人数',
        type: 'line',
        smooth: true,
        data: [20, 45, 55, 40, 35, 42, 48, 38, 25],
        itemStyle: { color: '#ff4d4f' }
      }
    ]
  };

  // 科室利用率图表配置
  const utilizationChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['检验科', '影像科', '临床科'],
      bottom: 0,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { fontSize: 12 }
    },
    grid: {
      top: 20,
      right: 20,
      bottom: 40,
      left: 40
    },
    xAxis: {
      type: 'category',
      data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#999' }
    },
    yAxis: {
      type: 'value',
      max: 100,
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
    series: [
      {
        name: '检验科',
        type: 'line',
        smooth: true,
        data: [75, 85, 95, 88, 78, 82, 88, 85, 75],
        itemStyle: { color: '#1890ff' }
      },
      {
        name: '影像科',
        type: 'line',
        smooth: true,
        data: [65, 78, 85, 80, 72, 75, 82, 78, 70],
        itemStyle: { color: '#52c41a' }
      },
      {
        name: '临床科',
        type: 'line',
        smooth: true,
        data: [60, 72, 80, 75, 68, 70, 76, 72, 65],
        itemStyle: { color: '#faad14' }
      }
    ]
  };

  // 体检时间分布图表配置
  const timeDistributionChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}分钟 ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { fontSize: 12 }
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: [
          { value: 45, name: '检查时间', itemStyle: { color: '#1890ff' } },
          { value: 32, name: '等待时间', itemStyle: { color: '#ff4d4f' } },
          { value: 15, name: '走路时间', itemStyle: { color: '#52c41a' } },
          { value: 8, name: '其他时间', itemStyle: { color: '#faad14' } }
        ]
      }
    ]
  };

  // 添加套餐分布图表配置
  const packageDistributionOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}人 ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { fontSize: 12 }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 1
        },
        label: { show: false },
        data: [
          { value: 120, name: '健康一男', itemStyle: { color: '#1890ff' } },
          { value: 135, name: '健康一女', itemStyle: { color: '#36cfc9' } },
          { value: 85, name: '健康二男', itemStyle: { color: '#73d13d' } },
          { value: 95, name: '健康二女', itemStyle: { color: '#95de64' } },
          { value: 45, name: '深度男', itemStyle: { color: '#ffc53d' } },
          { value: 55, name: '深度女', itemStyle: { color: '#ffec3d' } }
        ]
      }
    ]
  };

  return (
    <Container>
      <TopCards>
        <MetricCard>
          <CardTitle>总体检人数</CardTitle>
          <CardValue>535<Unit>人</Unit></CardValue>
        </MetricCard>
        <MetricCard>
          <CardTitle>单位时间处理人数</CardTitle>
          <CardValue>120<Unit>人/秒</Unit></CardValue>
        </MetricCard>
        <MetricCard>
          <CardTitle>平均等待人数</CardTitle>
          <CardValue>225<Unit>人</Unit></CardValue>
        </MetricCard>
        <MetricCard>
          <CardTitle>平均体检时长</CardTitle>
          <CardValue>185<Unit>分钟</Unit></CardValue>
        </MetricCard>
      </TopCards>

      <ChartCard>
        <CardTitle>全天运营趋势</CardTitle>
        <ReactECharts option={trendChartOption} style={{ height: 160 }} />
      </ChartCard>

      <StatsCard>
        <SectionTitle>今日体检数据统计</SectionTitle>
        <StatsContent>
          <GroupTitle>科室检查人数</GroupTitle>
          <DepartmentGroup>
            <DepartmentColumn>
              <DepartmentItem>
                <span>血检</span>
                <DepartmentValue>
                  <DepartmentBar value={90} color="#1890ff" />
                  220人
                </DepartmentValue>
              </DepartmentItem>
              <DepartmentItem>
                <span>尿检</span>
                <DepartmentValue>
                  <DepartmentBar value={80} color="#1890ff" />
                  195人
                </DepartmentValue>
              </DepartmentItem>
              <DepartmentItem>
                <span>心电图</span>
                <DepartmentValue>
                  <DepartmentBar value={85} color="#52c41a" />
                  210人
                </DepartmentValue>
              </DepartmentItem>
              <DepartmentItem>
                <span>超声检查</span>
                <DepartmentValue>
                  <DepartmentBar value={50} color="#52c41a" />
                  120人
                </DepartmentValue>
              </DepartmentItem>
              <DepartmentItem>
                <span>CT检查</span>
                <DepartmentValue>
                  <DepartmentBar value={35} color="#52c41a" />
                  89人
                </DepartmentValue>
              </DepartmentItem>
            </DepartmentColumn>
            <DepartmentColumn>
              <DepartmentItem>
                <span>内科</span>
                <DepartmentValue>
                  <DepartmentBar value={90} color="#faad14" />
                  220人
                </DepartmentValue>
              </DepartmentItem>
              <DepartmentItem>
                <span>外科</span>
                <DepartmentValue>
                  <DepartmentBar value={75} color="#faad14" />
                  180人
                </DepartmentValue>
              </DepartmentItem>
              <DepartmentItem>
                <span>眼科</span>
                <DepartmentValue>
                  <DepartmentBar value={60} color="#faad14" />
                  150人
                </DepartmentValue>
              </DepartmentItem>
              <DepartmentItem>
                <span>五官科</span>
                <DepartmentValue>
                  <DepartmentBar value={65} color="#faad14" />
                  160人
                </DepartmentValue>
              </DepartmentItem>
            </DepartmentColumn>
          </DepartmentGroup>
        </StatsContent>
      </StatsCard>

      <ChartsRow>
        <ChartCard>
          <CardTitle>套餐分布情况</CardTitle>
          <ReactECharts option={packageDistributionOption} style={{ height: 200 }} />
        </ChartCard>

        <ChartCard>
          <CardTitle>体检时间分布</CardTitle>
          <ReactECharts option={timeDistributionChartOption} style={{ height: 200 }} />
        </ChartCard>
      </ChartsRow>

      <ChartCard>
        <CardTitle>科室利用率趋势</CardTitle>
        <ReactECharts option={utilizationChartOption} style={{ height: 160 }} />
      </ChartCard>

      <ButtonGroup>
        <MoreButton onClick={onShowAnalytics}>
          更多数据详情
          <RightOutlined />
        </MoreButton>
      </ButtonGroup>
    </Container>
  );
} 