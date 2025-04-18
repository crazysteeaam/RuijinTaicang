import React, { useState } from 'react';
import { Card, Modal, Form, Input, InputNumber, Select, Table, Button, Slider } from 'antd';
import { CalendarOutlined, OrderedListOutlined, TeamOutlined, AppstoreOutlined, DollarOutlined, PlusOutlined, DeleteOutlined, CheckCircleOutlined, UpOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const { Option } = Select;

const CardsContainer = styled.div<{ collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-height: ${props => props.collapsed ? '0' : '2000px'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const ConfigButton = styled(Button)`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: 40px;
  cursor: pointer;
  position: relative;
  z-index: 11;

  &:hover {
    background: #fafafa;
  }

  .button-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .completion-status {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right: 16px;
    color: #52c41a;
  }
`;

const ConfigCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  .ant-card-body {
    padding: 16px;
    display: flex;
    align-items: center;
  }
  
  .anticon {
    font-size: 24px;
    margin-right: 12px;
  }
  
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
  
  &.completed {
    border-left: 4px solid #52c41a;
  }
`;

const ConfigSummary = styled.div`
  margin-top: 8px;
  padding: 8px 12px;
  background: #f9f9f9;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
`;

const ConfigItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const ConfigLabel = styled.span`
  color: #666;
`;

const ConfigValue = styled.span`
  font-weight: 500;
`;

const FormSection = styled.div`
  margin-bottom: 24px;
  
  h4 {
    margin-bottom: 16px;
    color: #1890ff;
    font-size: 16px;
    font-weight: 500;
  }
`;

const PackageTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: #fafafa;
    font-weight: 500;
    padding: 12px 8px;
  }
  
  .ant-table-tbody > tr > td {
    padding: 12px 8px;
    vertical-align: top;
  }
`;

// 预约信息配置
const AppointmentConfig = ({ onSave }) => {
  const [timeSlots, setTimeSlots] = useState([
    { key: '1', timeRange: '08:00-09:00', distribution: 'fixed', fixedValue: 20 },
    { key: '2', timeRange: '09:00-10:00', distribution: 'normal', mean: 30, stdDev: 8 },
    { key: '3', timeRange: '10:00-11:00', distribution: 'normal', mean: 25, stdDev: 6 },
    { key: '4', timeRange: '11:00-12:00', distribution: 'normal', mean: 20, stdDev: 5 },
    { key: '5', timeRange: '13:00-14:00', distribution: 'poisson', lambda: 15 },
    { key: '6', timeRange: '14:00-15:00', distribution: 'uniform', min: 15, max: 25 },
    { key: '7', timeRange: '15:00-16:00', distribution: 'normal', mean: 15, stdDev: 4 },
    { key: '8', timeRange: '16:00-17:00', distribution: 'fixed', fixedValue: 10 }
  ]);

  const handleTimeSlotChange = (key: string, field: string, value: string | number) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.key === key ? { ...slot, [field]: value } : slot
    ));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        timeSlots,
        // 其他预约相关数据
      });
    }
  };

  return (
    <div>
      <FormSection>
        <h4>时间段预约人数</h4>
        <Table
          size="small"
          columns={[
            { 
              title: '时间段',
              dataIndex: 'timeRange',
              width: 120
            },
            {
              title: '分布类型',
              dataIndex: 'distribution',
              width: 120,
              render: (value, record) => (
                <Select
                  value={value}
                  style={{ width: '100%' }}
                  onChange={(value) => handleTimeSlotChange(record.key, 'distribution', value)}
                >
                  <Option value="fixed">固定值</Option>
                  <Option value="normal">正态分布</Option>
                  <Option value="poisson">泊松分布</Option>
                  <Option value="uniform">均匀分布</Option>
                </Select>
              )
            },
            {
              title: '参数',
              dataIndex: 'param',
              render: (_, record) => {
                switch (record.distribution) {
                  case 'fixed':
                    return (
                      <InputNumber
                        min={0}
                        value={record.fixedValue}
                        onChange={(value) => handleTimeSlotChange(record.key, 'fixedValue', value || 0)}
                        style={{ width: '100%' }}
                      />
                    );
                  case 'normal':
                    return (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <InputNumber
                          min={0}
                          value={record.mean}
                          onChange={(value) => handleTimeSlotChange(record.key, 'mean', value || 0)}
                          placeholder="均值"
                          style={{ width: '50%' }}
                        />
                        <InputNumber
                          min={0}
                          value={record.stdDev}
                          onChange={(value) => handleTimeSlotChange(record.key, 'stdDev', value || 0)}
                          placeholder="标准差"
                          style={{ width: '50%' }}
                        />
                      </div>
                    );
                  case 'poisson':
                    return (
                      <InputNumber
                        min={0}
                        value={record.lambda}
                        onChange={(value) => handleTimeSlotChange(record.key, 'lambda', value || 0)}
                        style={{ width: '100%' }}
                      />
                    );
                  case 'uniform':
                    return (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <InputNumber
                          min={0}
                          value={record.min}
                          onChange={(value) => handleTimeSlotChange(record.key, 'min', value || 0)}
                          placeholder="最小值"
                          style={{ width: '50%' }}
                        />
                        <InputNumber
                          min={0}
                          value={record.max}
                          onChange={(value) => handleTimeSlotChange(record.key, 'max', value || 0)}
                          placeholder="最大值"
                          style={{ width: '50%' }}
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              }
            }
          ]}
          dataSource={timeSlots}
          pagination={false}
        />
      </FormSection>

      <FormSection>
        <h4>体检套餐选择比例</h4>
        <Form.Item label="基础套餐">
          <InputNumber addonAfter="%" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item label="进阶套餐">
          <InputNumber addonAfter="%" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item label="高端套餐">
          <InputNumber addonAfter="%" style={{ width: 120 }} />
        </Form.Item>
      </FormSection>

      <FormSection>
        <h4>增补项目概率</h4>
        <Form.Item label="增补概率">
          <Slider range marks={{ 0: '0%', 100: '100%' }} defaultValue={[20, 40]} />
        </Form.Item>
      </FormSection>
    </div>
  );
};

// 流程参数配置
const ProcessConfig = ({ onSave }) => {
  const [priorityStrategy, setPriorityStrategy] = useState('queue_length');
  const [priorityItems, setPriorityItems] = useState(['blood']); // 默认优先安排血检
  
  const handleSave = () => {
    if (onSave) {
      onSave({
        priorityStrategy,
        priorityItems,
        // 其他流程相关数据
      });
    }
  };

  return (
    <div>
      <FormSection>
        <h4>体检顺序策略</h4>
        <Form.Item label="优先级策略">
          <Select 
            style={{ width: '100%' }} 
            value={priorityStrategy}
            onChange={setPriorityStrategy}
          >
            <Option value="queue_length">排队人数少优先</Option>
            <Option value="wait_time">排队时间少优先</Option>
            <Option value="package">按套餐策略优先</Option>
          </Select>
        </Form.Item>

        {priorityStrategy === 'package' && (
          <div>
            <Form.Item label="基础套餐优先级">
              <Select style={{ width: '100%' }}>
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
              </Select>
            </Form.Item>
            <Form.Item label="进阶套餐优先级">
              <Select style={{ width: '100%' }}>
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
              </Select>
            </Form.Item>
            <Form.Item label="高端套餐优先级">
              <Select style={{ width: '100%' }}>
                <Option value="high">高</Option>
                <Option value="medium">中</Option>
                <Option value="low">低</Option>
              </Select>
            </Form.Item>
          </div>
        )}
      </FormSection>

      <FormSection>
        <h4>特殊项目设置</h4>
        <Form.Item label="优先安排项目">
          <Select 
            mode="multiple" 
            style={{ width: '100%' }} 
            placeholder="选择需要优先安排的项目"
            value={priorityItems}
            onChange={setPriorityItems}
          >
            <Option value="blood">血常规</Option>
            <Option value="heart">心电图</Option>
            <Option value="ct">CT</Option>
            <Option value="ultrasound">B超</Option>
          </Select>
        </Form.Item>
      </FormSection>
    </div>
  );
};

// 资源配置
const ResourceConfig = ({ onSave }) => {
  const [staffGroups, setStaffGroups] = useState([
    { key: '1', name: '医生组', count: 12, workTime: ['morning', 'afternoon'] },
    { key: '2', name: '护士组', count: 15, workTime: ['morning', 'afternoon'] },
    { key: '3', name: '技师组', count: 8, workTime: ['morning', 'afternoon'] },
    { key: '4', name: '导医组', count: 6, workTime: ['morning', 'afternoon'] }
  ]);

  const handleAddStaffGroup = () => {
    const newKey = String(staffGroups.length + 1);
    setStaffGroups([...staffGroups, { key: newKey, name: '', count: 0, workTime: [] }]);
  };

  const handleStaffGroupChange = (key: string, field: 'name' | 'count' | 'workTime', value: string | number | string[]) => {
    setStaffGroups(staffGroups.map(group => 
      group.key === key ? { ...group, [field]: value } : group
    ));
  };

  const handleRemoveStaffGroup = (key: string) => {
    setStaffGroups(staffGroups.filter(group => group.key !== key));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        staffGroups,
        // 其他资源相关数据
      });
    }
  };

  return (
    <div>
      <FormSection>
        <h4>人员组配置</h4>
        <Table
          size="small"
          columns={[
            { 
              title: '人员组名称',
              dataIndex: 'name',
              render: (value, record) => (
                <Input
                  value={value}
                  onChange={(e) => handleStaffGroupChange(record.key, 'name', e.target.value)}
                  placeholder="输入人员组名称"
                />
              )
            },
            { 
              title: '总人数',
              dataIndex: 'count',
              render: (value, record) => (
                <InputNumber
                  min={0}
                  value={value}
                  onChange={(value) => handleStaffGroupChange(record.key, 'count', value || 0)}
                />
              )
            },
            { 
              title: '工作时间', 
              dataIndex: 'workTime',
              render: (value, record) => (
                <Select 
                  style={{ width: '100%' }} 
                  mode="multiple" 
                  placeholder="选择工作时间段"
                  value={value}
                  onChange={(value) => handleStaffGroupChange(record.key, 'workTime', value)}
                >
                  <Option value="morning">上午班（8:00-12:00）</Option>
                  <Option value="afternoon">下午班（13:00-17:00）</Option>
                  <Option value="full">全天班（8:00-17:00）</Option>
                </Select>
              )
            },
            {
              title: '操作',
              key: 'action',
              render: (_, record) => (
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveStaffGroup(record.key)}
                />
              )
            }
          ]}
          dataSource={staffGroups}
          pagination={false}
        />
        <div style={{ marginTop: 16 }}>
          <Button type="dashed" block icon={<PlusOutlined />} onClick={handleAddStaffGroup}>
            添加人员组
          </Button>
        </div>
      </FormSection>
    </div>
  );
};

// 业务策略配置
const BusinessConfig = ({ onSave }) => {
  const [packages, setPackages] = useState([
    { 
      key: '1', 
      name: '健康一男', 
      items: [
        'blood', // 血检
        'urine', // 尿检
        'breathing', // 呼气试验
        'ultrasound', // 腹部彩超
        'heart', // 心电图
        'chest', // 胸片
        'internal_male', // 内科男
        'surgery_male', // 外科男
        'eye', // 眼科
        'ent' // 五官科
      ], 
      price: 1745
    },
    { 
      key: '2', 
      name: '健康一女', 
      items: [
        'blood',
        'urine',
        'breathing',
        'ultrasound',
        'heart',
        'chest',
        'internal_female',
        'surgery_female',
        'eye',
        'ent'
      ], 
      price: 1745
    },
    { 
      key: '3', 
      name: '健康二男', 
      items: [
        'blood',
        'urine',
        'ultrasound',
        'heart',
        'ct',
        'breathing',
        'internal_male',
        'surgery_male',
        'eye',
        'ent'
      ], 
      price: 2810
    },
    { 
      key: '4', 
      name: '健康二女', 
      items: [
        'blood',
        'urine',
        'ultrasound',
        'heart',
        'ct',
        'breathing',
        'internal_female',
        'surgery_female',
        'eye',
        'ent'
      ], 
      price: 2810
    },
    { 
      key: '5', 
      name: '深度男', 
      items: [
        'blood',
        'urine',
        'ultrasound',
        'heart',
        'ct',
        'breathing',
        'internal_male',
        'surgery_male',
        'eye',
        'ent'
      ], 
      price: 5855
    },
    { 
      key: '6', 
      name: '深度女', 
      items: [
        'blood',
        'urine',
        'ultrasound_special',
        'gynecology_ultrasound',
        'heart',
        'ct',
        'gynecology_exam',
        'breathing',
        'internal_female',
        'surgery_female',
        'eye',
        'ent'
      ], 
      price: 6689
    }
  ]);

  const handleAddPackage = () => {
    const newKey = String(packages.length + 1);
    setPackages([...packages, { key: newKey, name: '', items: [], price: 0 }]);
  };

  const handleRemovePackage = (key: string) => {
    setPackages(packages.filter(pkg => pkg.key !== key));
  };

  const handlePackageChange = (key: string, field: 'name' | 'items' | 'price', value: string | string[] | number) => {
    setPackages(packages.map(pkg =>
      pkg.key === key ? { ...pkg, [field]: value } : pkg
    ));
  };

  const examItems = [
    { label: '血检', value: 'blood', group: '检验' },
    { label: '尿检', value: 'urine', group: '检验' },
    { label: '呼气试验', value: 'breathing', group: '检验' },
    { label: '腹部彩超', value: 'ultrasound', group: '影像' },
    { label: '超声检查', value: 'ultrasound_special', group: '影像' },
    { label: '妇科超声', value: 'gynecology_ultrasound', group: '影像' },
    { label: '心电图', value: 'heart', group: '影像' },
    { label: '胸片', value: 'chest', group: '影像' },
    { label: 'CT检查', value: 'ct', group: '影像' },
    { label: '内科男', value: 'internal_male', group: '临床' },
    { label: '内科女', value: 'internal_female', group: '临床' },
    { label: '外科男', value: 'surgery_male', group: '临床' },
    { label: '外科女', value: 'surgery_female', group: '临床' },
    { label: '眼科', value: 'eye', group: '临床' },
    { label: '五官科', value: 'ent', group: '临床' },
    { label: '妇科检查', value: 'gynecology_exam', group: '临床' }
  ];

  // 按组分类项目
  const groupedExamItems = examItems.reduce((groups, item) => {
    const group = groups.find(g => g.label === item.group);
    if (group) {
      group.options.push({ label: item.label, value: item.value });
    } else {
      groups.push({
        label: item.group,
        options: [{ label: item.label, value: item.value }]
      });
    }
    return groups;
  }, [] as { label: string; options: { label: string; value: string; }[] }[]);

  const handleSave = () => {
    if (onSave) {
      onSave({
        packages,
        // 其他业务相关数据
      });
    }
  };

  return (
    <div>
      <FormSection>
        <h4>套餐设置</h4>
        <PackageTable
          size="middle"
          columns={[
            { 
              title: '套餐名称',
              dataIndex: 'name',
              width: 140,
              render: (value, record) => (
                <Input
                  value={value}
                  onChange={(e) => handlePackageChange(record.key, 'name', e.target.value)}
                  placeholder="输入套餐名称"
                  style={{ width: '100%' }}
                />
              )
            },
            { 
              title: '包含项目',
              dataIndex: 'items',
              render: (value, record) => (
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="选择检查项目"
                  value={value}
                  onChange={(value) => handlePackageChange(record.key, 'items', value)}
                  options={groupedExamItems}
                  maxTagCount={10}
                  menuItemSelectedIcon={null}
                  optionFilterProp="label"
                  listHeight={320}
                  popupClassName="package-items-dropdown"
                />
              )
            },
            { 
              title: '套餐价格',
              dataIndex: 'price',
              width: 120,
              render: (value, record) => (
                <InputNumber
                  value={value}
                  onChange={(value) => handlePackageChange(record.key, 'price', value || 0)}
                  placeholder="输入价格"
                  min={0}
                  step={100}
                  addonAfter="元"
                  style={{ width: '100%' }}
                />
              )
            },
            {
              title: '操作',
              key: 'action',
              width: 60,
              render: (_, record) => (
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemovePackage(record.key)}
                  disabled={packages.length === 1}
                />
              )
            }
          ]}
          dataSource={packages}
          pagination={false}
        />
        <div style={{ marginTop: 16 }}>
          <Button type="dashed" block icon={<PlusOutlined />} onClick={handleAddPackage}>
            添加套餐
          </Button>
        </div>
      </FormSection>
    </div>
  );
};

// 成本参数配置
const CostConfig = ({ onSave }) => {
  const [fixedCost, setFixedCost] = useState(0.5); // 每分钟基础设施成本（元）
  
  // 各个检查项目的利润率配置
  const [profitRates, setProfitRates] = useState([
    { key: 'blood', name: '血检', rate: 30 },
    { key: 'urine', name: '尿检', rate: 25 },
    { key: 'breathing', name: '呼气试验', rate: 35 },
    { key: 'ultrasound', name: '腹部彩超', rate: 40 },
    { key: 'ultrasound_special', name: '超声检查', rate: 40 },
    { key: 'gynecology_ultrasound', name: '妇科超声', rate: 40 },
    { key: 'heart', name: '心电图', rate: 35 },
    { key: 'chest', name: '胸片', rate: 30 },
    { key: 'ct', name: 'CT检查', rate: 45 },
    { key: 'internal_male', name: '内科男', rate: 20 },
    { key: 'internal_female', name: '内科女', rate: 20 },
    { key: 'surgery_male', name: '外科男', rate: 20 },
    { key: 'surgery_female', name: '外科女', rate: 20 },
    { key: 'eye', name: '眼科', rate: 25 },
    { key: 'ent', name: '五官科', rate: 25 },
    { key: 'gynecology_exam', name: '妇科检查', rate: 30 }
  ]);

  const handleProfitRateChange = (key: string, value: number) => {
    setProfitRates(profitRates.map(item => 
      item.key === key ? { ...item, rate: value } : item
    ));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        fixedCost,
        profitRates,
        // 其他成本相关数据
      });
    }
  };

  return (
    <div>
      <FormSection>
        <h4>固定成本配置</h4>
        <Form.Item label="每分钟基础设施成本">
          <InputNumber
            min={0}
            step={0.1}
            value={fixedCost}
            onChange={(value) => setFixedCost(value || 0)}
            addonAfter="元/分钟"
            style={{ width: '100%' }}
          />
          <div style={{ marginTop: 8, color: '#666', fontSize: 12 }}>
            说明：健康管理中心开门期间每分钟需要支付的基础设施成本，包括场地、设备折旧等
          </div>
        </Form.Item>
      </FormSection>

      <FormSection>
        <h4>可变成本配置</h4>
        <div style={{ marginBottom: 16, color: '#666', fontSize: 14 }}>
          配置各个检查项目的利润率（百分比）
        </div>
        <Table
          size="small"
          columns={[
            { 
              title: '检查项目',
              dataIndex: 'name',
              width: 120
            },
            { 
              title: '利润率',
              dataIndex: 'rate',
              render: (value, record) => (
                <InputNumber
                  min={0}
                  max={100}
                  value={value}
                  onChange={(value) => handleProfitRateChange(record.key, value || 0)}
                  addonAfter="%"
                  style={{ width: '100%' }}
                />
              )
            }
          ]}
          dataSource={profitRates}
          pagination={false}
        />
        <div style={{ marginTop: 8, color: '#666', fontSize: 12 }}>
          说明：各检查项目的利润率，用于计算可变成本。利润率 = (收入 - 成本) / 收入 × 100%
        </div>
      </FormSection>
    </div>
  );
};

interface SimulationConfigCardsProps {
  onConfigChange: (configType: string, config: any) => void;
  onCompletionChange?: (isCompleted: boolean, configData: any) => void;
}

const SimulationConfigCards: React.FC<SimulationConfigCardsProps> = ({ 
  onConfigChange,
  onCompletionChange 
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [completedConfigs, setCompletedConfigs] = useState<Record<string, boolean>>({
    appointment: false,
    process: false,
    resource: false,
    business: false,
    cost: false
  });
  const [configData, setConfigData] = useState<any>({});

  const handleCardClick = (configType: string) => {
    setActiveModal(configType);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  const handleConfigSave = (configType: string, data: any) => {
    // 更新配置数据
    const newConfigData = { ...configData, [configType]: data };
    setConfigData(newConfigData);
    
    // 标记为已完成
    const newCompletedConfigs = { ...completedConfigs, [configType]: true };
    setCompletedConfigs(newCompletedConfigs);
    
    // 通知父组件配置变更
    onConfigChange(configType, data);
    
    // 检查是否所有配置都已完成
    const allCompleted = Object.values(newCompletedConfigs).every(value => value === true);
    
    // 通知父组件完成状态变更
    if (onCompletionChange) {
      onCompletionChange(allCompleted, newConfigData);
    }
    
    setActiveModal(null);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'appointment':
        return <AppointmentConfig onSave={(data) => handleConfigSave('appointment', data)} />;
      case 'process':
        return <ProcessConfig onSave={(data) => handleConfigSave('process', data)} />;
      case 'resource':
        return <ResourceConfig onSave={(data) => handleConfigSave('resource', data)} />;
      case 'business':
        return <BusinessConfig onSave={(data) => handleConfigSave('business', data)} />;
      case 'cost':
        return <CostConfig onSave={(data) => handleConfigSave('cost', data)} />;
      default:
        return null;
    }
  };

  // 计算完成的配置数量
  const completedCount = Object.values(completedConfigs).filter(Boolean).length;
  const totalConfigs = Object.keys(completedConfigs).length;

  // 渲染配置摘要
  const renderConfigSummary = (configType: string) => {
    if (!completedConfigs[configType]) return null;
    
    const data = configData[configType];
    if (!data) return null;
    
    switch (configType) {
      case 'appointment':
        return (
          <ConfigSummary>
            <ConfigItem>
              <ConfigLabel>预约总人数:</ConfigLabel>
              <ConfigValue>
                {data.timeSlots?.reduce((sum: number, slot: any) => {
                  if (slot.distribution === 'fixed') return sum + slot.fixedValue;
                  if (slot.distribution === 'normal') return sum + slot.mean;
                  if (slot.distribution === 'poisson') return sum + slot.lambda;
                  if (slot.distribution === 'uniform') return sum + ((slot.min + slot.max) / 2);
                  return sum;
                }, 0) || 0} 人
              </ConfigValue>
            </ConfigItem>
            <ConfigItem>
              <ConfigLabel>时间段数:</ConfigLabel>
              <ConfigValue>{data.timeSlots?.length || 0} 个</ConfigValue>
            </ConfigItem>
          </ConfigSummary>
        );
      case 'process':
        return (
          <ConfigSummary>
            <ConfigItem>
              <ConfigLabel>优先级策略:</ConfigLabel>
              <ConfigValue>
                {data.priorityStrategy === 'queue_length' ? '排队人数少优先' :
                 data.priorityStrategy === 'wait_time' ? '排队时间少优先' :
                 data.priorityStrategy === 'package' ? '按套餐策略优先' : '未知'}
              </ConfigValue>
            </ConfigItem>
            <ConfigItem>
              <ConfigLabel>优先安排项目:</ConfigLabel>
              <ConfigValue>{data.priorityItems?.join(', ') || '无'}</ConfigValue>
            </ConfigItem>
          </ConfigSummary>
        );
      case 'resource':
        return (
          <ConfigSummary>
            <ConfigItem>
              <ConfigLabel>总员工人数:</ConfigLabel>
              <ConfigValue>
                {data.staffGroups?.reduce((sum: number, group: any) => sum + group.count, 0) || 0} 人
              </ConfigValue>
            </ConfigItem>
            <ConfigItem>
              <ConfigLabel>人员组数:</ConfigLabel>
              <ConfigValue>{data.staffGroups?.length || 0} 个</ConfigValue>
            </ConfigItem>
          </ConfigSummary>
        );
      case 'business':
        return (
          <ConfigSummary>
            <ConfigItem>
              <ConfigLabel>套餐数量:</ConfigLabel>
              <ConfigValue>{data.packages?.length || 0} 个</ConfigValue>
            </ConfigItem>
            <ConfigItem>
              <ConfigLabel>套餐列表:</ConfigLabel>
              <ConfigValue>
                {data.packages?.map((pkg: any) => pkg.name).join(', ') || '无'}
              </ConfigValue>
            </ConfigItem>
          </ConfigSummary>
        );
      case 'cost':
        return (
          <ConfigSummary>
            <ConfigItem>
              <ConfigLabel>基础设施成本:</ConfigLabel>
              <ConfigValue>{data.fixedCost || 0} 元/分钟</ConfigValue>
            </ConfigItem>
            <ConfigItem>
              <ConfigLabel>利润率配置:</ConfigLabel>
              <ConfigValue>{data.profitRates?.length || 0} 项</ConfigValue>
            </ConfigItem>
          </ConfigSummary>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ConfigButton onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="button-content">
          <SettingOutlined />
          <span>模拟参数配置</span>
          <div className="completion-status">
            {completedCount > 0 && (
              <>
                <CheckCircleOutlined style={{ fontSize: 16 }} />
                <span>{completedCount}/{totalConfigs}</span>
              </>
            )}
          </div>
        </div>
        {isCollapsed ? <DownOutlined /> : <UpOutlined />}
      </ConfigButton>

      <CardsContainer collapsed={isCollapsed}>
        <div>
          <ConfigCard 
            onClick={() => handleCardClick('appointment')}
            className={completedConfigs.appointment ? 'completed' : ''}
          >
            <CalendarOutlined />
            <h3>预约信息 {completedConfigs.appointment && <CheckCircleOutlined style={{ color: '#52c41a' }} />}</h3>
          </ConfigCard>
          {renderConfigSummary('appointment')}
        </div>
        
        <div>
          <ConfigCard 
            onClick={() => handleCardClick('process')}
            className={completedConfigs.process ? 'completed' : ''}
          >
            <OrderedListOutlined />
            <h3>流程参数 {completedConfigs.process && <CheckCircleOutlined style={{ color: '#52c41a' }} />}</h3>
          </ConfigCard>
          {renderConfigSummary('process')}
        </div>
        
        <div>
          <ConfigCard 
            onClick={() => handleCardClick('resource')}
            className={completedConfigs.resource ? 'completed' : ''}
          >
            <TeamOutlined />
            <h3>资源配置 {completedConfigs.resource && <CheckCircleOutlined style={{ color: '#52c41a' }} />}</h3>
          </ConfigCard>
          {renderConfigSummary('resource')}
        </div>
        
        <div>
          <ConfigCard 
            onClick={() => handleCardClick('business')}
            className={completedConfigs.business ? 'completed' : ''}
          >
            <AppstoreOutlined />
            <h3>业务策略 {completedConfigs.business && <CheckCircleOutlined style={{ color: '#52c41a' }} />}</h3>
          </ConfigCard>
          {renderConfigSummary('business')}
        </div>
        
        <div>
          <ConfigCard 
            onClick={() => handleCardClick('cost')}
            className={completedConfigs.cost ? 'completed' : ''}
          >
            <DollarOutlined />
            <h3>成本参数 {completedConfigs.cost && <CheckCircleOutlined style={{ color: '#52c41a' }} />}</h3>
          </ConfigCard>
          {renderConfigSummary('cost')}
        </div>
      </CardsContainer>

      <Modal
        title={
          activeModal === 'appointment' ? '预约信息配置' :
          activeModal === 'process' ? '流程参数配置' :
          activeModal === 'resource' ? '资源配置' :
          activeModal === 'business' ? '业务策略配置' :
          activeModal === 'cost' ? '成本参数配置' : ''
        }
        open={!!activeModal}
        onCancel={handleModalClose}
        width={800}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            取消
          </Button>,
          <Button 
            key="save" 
            type="primary" 
            onClick={() => {
              // 这里应该调用各个配置组件的保存方法
              // 为了简化，我们直接模拟保存
              if (activeModal) {
                // 根据不同的配置类型，生成模拟数据
                let mockData = {};
                switch (activeModal) {
                  case 'appointment':
                    mockData = {
                      timeSlots: [
                        { key: '1', timeRange: '08:00-09:00', distribution: 'fixed', fixedValue: 20 },
                        { key: '2', timeRange: '09:00-10:00', distribution: 'normal', mean: 30, stdDev: 8 },
                        { key: '3', timeRange: '10:00-11:00', distribution: 'normal', mean: 25, stdDev: 6 },
                        { key: '4', timeRange: '11:00-12:00', distribution: 'normal', mean: 20, stdDev: 5 },
                        { key: '5', timeRange: '13:00-14:00', distribution: 'poisson', lambda: 15 },
                        { key: '6', timeRange: '14:00-15:00', distribution: 'uniform', min: 15, max: 25 },
                        { key: '7', timeRange: '15:00-16:00', distribution: 'normal', mean: 15, stdDev: 4 },
                        { key: '8', timeRange: '16:00-17:00', distribution: 'fixed', fixedValue: 10 }
                      ]
                    };
                    break;
                  case 'process':
                    mockData = {
                      priorityStrategy: 'queue_length',
                      priorityItems: ['blood', 'heart']
                    };
                    break;
                  case 'resource':
                    mockData = {
                      staffGroups: [
                        { key: '1', name: '医生组', count: 12, workTime: ['morning', 'afternoon'] },
                        { key: '2', name: '护士组', count: 15, workTime: ['morning', 'afternoon'] },
                        { key: '3', name: '技师组', count: 8, workTime: ['morning', 'afternoon'] },
                        { key: '4', name: '导医组', count: 6, workTime: ['morning', 'afternoon'] }
                      ]
                    };
                    break;
                  case 'business':
                    mockData = {
                      packages: [
                        { key: '1', name: '健康一男', items: ['blood', 'heart', 'ultrasound'], price: 1745 },
                        { key: '2', name: '健康一女', items: ['blood', 'heart', 'ultrasound'], price: 1745 },
                        { key: '3', name: '健康二男', items: ['blood', 'heart', 'ultrasound', 'ct'], price: 2810 },
                        { key: '4', name: '健康二女', items: ['blood', 'heart', 'ultrasound', 'ct'], price: 2810 },
                        { key: '5', name: '深度男', items: ['blood', 'heart', 'ultrasound', 'ct', 'mri'], price: 5855 },
                        { key: '6', name: '深度女', items: ['blood', 'heart', 'ultrasound', 'ct', 'mri'], price: 5855 }
                      ]
                    };
                    break;
                  case 'cost':
                    mockData = {
                      fixedCost: 0.5,
                      profitRates: [
                        { key: 'blood', name: '血检', rate: 30 },
                        { key: 'urine', name: '尿检', rate: 25 },
                        { key: 'breathing', name: '呼气试验', rate: 35 },
                        { key: 'ultrasound', name: '腹部彩超', rate: 40 },
                        { key: 'ultrasound_special', name: '超声检查', rate: 40 },
                        { key: 'gynecology_ultrasound', name: '妇科超声', rate: 40 },
                        { key: 'heart', name: '心电图', rate: 35 },
                        { key: 'chest', name: '胸片', rate: 30 },
                        { key: 'ct', name: 'CT检查', rate: 45 },
                        { key: 'internal_male', name: '内科男', rate: 20 },
                        { key: 'internal_female', name: '内科女', rate: 20 },
                        { key: 'surgery_male', name: '外科男', rate: 20 },
                        { key: 'surgery_female', name: '外科女', rate: 20 },
                        { key: 'eye', name: '眼科', rate: 25 },
                        { key: 'ent', name: '五官科', rate: 25 },
                        { key: 'gynecology_exam', name: '妇科检查', rate: 30 }
                      ]
                    };
                    break;
                }
                handleConfigSave(activeModal, mockData);
              }
            }}
          >
            保存
          </Button>
        ]}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default SimulationConfigCards; 