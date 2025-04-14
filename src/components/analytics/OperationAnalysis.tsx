import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';

interface EquipmentSuggestion {
  department: string;
  current: number;
  suggested: number;
  reason: string;
}

interface ChartParams {
  dataIndex: number;
  value: number;
}

// 模拟数据
const mockData = {
  resourceAllocation: [
    { time: '08:00', staff: 3, equipment: 2 },
    { time: '09:00', staff: 5, equipment: 3 },
    { time: '10:00', staff: 6, equipment: 4 },
    { time: '11:00', staff: 5, equipment: 4 },
    { time: '14:00', staff: 5, equipment: 3 },
    { time: '15:00', staff: 4, equipment: 3 },
    { time: '16:00', staff: 3, equipment: 2 },
    { time: '17:00', staff: 2, equipment: 2 }
  ],
  equipmentSuggestions: [
    { 
      department: '超声科室',
      current: 2,
      suggested: 3,
      reason: '高峰期等待时间过长，建议增加1台设备'
    },
    { 
      department: '心电图室',
      current: 2,
      suggested: 2,
      reason: '当前配置合理，无需调整'
    },
    { 
      department: 'CT室',
      current: 1,
      suggested: 2,
      reason: '下午检查量大，建议增加1台设备'
    },
    { 
      department: '采血室',
      current: 3,
      suggested: 4,
      reason: '早高峰拥堵严重，建议增加1个采血台'
    }
  ],
  peakHourStrategy: [
    { time: '08:00-10:00', flow: 85, strategy: '增加采血台和护士' },
    { time: '10:00-12:00', flow: 95, strategy: '全设备运行' },
    { time: '14:00-16:00', flow: 90, strategy: '增加超声检查医生' },
    { time: '16:00-18:00', flow: 70, strategy: '标准配置' }
  ]
};

const cardStyle = {
  background: ANALYTICS_THEME.cardBg,
  border: ANALYTICS_THEME.border,
  borderRadius: '8px',
  marginBottom: '16px'
};

export default function OperationAnalysis() {
  // 资源配置图表配置
  const resourceChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['人员数量', '设备数量'],
      textStyle: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    grid: {
      top: 50,
      right: 20,
      bottom: 30,
      left: 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.resourceAllocation.map(item => item.time),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    yAxis: {
      type: 'value',
      name: '数量',
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
        name: '人员数量',
        type: 'line',
        data: mockData.resourceAllocation.map(item => ({
          value: item.staff,
          itemStyle: {
            color: ANALYTICS_THEME.chart.primary
          }
        }))
      },
      {
        name: '设备数量',
        type: 'line',
        data: mockData.resourceAllocation.map(item => ({
          value: item.equipment,
          itemStyle: {
            color: ANALYTICS_THEME.chart.warning
          }
        }))
      }
    ]
  };

  // 高峰期策略图表配置
  const peakStrategyChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: 30,
      right: 120,
      bottom: 30,
      left: 60,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: mockData.peakHourStrategy.map(item => item.time),
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    yAxis: {
      type: 'value',
      name: '客流量',
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
        type: 'bar',
        data: mockData.peakHourStrategy.map(item => ({
          value: item.flow,
          itemStyle: {
            color: item.flow > 90 
              ? ANALYTICS_THEME.chart.error 
              : item.flow > 80 
                ? ANALYTICS_THEME.chart.warning 
                : ANALYTICS_THEME.chart.success
          }
        })),
        label: {
          show: true,
          position: 'right',
          color: ANALYTICS_THEME.text.secondary,
          formatter: (params: ChartParams) => mockData.peakHourStrategy[params.dataIndex].strategy
        }
      }
    ]
  };

  // 设备建议表格列配置
  const columns = [
    {
      title: '科室',
      dataIndex: 'department',
      key: 'department',
      width: '15%'
    },
    {
      title: '当前数量',
      dataIndex: 'current',
      key: 'current',
      width: '15%'
    },
    {
      title: '建议数量',
      dataIndex: 'suggested',
      key: 'suggested',
      width: '15%',
      render: (text: number, record: EquipmentSuggestion) => (
        <span style={{ 
          color: text > record.current 
            ? ANALYTICS_THEME.chart.error
            : ANALYTICS_THEME.text.primary 
        }}>
          {text}
        </span>
      )
    },
    {
      title: '调整建议',
      dataIndex: 'reason',
      key: 'reason',
      width: '55%'
    }
  ];

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Card 
            title="资源动态配置分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={resourceChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card 
            title="设备配置建议" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <Table 
              dataSource={mockData.equipmentSuggestions} 
              columns={columns}
              pagination={false}
              style={{
                background: 'transparent'
              }}
              rowKey="department"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card 
            title="高峰期应对策略" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border
            }}
          >
            <ReactECharts option={peakStrategyChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 