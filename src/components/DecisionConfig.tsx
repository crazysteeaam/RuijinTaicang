import React, { useState } from 'react';
import styled from '@emotion/styled';
import { DatePicker, Select, Input, Button, InputNumber, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import { PlusOutlined, SettingOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons';
import SimulationConfigPanel from './SimulationConfigPanel';
import DecisionMonitor from './DecisionMonitor';

const PageLayout = styled.div`
  display: flex;
  gap: 24px;
`;

const Container = styled.div`
  width: 480px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 24px;
  color: #1f1f1f;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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

const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.div`
  font-size: 14px;
  color: #1f1f1f;
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
    { value: 'package_a_male', label: '套餐一男性' },
    { value: 'package_a_female', label: '套餐一女性' },
    { value: 'package_b_male', label: '套餐二男性' },
    { value: 'package_b_female', label: '套餐二女性' },
    { value: 'package_c_male', label: '套餐三男性' },
    { value: 'package_c_female', label: '套餐三女性' }
  ],
  process: [
    { value: 'service_time', label: '服务时长' },
    { value: 'transfer_time', label: '转移时间' },
    { value: 'queue_limit', label: '排队上限' },
    { value: 'start_time', label: '开始时间' },
    { value: 'end_time', label: '结束时间' }
  ]
};

export default function DecisionConfig() {
  const [optimizationTime, setOptimizationTime] = useState<Dayjs | null>(null);
  const [targets, setTargets] = useState<string[]>(['wait_time']);
  const [constraints, setConstraints] = useState<ConstraintConfig[]>([
    { name: '套餐一数量', operator: '大于', value: '50' },
    { name: '结束时间', operator: '早于', value: '10:20:00' }
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

  const handleConfigClick = () => {
    setShowSimConfig(true);
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

  return (
    <PageLayout>
      <Container>
        <TitleSection>
          <ConfigButton 
            type="default"
            icon={<SettingOutlined />}
            onClick={handleConfigClick}
          >
            模拟参数配置
          </ConfigButton>
          <Title>决策全局配置选项</Title>
        </TitleSection>

        <Section>
          <Label>开始时间:</Label>
          <DatePicker
            showTime
            style={{ width: '100%' }}
            placeholder="请选择开始时间"
            onChange={(date) => setOptimizationTime(date)}
          />
        </Section>

        <Section>
          <Label>决策目标: (最多选择3个)</Label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            value={targets}
            onChange={handleTargetChange}
            options={targetOptions}
            maxTagCount={3}
            placeholder="请选择决策目标"
          />
        </Section>

        <Section>
          <Label>可变变量配置:</Label>
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
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteVariable(index)}
              />
            </VariableRow>
          ))}
          <div style={{ marginTop: '12px' }}>
            <AddButton onClick={handleAddVariable}>
              <PlusOutlined />
              添加可变变量
            </AddButton>
          </div>
        </Section>

        <Section>
          <Label>约束配置:</Label>
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
                  { value: '套餐一数量', label: '套餐一数量' },
                  { value: '套餐二数量', label: '套餐二数量' },
                  { value: '套餐三数量', label: '套餐三数量' },
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
              <PlusOutlined />
              添加约束配置
            </AddButton>
          </div>
        </Section>

        <RunButton 
          type="primary"
          icon={<PlayCircleOutlined />}
          onClick={handleOptimize}
          loading={isOptimizing}
        >
          运行决策
        </RunButton>
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
    </PageLayout>
  );
} 