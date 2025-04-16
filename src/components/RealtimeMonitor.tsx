import React, { useState } from 'react';
import styled from '@emotion/styled';
import { RightOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import RealtimeAnalyticsPanel from './realtime/RealtimeAnalyticsPanel';

const Container = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TopCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
`;

const MetricCard = styled.div`
  padding: 6px;
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
  padding: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const StatsCard = styled(ChartCard)`
  padding: 8px;
`;

const StatsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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

const DepartmentGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const DepartmentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DepartmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  height: 28px;
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

const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  background: #fafafa;
  border-radius: 4px;
`;

const StatusTitle = styled.div`
  color: #1f1f1f;
  font-size: 13px;
  font-weight: 500;
`;

const StatusValue = styled.div<{ color?: string }>`
  color: ${props => props.color || '#1f1f1f'};
  font-size: 20px;
  font-weight: 500;
`;

const StatusDesc = styled.div`
  color: #666;
  font-size: 11px;
`;

export default function RealtimeMonitor() {
  const [showAnalytics, setShowAnalytics] = useState(false);

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

  return (
    <Container>
      <TopCards>
        <MetricCard>
          <CardTitle>当前体检人数</CardTitle>
          <CardValue>535<Unit>人</Unit></CardValue>
        </MetricCard>
        <MetricCard>
          <CardTitle>单位时间处理</CardTitle>
          <CardValue>120<Unit>人/秒</Unit></CardValue>
        </MetricCard>
        <MetricCard>
          <CardTitle>当前等待人数</CardTitle>
          <CardValue>225<Unit>人</Unit></CardValue>
        </MetricCard>
        <MetricCard>
          <CardTitle>平均等待时长</CardTitle>
          <CardValue>185<Unit>分钟</Unit></CardValue>
        </MetricCard>
      </TopCards>

      <StatsCard>
        <SectionTitle>实时运营状态</SectionTitle>
        <StatsContent>
          <DepartmentGroup style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <StatusItem>
              <StatusTitle>检验科</StatusTitle>
              <StatusValue color="#1890ff">85%</StatusValue>
              <StatusDesc>高峰期 • 8人等待 • 预计等待12分钟</StatusDesc>
            </StatusItem>
            <StatusItem>
              <StatusTitle>影像科</StatusTitle>
              <StatusValue color="#ff4d4f">95%</StatusValue>
              <StatusDesc>超负荷 • 15人等待 • 预计等待30分钟</StatusDesc>
            </StatusItem>
            <StatusItem>
              <StatusTitle>临床科</StatusTitle>
              <StatusValue color="#52c41a">60%</StatusValue>
              <StatusDesc>正常 • 3人等待 • 预计等待5分钟</StatusDesc>
            </StatusItem>
          </DepartmentGroup>
        </StatsContent>
      </StatsCard>

      <StatsCard>
        <SectionTitle>实时科室数据</SectionTitle>
        <StatsContent>
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

      <ChartCard>
        <CardTitle>体检时间分布</CardTitle>
        <ReactECharts option={timeDistributionChartOption} style={{ height: 200 }} />
      </ChartCard>

      <StatsCard>
        <SectionTitle>经营管理化建议</SectionTitle>
        <StatsContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ 
              padding: '12px', 
              background: 'rgba(255, 77, 79, 0.1)', 
              borderRadius: '4px',
              fontSize: '13px',
              color: '#ff4d4f'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 600 }}>区域拥堵：</span>
                <span>超声检查区域排队拥堵过长，建议分流至CT区域，需要优化人员配置</span>
              </div>
            </div>
            <div style={{ 
              padding: '12px', 
              background: 'rgba(24, 144, 255, 0.1)', 
              borderRadius: '4px',
              fontSize: '13px',
              color: '#1890ff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 600 }}>流程优化：</span>
                <span>心电图诊室利用率过高，建议进行流程优化</span>
              </div>
            </div>
          </div>
        </StatsContent>
      </StatsCard>

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