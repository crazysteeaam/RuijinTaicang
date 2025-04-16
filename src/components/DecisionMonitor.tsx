import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { RightOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const Container = styled.div`
  width: 480px;
  min-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  right: -20px;

  .data-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 0;
    padding: 0;
  }
`;

const StyledCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 16px;
  color: #1f1f1f;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const TimeCard = styled(StyledCard)`
  h2 {
    font-size: 14px;
    margin: 0 0 8px 0;
    color: #666;
    font-weight: 500;
  }

  .time {
    font-size: 42px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #1f1f1f;
  }

  .note {
    font-size: 14px;
    color: #ff4d4f;
    margin-left: 12px;
    font-weight: 500;
  }
`;

const DataCard = styled(StyledCard)`
  margin-bottom: 16px;

  .label {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .value {
    font-size: 32px;
    font-weight: 600;
    color: #1f1f1f;
  }

  .unit {
    font-size: 14px;
    color: #666;
    margin-left: 6px;
    font-weight: 500;
  }

  .change {
    font-size: 14px;
    margin-left: 8px;
    font-weight: 500;
    &.up { color: #52c41a; }
    &.down { color: #ff4d4f; }
  }
`;

const ProcessCard = styled(StyledCard)`
  h3 {
    font-size: 14px;
    margin: 0 0 12px 0;
    color: #666;
    font-weight: 500;
  }
`;

const WaitTimeCard = styled(StyledCard)`
  h3 {
    font-size: 14px;
    margin: 0 0 12px 0;
    color: #666;
    font-weight: 500;
  }

  .time-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .time-item {
    .label {
      font-size: 14px;
      color: #faad14;
      margin-bottom: 8px;
      font-weight: 500;
    }
    .value {
      font-size: 24px;
      font-weight: 600;
      color: #1f1f1f;
      .change {
        font-size: 14px;
        margin-left: 6px;
        &.up { color: #52c41a; }
        &.down { color: #ff4d4f; }
      }
    }
  }
`;

const UtilizationCard = styled(StyledCard)`
  h3 {
    font-size: 14px;
    margin: 0 0 12px 0;
    color: #666;
    font-weight: 500;
  }

  .util-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .util-item {
    .label {
      font-size: 14px;
      color: #1890ff;
      margin-bottom: 8px;
      font-weight: 500;
    }
    .value {
      font-size: 24px;
      font-weight: 600;
      color: #1f1f1f;
      .change {
        font-size: 14px;
        margin-left: 6px;
        &.up { color: #52c41a; }
        &.down { color: #ff4d4f; }
      }
    }
  }
`;

const RecommendationCard = styled(StyledCard)`
  h3 {
    font-size: 14px;
    margin: 0 0 12px 0;
    color: #666;
    font-weight: 500;
  }

  .recommendation-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .recommendation-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    
    .icon {
      color: #1890ff;
      font-size: 16px;
      margin-top: 4px;
    }
    
    .content {
      flex: 1;
      
      .title {
        font-size: 14px;
        font-weight: 500;
        color: #1f1f1f;
        margin-bottom: 4px;
      }
      
      .description {
        font-size: 12px;
        color: #666;
        line-height: 1.5;
      }
    }
  }
`;

const MoreButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  color: #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover {
    background: #fafafa;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

interface TooltipParams {
  seriesIndex: number;
  data: [number, number];
}

interface DecisionMonitorProps {
  theme?: 'room_optimization' | 'package_optimization';
}

export default function DecisionMonitor({ theme = 'room_optimization' }: DecisionMonitorProps) {
  const [currentTheme, setCurrentTheme] = useState<'room_optimization' | 'package_optimization'>(theme);
  
  // 当主题属性变化时更新状态
  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  const scatterOption = {
    grid: {
      top: 20,
      right: 20,
      bottom: 36,
      left: 50,
    },
    xAxis: {
      type: 'value',
      name: '迭代次数',
      nameLocation: 'middle',
      nameGap: 25,
      min: 0,
      max: 20,
      interval: 2,
      axisLabel: {
        color: '#666',
        fontSize: 14
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.06)'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '目标值',
      nameLocation: 'middle',
      nameGap: 35,
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        color: '#666',
        fontSize: 14
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.06)'
        }
      }
    },
    series: [
      {
        type: 'scatter',
        symbolSize: 12,
        data: [
          [1, 20], [2, 35], [3, 45], [4, 55], [5, 65],
          [6, 75], [7, 82], [8, 85], [9, 88], [10, 86],
          [11, 84], [12, 82], [13, 80], [14, 78]
        ],
        itemStyle: {
          color: '#1890ff',
          shadowBlur: 10,
          shadowColor: 'rgba(24, 144, 255, 0.3)'
        }
      },
      {
        type: 'scatter',
        symbolSize: 20,
        data: [[9, 88]],  // 最优点
        itemStyle: {
          color: '#52c41a',
          shadowBlur: 10,
          shadowColor: 'rgba(82, 196, 26, 0.3)'
        },
        label: {
          show: true,
          position: 'top',
          distance: 10,
          formatter: '最优解',
          color: '#52c41a',
          fontSize: 14,
          fontWeight: 500
        }
      },
      {
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: [
          [1, 20], [2, 35], [3, 45], [4, 55], [5, 65],
          [6, 75], [7, 82], [8, 85], [9, 88], [10, 86],
          [11, 84], [12, 82], [13, 80], [14, 78]
        ],
        lineStyle: {
          color: '#1890ff',
          opacity: 0.2
        }
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: (params: TooltipParams) => {
        if (params.seriesIndex === 1) {
          return `最优解<br/>迭代次数: ${params.data[0]}<br/>目标值: ${params.data[1]}<br/>平均等待时间: 15分钟<br/>医生利用率: 85%<br/>科室利用率: 88%`;
        }
        return `迭代次数: ${params.data[0]}<br/>目标值: ${params.data[1]}`;
      },
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderColor: 'rgba(0, 0, 0, 0.06)',
      textStyle: {
        color: '#666',
        fontSize: 14
      },
      padding: [12, 16]
    }
  };

  // 根据主题获取不同的决策建议
  const getRecommendations = () => {
    if (currentTheme === 'room_optimization') {
      return [
        {
          title: '诊室数量优化建议',
          description: '心电图室：4间 (+1)、超声室：3间 (+1)、CT室：2间 (维持)、DR室：2间 (维持)、内科诊室：5间 (+1)、外科诊室：3间 (维持)、眼科诊室：2间 (维持)'
        },
        {
          title: '高负载诊室调整',
          description: '心电图室 (95% → 75%)：建议在10:00-14:00增开1间；超声室 (88% → 70%)：建议在9:00-11:00增开1间'
        },
        {
          title: '低负载诊室建议',
          description: 'DR室 (45%)：建议合并使用时段；眼科诊室 (55%)：建议调整为2间，将富余资源用于扩充心电图室'
        }
      ];
    } else {
      return [
        {
          title: '套餐数量优化建议',
          description: '健康一男：85人 (+25)、健康一女：90人 (+20)、健康二男：45人 (+5)、健康二女：40人 (-5)、深度男：25人 (维持)、深度女：20人 (-5)'
        },
        {
          title: '高需求套餐扩充',
          description: '健康一男套餐：建议增加至85人/天，预计提升利润率3.2%；健康一女套餐：建议增加至90人/天，预计提升利润率2.8%'
        },
        {
          title: '低效套餐调整',
          description: '深度女套餐：建议减少5人/天，将资源转向健康一类套餐；健康二女套餐：建议减少5人/天，优化科室使用时间分布'
        }
      ];
    }
  };

  return (
    <Container>
      <TimeCard>
        <h2>健康管理中心结束时间</h2>
        <div>
          <span className="time">13:32:00</span>
          <span className="note">↓ 4小时50分</span>
        </div>
      </TimeCard>

      <div className="data-cards">
        <DataCard>
          <div className="label">单位时间处理人数</div>
          <div>
            <span className="value">420</span>
            <span className="unit">人/秒</span>
            <span className="change up">↑ 120</span>
          </div>
        </DataCard>
        <DataCard>
          <div className="label">利润率提升指标</div>
          <div>
            <span className="value">15.8</span>
            <span className="unit">%</span>
            <span className="change up">↑ 2.3</span>
          </div>
        </DataCard>
      </div>

      <ProcessCard>
        <h3>迭代过程</h3>
        <ReactECharts 
          option={scatterOption}
          style={{ height: '240px', width: '100%' }}
        />
      </ProcessCard>

      {currentTheme === 'room_optimization' ? (
        <UtilizationCard>
          <h3>利用率变化</h3>
          <div className="util-grid">
            <div className="util-item">
              <div className="label">心电图</div>
              <div className="value">
                89.2%
                <span className="change down">↓</span>
              </div>
            </div>
            <div className="util-item">
              <div className="label">超声波检查</div>
              <div className="value">
                89.2%
                <span className="change down">↓</span>
              </div>
            </div>
            <div className="util-item">
              <div className="label">CT检查</div>
              <div className="value">
                70.2%
                <span className="change down">↓</span>
              </div>
            </div>
            <div className="util-item">
              <div className="label">血检</div>
              <div className="value">
                70.2%
                <span className="change up">↑</span>
              </div>
            </div>
            <div className="util-item">
              <div className="label">内科男</div>
              <div className="value">
                80.2%
                <span className="change up">↑</span>
              </div>
            </div>
            <div className="util-item">
              <div className="label">内科女</div>
              <div className="value">
                80.2%
                <span className="change up">↑</span>
              </div>
            </div>
          </div>
        </UtilizationCard>
      ) : (
        <WaitTimeCard>
          <h3>平均等待时间变化</h3>
          <div className="time-grid">
            <div className="time-item">
              <div className="label">套餐一男</div>
              <div className="value">
                13:32:04
                <span className="change down">↓</span>
              </div>
            </div>
            <div className="time-item">
              <div className="label">套餐一女</div>
              <div className="value">
                14:32:04
                <span className="change down">↓</span>
              </div>
            </div>
            <div className="time-item">
              <div className="label">套餐二男</div>
              <div className="value">
                16:32:04
                <span className="change down">↓</span>
              </div>
            </div>
            <div className="time-item">
              <div className="label">套餐二女</div>
              <div className="value">
                14:32:04
                <span className="change up">↑</span>
              </div>
            </div>
            <div className="time-item">
              <div className="label">套餐三男</div>
              <div className="value">
                14:32:04
                <span className="change up">↑</span>
              </div>
            </div>
            <div className="time-item">
              <div className="label">套餐三女</div>
              <div className="value">
                16:32:04
                <span className="change up">↑</span>
              </div>
            </div>
          </div>
        </WaitTimeCard>
      )}

      <RecommendationCard>
        <h3>决策建议</h3>
        <div className="recommendation-list">
          {getRecommendations().map((rec, index) => (
            <div className="recommendation-item" key={index}>
              <div className="icon">•</div>
              <div className="content">
                <div className="title">{rec.title}</div>
                <div className="description">{rec.description}</div>
              </div>
            </div>
          ))}
        </div>
      </RecommendationCard>

      <MoreButton>
        更多数据详情
        <RightOutlined />
      </MoreButton>
    </Container>
  );
} 