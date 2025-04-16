import React, { useState } from 'react';
import { Button, Select, DatePicker, InputNumber, Card, Input, Radio } from 'antd';
import styled from '@emotion/styled';
import { SettingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import SimulationConfigPanel from './SimulationConfigPanel';
import DecisionMonitor from './DecisionMonitor';

const PageLayout = styled.div`
  display: flex;
  gap: 24px;
  width: 98vw;
  height: 100vh;
  padding: 24px;
  background: transparent;
  overflow: auto;
  justify-content: center;
  display: flex;
  margin-top: 25px;
  justify-content: space-between;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 480px;
`;

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  color: #1f1f1f;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 480px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const ConfigButton = styled(Button)`
  font-size: 14px;
  height: 32px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  width: 100%;
`;

const ModeSwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 16px;
`;

const ModeSwitch = styled(Radio.Group)`
  width: 240px;
  .ant-radio-button-wrapper {
    width: 50%;
    text-align: center;
  }
`;

const Section = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
`;

const ConstraintRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const VariableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DeleteButton = styled(Button)`
  padding: 4px 8px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px dashed rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background: rgba(24, 144, 255, 0.04);
    border-color: #1890ff;
  }
`;

const RunButton = styled(Button)`
  width: 100%;
  height: 40px;
  margin-top: 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ThemeCard = styled(Card)<{ selected?: boolean }>`
  margin-bottom: 12px;
  cursor: pointer;
  border: ${props => props.selected ? '2px solid #1890ff' : '1px solid #e8e8e8'};
  &:hover {
    border-color: #1890ff;
  }
`;

const DetailPanel = styled.div<{ visible: boolean }>`
  display: ${props => props.visible ? 'block' : 'none'};
  margin-top: 24px;
`;

const RoomConfigGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const RoomConfigItem = styled.div`
  .room-name {
    font-size: 14px;
    color: #333;
    margin-bottom: 8px;
  }
  .input-group {
    display: flex;
    align-items: center;
    gap: 4px;
    .ant-input-number {
      width: 60px !important;
    }
  }
`;

interface ConstraintConfig {
  name: string;
  operator: string;
  value: string;
}

interface VariableConfig {
  type: string;
  name: string;
  initialValue: number;
  unit?: string;
}

const targetOptions = [
  { value: 'wait_time', label: '患者等待时间最短' },
  { value: 'doctor_utilization', label: '医生空闲率最低' },
  { value: 'department_utilization', label: '科室空闲率最低' },
  { value: 'equipment_utilization', label: '设备利用率最高' },
  { value: 'profit', label: '健康管理利润最大化' },
  { value: 'resource_balance', label: '资源均衡利用' }
];

const variableTypeOptions = [
  { value: 'staff_group', label: '人员组配置' },
  { value: 'room', label: '诊室配置' },
  { value: 'package', label: '体检套餐' },
  { value: 'process', label: '流程参数' }
];

const variableNameOptions = {
  staff_group: [
    { value: 'doctor_group', label: '医生组' },
    { value: 'nurse_group', label: '护士组' },
    { value: 'technician_group', label: '技师组' }
  ],
  room: [
    { value: 'blood_test', label: '抽血室' },
    { value: 'ultrasound', label: '超声室' },
    { value: 'ct_room', label: 'CT室' },
    { value: 'dr_room', label: 'DR室' },
    { value: 'ecg_room', label: '心电图室' },
    { value: 'internal_medicine', label: '内科诊室' },
    { value: 'surgery', label: '外科诊室' },
    { value: 'ophthalmology', label: '眼科诊室' }
  ],
  package: [
    { value: 'health1_male', label: '健康一男' },
    { value: 'health1_female', label: '健康一女' },
    { value: 'health2_male', label: '健康二男' },
    { value: 'health2_female', label: '健康二女' },
    { value: 'depth_male', label: '深度男' },
    { value: 'depth_female', label: '深度女' }
  ],
  process: [
    { value: 'service_time', label: '服务时长' },
    { value: 'transfer_time', label: '转移时间' },
    { value: 'queue_limit', label: '排队上限' },
    { value: 'start_time', label: '开始时间' },
    { value: 'end_time', label: '结束时间' }
  ]
};

const PRESET_THEMES = [
  {
    id: 'room_optimization',
    name: '诊室资源优化',
    description: '基于预约数据，优化各类诊室的数量配置',
    goals: ['最短等待时间', '最高设备利用率'],
    defaultConfig: {
      rooms: [
        { name: '抽血室', range: [1, 5] },
        { name: '超声室', range: [1, 3] },
        { name: 'CT室', range: [1, 2] },
        { name: 'DR室', range: [1, 2] },
        { name: '心电图室', range: [1, 3] },
        { name: '内科诊室', range: [2, 6] },
        { name: '外科诊室', range: [1, 4] },
        { name: '眼科诊室', range: [1, 3] }
      ]
    }
  },
  {
    id: 'package_optimization',
    name: '套餐结构优化',
    description: '优化各类体检套餐的数量配置',
    goals: ['最短等待时间', '最高利润率'],
    defaultConfig: {
      packages: [
        { name: '健康一男', range: [20, 100] },
        { name: '健康一女', range: [20, 100] },
        { name: '健康二男', range: [10, 50] },
        { name: '健康二女', range: [10, 50] },
        { name: '深度男', range: [5, 30] },
        { name: '深度女', range: [5, 30] }
      ]
    }
  }
];

interface DecisionConfigProps {
  onClose: () => void;
  onStart: (config: SimulationConfig) => void;
}

interface SimulationConfig {
  startTime: Dayjs | null;
  goals: string[];
  variables: Array<{
    type: string;
    name: string;
    initialValue: number;
    unit?: string;
  }>;
  constraints: Array<{
    name: string;
    operator: string;
    value: string;
  }>;
}

const DecisionConfig: React.FC<DecisionConfigProps> = ({ onClose, onStart }) => {
  const [optimizationTime, setOptimizationTime] = useState<Dayjs | null>(null);
  const [targets, setTargets] = useState<string[]>(['wait_time']);
  const [constraints, setConstraints] = useState<ConstraintConfig[]>([
    { name: '健康一男数量', operator: '大于', value: '20' },
    { name: '健康一女数量', operator: '大于', value: '20' },
    { name: '健康二男数量', operator: '大于', value: '10' },
    { name: '健康二女数量', operator: '大于', value: '10' },
    { name: '深度男数量', operator: '大于', value: '5' },
    { name: '深度女数量', operator: '大于', value: '5' }
  ]);
  const [variables, setVariables] = useState<VariableConfig[]>([
    { type: 'staff_group', name: 'doctor_group', initialValue: 5, unit: '人' }
  ]);
  const [showSimConfig, setShowSimConfig] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationData, setOptimizationData] = useState<Array<{
    iteration: number;
    isOptimal: boolean;
    metrics: {
      waitTime: number;
      doctorUtilization: number;
      departmentUtilization: number;
      equipmentUtilization: number;
    };
    variables: {
      [key: string]: number;
    };
  }>>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [configMode, setConfigMode] = useState<'theme' | 'detail'>('theme');
  const [config, setConfig] = useState<SimulationConfig>({
    startTime: null,
    goals: [],
    variables: [],
    constraints: []
  });

  const handleAddConstraint = () => {
    setConstraints([...constraints, { name: '', operator: '大于', value: '' }]);
  };

  const handleAddVariable = () => {
    setVariables([...variables, { type: 'staff_group', name: '', initialValue: 0 }]);
  };

  const handleDeleteVariable = (index: number) => {
    const newVariables = [...variables];
    newVariables.splice(index, 1);
    setVariables(newVariables);
  };

  const handleTargetChange = (value: string[]) => {
    if (value.length <= 3) {
      setTargets(value);
    }
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    // 模拟优化过程的示例数据
    const mockData = Array.from({ length: 5 }, (_, i) => ({
      iteration: i + 1,
      isOptimal: i === 3, // 第4次迭代为最优解
      metrics: {
        waitTime: 15 - i * 2,
        doctorUtilization: 0.75 + i * 0.05,
        departmentUtilization: 0.8 + i * 0.03,
        equipmentUtilization: 0.85 + i * 0.02
      },
      variables: {
        '医生组': 5 + i,
        '护士组': 8 + i,
        '抽血室': 3,
        'CT室': 2
      }
    }));
    
    // 模拟异步优化过程
    let currentIteration = 0;
    const interval = setInterval(() => {
      if (currentIteration < mockData.length) {
        setOptimizationData(prev => [...prev, mockData[currentIteration]]);
        currentIteration++;
      } else {
        clearInterval(interval);
        setIsOptimizing(false);
      }
    }, 1000);
  };

  const getUnitByType = (type: string, name: string) => {
    switch (type) {
      case 'staff_group':
        return '人';
      case 'room':
        return '间';
      case 'package':
        return '人';
      case 'process':
        return name.includes('time') ? '分钟' : '人';
      default:
        return '';
    }
  };

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = PRESET_THEMES.find(t => t.id === themeId);
    if (theme) {
      setConfig({
        ...config,
        goals: theme.goals,
      });
    }
  };

  const handleRunDecision = () => {
    onStart(config);
  };

  return (
    <PageLayout>
      <MainContent>
        <Container>
          <TitleSection>
            <ConfigButton 
              type="default"
              icon={<SettingOutlined />}
              onClick={() => setShowSimConfig(true)}
            >
              模拟参数配置
            </ConfigButton>
            <Title>决策全局配置选项</Title>
            <ModeSwitchContainer>
              <ModeSwitch
                value={configMode}
                onChange={(e) => setConfigMode(e.target.value)}
                optionType="button"
                buttonStyle="solid"
                options={[
                  { label: '主题模式', value: 'theme' },
                  { label: '详细配置', value: 'detail' }
                ]}
              />
            </ModeSwitchContainer>
          </TitleSection>

          {configMode === 'theme' ? (
            <Section>
              <Label>选择决策主题</Label>
              {PRESET_THEMES.map(theme => (
                <ThemeCard
                  key={theme.id}
                  selected={selectedTheme === theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  <Card.Meta
                    title={theme.name}
                    description={
                      <>
                        <div>{theme.description}</div>
                        <div style={{ marginTop: 8, color: '#1890ff' }}>
                          目标：{theme.goals.join(' + ')}
                        </div>
                      </>
                    }
                  />
                </ThemeCard>
              ))}

              {selectedTheme && (
                <Section>
                  <Label>主题参数配置</Label>
                  {selectedTheme === 'room_optimization' && (
                    <Section>
                      <Label>诊室数量配置范围</Label>
                      <RoomConfigGrid>
                        {PRESET_THEMES.find(t => t.id === 'room_optimization')?.defaultConfig.rooms.map((room, index) => (
                          <RoomConfigItem key={index}>
                            <div className="room-name">{room.name}</div>
                            <div className="input-group">
                              <InputNumber 
                                min={room.range[0]} 
                                max={room.range[1]} 
                                defaultValue={room.range[0]} 
                              />
                              <span>至</span>
                              <InputNumber 
                                min={room.range[0]} 
                                max={room.range[1]} 
                                defaultValue={room.range[1]} 
                              />
                              <span>间</span>
                            </div>
                          </RoomConfigItem>
                        ))}
                      </RoomConfigGrid>
                    </Section>
                  )}
                  {selectedTheme === 'package_optimization' && (
                    <Section>
                      <Label>套餐数量配置范围</Label>
                      <RoomConfigGrid>
                        {PRESET_THEMES.find(t => t.id === 'package_optimization')?.defaultConfig.packages.map((pkg, index) => (
                          <RoomConfigItem key={index}>
                            <div className="room-name">{pkg.name}</div>
                            <div className="input-group">
                              <InputNumber 
                                min={pkg.range[0]} 
                                max={pkg.range[1]} 
                                defaultValue={pkg.range[0]} 
                              />
                              <span>至</span>
                              <InputNumber 
                                min={pkg.range[0]} 
                                max={pkg.range[1]} 
                                defaultValue={pkg.range[1]} 
                              />
                              <span>人</span>
                            </div>
                          </RoomConfigItem>
                        ))}
                      </RoomConfigGrid>
                    </Section>
                  )}
                </Section>
              )}
            </Section>
          ) : (
            <>
              <Section>
                <Label>开始时间</Label>
                <DatePicker 
                  style={{ width: '100%' }} 
                  onChange={(date) => setConfig({ ...config, startTime: date })}
                />
              </Section>

              <Section>
                <Label>决策目标 (最多选择3个)</Label>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择决策目标"
                  maxTagCount={3}
                  value={config.goals}
                  onChange={(values) => setConfig({ ...config, goals: values })}
                >
                  <Select.Option value="wait_time">患者等待时间最短</Select.Option>
                  <Select.Option value="utilization">设备利用率最高</Select.Option>
                  <Select.Option value="profit">利润率最高</Select.Option>
                </Select>
              </Section>

              <Section>
                <Label>可变变量配置</Label>
                {variables.map((variable, index) => (
                  <VariableRow key={index}>
                    <Select
                      value={variable.type}
                      onChange={(value) => {
                        const newVariables = [...variables];
                        newVariables[index].type = value;
                        newVariables[index].name = '';
                        setVariables(newVariables);
                      }}
                      options={variableTypeOptions}
                      placeholder="选择变量类型"
                    />
                    <Select
                      value={variable.name}
                      onChange={(value) => {
                        const newVariables = [...variables];
                        newVariables[index].name = value;
                        newVariables[index].unit = getUnitByType(newVariables[index].type, value);
                        setVariables(newVariables);
                      }}
                      options={variableNameOptions[variable.type as keyof typeof variableNameOptions]}
                      placeholder="选择变量名称"
                    />
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <InputNumber
                        value={variable.initialValue}
                        onChange={(value) => {
                          const newVariables = [...variables];
                          newVariables[index].initialValue = value || 0;
                          setVariables(newVariables);
                        }}
                        placeholder="初始值"
                        style={{ flex: 1 }}
                      />
                      {variable.unit && (
                        <div style={{ 
                          lineHeight: '32px', 
                          color: '#666', 
                          fontSize: '14px',
                          padding: '0 8px'
                        }}>
                          {variable.unit}
                        </div>
                      )}
                    </div>
                    <DeleteButton
                      type="text"
                      icon={<SettingOutlined />}
                      onClick={() => handleDeleteVariable(index)}
                    />
                  </VariableRow>
                ))}
                <div style={{ marginTop: '12px' }}>
                  <AddButton onClick={handleAddVariable}>
                    <SettingOutlined />
                    添加可变变量
                  </AddButton>
                </div>
              </Section>

              <Section>
                <Label>约束配置</Label>
                {constraints.map((constraint, index) => (
                  <ConstraintRow key={index}>
                    <Select
                      value={constraint.name}
                      onChange={(value) => {
                        const newConstraints = [...constraints];
                        newConstraints[index].name = value;
                        setConstraints(newConstraints);
                      }}
                      options={[
                        { value: '健康一男数量', label: '健康一男数量' },
                        { value: '健康一女数量', label: '健康一女数量' },
                        { value: '健康二男数量', label: '健康二男数量' },
                        { value: '健康二女数量', label: '健康二女数量' },
                        { value: '深度男数量', label: '深度男数量' },
                        { value: '深度女数量', label: '深度女数量' },
                        { value: '结束时间', label: '结束时间' },
                        { value: '医生工作时间', label: '医生工作时间' },
                        { value: '设备使用率', label: '设备使用率' },
                        { value: '科室负载', label: '科室负载' }
                      ]}
                    />
                    <Select
                      value={constraint.operator}
                      onChange={(value) => {
                        const newConstraints = [...constraints];
                        newConstraints[index].operator = value;
                        setConstraints(newConstraints);
                      }}
                      options={[
                        { value: '大于', label: '大于' },
                        { value: '小于', label: '小于' },
                        { value: '等于', label: '等于' },
                        { value: '早于', label: '早于' },
                        { value: '晚于', label: '晚于' }
                      ]}
                    />
                    <Input
                      value={constraint.value}
                      onChange={(e) => {
                        const newConstraints = [...constraints];
                        newConstraints[index].value = e.target.value;
                        setConstraints(newConstraints);
                      }}
                    />
                  </ConstraintRow>
                ))}
                <div style={{ marginTop: '12px' }}>
                  <AddButton onClick={handleAddConstraint}>
                    <SettingOutlined />
                    添加约束配置
                  </AddButton>
                </div>
              </Section>
            </>
          )}

          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <Button onClick={onClose} style={{ marginRight: 16 }}>取消</Button>
            <Button type="primary" onClick={handleRunDecision}>运行决策</Button>
          </div>
        </Container>

        {optimizationData.length > 0 && (
          <OptimizationMonitor data={optimizationData} />
        )}

        {showSimConfig && (
          <SimulationConfigPanel
            visible={showSimConfig}
            onClose={() => setShowSimConfig(false)}
          />
        )}
      </MainContent>

      <DecisionMonitor theme={selectedTheme as 'room_optimization' | 'package_optimization' || 'room_optimization'} />
    </PageLayout>
  );
}

export default DecisionConfig; 