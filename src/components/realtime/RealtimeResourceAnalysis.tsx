import React from 'react';
import { Row, Col, Card, Progress } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';
import styled from '@emotion/styled';

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

interface ResourceAnalysisProps {
  dateRange?: [Date | null, Date | null];
}

export default function RealtimeResourceAnalysis({ dateRange }: ResourceAnalysisProps) {
  // 医生出勤率数据
  const doctorAttendanceData = [
    { name: '内科', value: 95 },
    { name: '外科', value: 92 },
    { name: '眼科', value: 88 },
    { name: '五官科', value: 90 }
  ];

  // 医生出勤率图表配置
  const doctorAttendanceChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        data: doctorAttendanceData.map(item => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            color: ANALYTICS_THEME.chart.primary
          }
        })),
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {c}%',
          color: ANALYTICS_THEME.text.primary
        }
      }
    ]
  };

  // 设备使用率数据
  const equipmentUsageData = [
    { name: 'CT', value: 85 },
    { name: '超声', value: 92 },
    { name: '心电图', value: 78 },
    { name: 'X光', value: 88 }
  ];

  // 设备使用率图表配置
  const equipmentUsageChartOption = {
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
      data: equipmentUsageData.map(item => item.name),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    series: [
      {
        type: 'bar',
        data: equipmentUsageData.map(item => ({
          value: item.value,
          itemStyle: {
            color: item.value > 90 ? ANALYTICS_THEME.chart.error :
                   item.value > 80 ? ANALYTICS_THEME.chart.warning :
                   ANALYTICS_THEME.chart.success
          }
        }))
      }
    ]
  };

  // 房间使用情况数据
  const roomUsageData = [
    { name: '诊室', total: 20, used: 18 },
    { name: '检查室', total: 15, used: 12 },
    { name: '化验室', total: 10, used: 9 },
    { name: '其他', total: 8, used: 5 }
  ];

  // 科室利用率趋势图表配置
  const utilizationTrendChartOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
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
        itemStyle: { color: ANALYTICS_THEME.chart.primary }
      },
      {
        name: '超声检查',
        type: 'line',
        smooth: true,
        data: [60, 70, 75, 73, 65, 68, 73, 78, 75],
        itemStyle: { color: ANALYTICS_THEME.chart.success }
      },
      {
        name: 'CT检查',
        type: 'line',
        smooth: true,
        data: [55, 65, 70, 68, 60, 63, 68, 72, 70],
        itemStyle: { color: ANALYTICS_THEME.chart.warning }
      }
    ]
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={8}>
          <MetricCard>
            <MetricTitle>总房间数</MetricTitle>
            <MetricValue>{roomUsageData.reduce((acc, curr) => acc + curr.total, 0)}</MetricValue>
          </MetricCard>
        </Col>
        <Col span={8}>
          <MetricCard>
            <MetricTitle>使用中房间</MetricTitle>
            <MetricValue>{roomUsageData.reduce((acc, curr) => acc + curr.used, 0)}</MetricValue>
          </MetricCard>
        </Col>
        <Col span={8}>
          <MetricCard>
            <MetricTitle>平均使用率</MetricTitle>
            <MetricValue>
              {Math.round(roomUsageData.reduce((acc, curr) => acc + (curr.used / curr.total * 100), 0) / roomUsageData.length)}%
            </MetricValue>
          </MetricCard>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={12}>
          <Card 
            title="医生出勤率" 
            style={{ background: ANALYTICS_THEME.background, border: 'none', borderRadius: '8px' }}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={doctorAttendanceChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="设备使用率" 
            style={{ background: ANALYTICS_THEME.background, border: 'none', borderRadius: '8px' }}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={equipmentUsageChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card 
            title="科室利用率趋势" 
            style={{ background: ANALYTICS_THEME.background, border: 'none', borderRadius: '8px' }}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={utilizationTrendChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card 
            title="房间使用情况" 
            style={{ background: ANALYTICS_THEME.background, border: 'none', borderRadius: '8px' }}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <Row gutter={[16, 16]}>
              {roomUsageData.map(room => (
                <Col span={6} key={room.name}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: ANALYTICS_THEME.text.primary, marginBottom: '8px' }}>{room.name}</div>
                    <Progress
                      type="circle"
                      percent={Math.round(room.used / room.total * 100)}
                      format={percent => `${percent}%`}
                      strokeColor={
                        (room.used / room.total * 100) > 90 ? ANALYTICS_THEME.chart.error :
                        (room.used / room.total * 100) > 80 ? ANALYTICS_THEME.chart.warning :
                        ANALYTICS_THEME.chart.success
                      }
                    />
                    <div style={{ color: ANALYTICS_THEME.text.secondary, marginTop: '8px' }}>
                      {room.used}/{room.total}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
} 