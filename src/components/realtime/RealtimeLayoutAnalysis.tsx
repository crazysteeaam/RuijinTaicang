import React from 'react';
import { Row, Col, Card } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ANALYTICS_THEME } from './theme';
import styled from '@emotion/styled';

const cardStyle = {
  background: ANALYTICS_THEME.background,
  border: 'none',
  borderRadius: '8px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
};

interface LayoutAnalysisProps {
  dateRange?: [Date | null, Date | null];
}

export default function RealtimeLayoutAnalysis({ dateRange }: LayoutAnalysisProps) {
  // 人流热力图数据
  const heatmapData = [
    { name: '女性体检区域', value: 85 },
    { name: '男性体检区域', value: 92 },
    { name: '血检区域', value: 78 },
    { name: '签到区域', value: 95 },
    { name: '餐厅区域', value: 65 }
  ];

  // 人流热力图配置
  const heatmapChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    series: [
      {
        type: 'treemap',
        data: heatmapData.map(item => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            color: `rgba(24, 144, 255, ${item.value / 100})`
          }
        })),
        label: {
          show: true,
          formatter: (params: any) => {
            return `${params.name}\n${params.value}%`;
          },
          color: ANALYTICS_THEME.text.primary
        }
      }
    ]
  };

  // 路径分析数据
  const pathData = {
    nodes: [
      { name: '入口登记', value: 100, fixed: true },
      { name: '抽血化验', value: 95, fixed: true },
      { name: '心电图', value: 45, category: 1 },
      { name: '超声', value: 42, category: 1 },
      { name: 'CT', value: 38, category: 1 },
      { name: '内科', value: 35, category: 1 },
      { name: '外科', value: 32, category: 1 },
      { name: '眼科', value: 30, category: 1 },
      { name: '五官科', value: 28, category: 1 },
      { name: '总检', value: 85, fixed: true },
      { name: '离开', value: 80, fixed: true }
    ]
  };

  // 路径分析图表配置
  const pathChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}人'
    },
    legend: {
      data: ['固定流程', '自由流程'],
      bottom: 0,
      left: 'center',
      textStyle: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: pathData.nodes.map(node => ({
          name: node.name,
          value: node.value,
          category: node.fixed ? 0 : 1,
          symbolSize: node.value / 3 + 15,
          fixed: node.fixed,
          x: node.fixed ? (
            node.name === '入口登记' ? 50 :
            node.name === '抽血化验' ? 200 :
            node.name === '总检' ? 600 :
            node.name === '离开' ? 750 : null
          ) : null,
          y: node.fixed ? (
            node.name === '入口登记' ? 200 :
            node.name === '抽血化验' ? 200 :
            node.name === '总检' ? 200 :
            node.name === '离开' ? 200 : null
          ) : null,
          itemStyle: {
            color: node.fixed ? ANALYTICS_THEME.chart.primary : ANALYTICS_THEME.chart.success
          }
        })),
        categories: [
          { name: '固定流程' },
          { name: '自由流程' }
        ],
        force: {
          repulsion: 200,
          edgeLength: 80,
          gravity: 0.1
        },
        edges: [
          // 固定路径
          { source: '入口登记', target: '抽血化验' },
          { source: '心电图', target: '总检' },
          { source: '超声', target: '总检' },
          { source: 'CT', target: '总检' },
          { source: '内科', target: '总检' },
          { source: '外科', target: '总检' },
          { source: '眼科', target: '总检' },
          { source: '五官科', target: '总检' },
          { source: '总检', target: '离开' },
          // 从抽血化验到各检查项目的连接
          { source: '抽血化验', target: '心电图' },
          { source: '抽血化验', target: '超声' },
          { source: '抽血化验', target: 'CT' },
          { source: '抽血化验', target: '内科' },
          { source: '抽血化验', target: '外科' },
          { source: '抽血化验', target: '眼科' },
          { source: '抽血化验', target: '五官科' }
        ].map(edge => ({
          ...edge,
          lineStyle: {
            color: ANALYTICS_THEME.text.tertiary,
            width: 1,
            opacity: 0.6
          },
          symbol: ['none', 'arrow'],
          symbolSize: [0, 8]
        })),
        label: {
          show: true,
          position: 'right',
          formatter: '{b}\n{c}人',
          color: ANALYTICS_THEME.text.primary
        },
        lineStyle: {
          curveness: 0.3
        }
      }
    ]
  };

  // 拥堵预警数据
  const congestionData = {
    times: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    areas: [
      { name: '女性体检区域', data: [65, 75, 85, 80, 70, 75, 82, 85, 80] },
      { name: '男性体检区域', data: [60, 70, 75, 73, 65, 68, 73, 78, 75] },
      { name: '血检区域', data: [55, 65, 70, 68, 60, 63, 68, 72, 70] },
      { name: '签到区域', data: [70, 80, 90, 85, 75, 80, 88, 92, 88] },
      { name: '餐厅区域', data: [50, 60, 65, 63, 55, 58, 63, 67, 65] }
    ]
  };

  // 拥堵预警图表配置
  const congestionChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    legend: {
      data: congestionData.areas.map(area => area.name),
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
      data: congestionData.times,
      axisLabel: {
        color: ANALYTICS_THEME.text.secondary
      }
    },
    yAxis: {
      type: 'value',
      name: '拥堵指数',
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
    series: congestionData.areas.map((area, index) => ({
      name: area.name,
      type: 'line',
      smooth: true,
      data: area.data,
      itemStyle: { 
        color: index === 0 ? ANALYTICS_THEME.chart.primary : 
               index === 1 ? ANALYTICS_THEME.chart.success : 
               index === 2 ? ANALYTICS_THEME.chart.warning : 
               index === 3 ? ANALYTICS_THEME.chart.error : 
               ANALYTICS_THEME.chart.info
      }
    }))
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Card 
            title="人流热力图" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={heatmapChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card 
            title="拥堵预警" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={congestionChartOption} style={{ height: '300px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={24}>
          <Card 
            title="体检流程分析" 
            style={cardStyle}
            headStyle={{
              color: ANALYTICS_THEME.text.primary,
              borderBottom: ANALYTICS_THEME.border,
              fontWeight: 500
            }}
          >
            <ReactECharts option={pathChartOption} style={{ height: '400px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
} 