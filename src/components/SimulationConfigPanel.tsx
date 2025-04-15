import React, { useState } from 'react';
import { Modal, Menu, Form, Input, InputNumber, Select, Table, Button, Slider } from 'antd';
import { CalendarOutlined, OrderedListOutlined, TeamOutlined, AppstoreOutlined, PlusOutlined, DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const { Option } = Select;

const ContentContainer = styled.div`
  display: flex;
  height: 600px;
`;

const MenuContainer = styled.div`
  width: 200px;
  border-right: 1px solid #f0f0f0;
  flex-shrink: 0;
`;

const ConfigContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
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

  .ant-select {
    .ant-select-selector {
      padding: 4px !important;
      min-height: 32px;
      height: auto !important;
      flex-wrap: wrap;
    }

    .ant-select-selection-item {
      background: #f5f5f5;
      border: none;
      border-radius: 4px;
      margin: 2px;
      padding: 2px 8px;
      font-size: 13px;
      height: 24px;
      line-height: 20px;
      display: inline-flex;
      align-items: center;
      
      .anticon-close {
        color: #999;
        font-size: 10px;
        margin-left: 6px;
        
        &:hover {
          color: #666;
        }
      }
    }

    .ant-select-selection-overflow {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
  }
`;

const DeleteButton = styled(Button)`
  color: #ff4d4f;
  &:hover {
    color: #ff7875;
    background: #fff1f0;
  }
`;

const AddPackageButton = styled(Button)`
  margin-top: 16px;
  border-style: dashed;
`;

interface SimulationConfigPanelProps {
  visible: boolean;
  onClose: () => void;
}

interface TimeSlot {
  key: string;
  timeRange: string;
  distribution: 'fixed' | 'normal' | 'poisson' | 'uniform';
  fixedValue?: number;
  mean?: number;
  stdDev?: number;
  lambda?: number;
  min?: number;
  max?: number;
}

// 定义类型
interface StaffGroup {
  key: string;
  name: string;
  count: number;
  workTime: string[];
}

interface Package {
  key: string;
  name: string;
  items: string[];
  price: number;
}

interface ProfitRate {
  key: string;
  name: string;
  rate: number;
}

// 预约信息配置
const AppointmentConfig = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { key: '1', timeRange: '08:00-09:00', distribution: 'fixed', fixedValue: 20 },
    { key: '2', timeRange: '09:00-10:00', distribution: 'normal', mean: 30, stdDev: 8 },
    { key: '3', timeRange: '10:00-11:00', distribution: 'normal', mean: 25, stdDev: 6 },
    { key: '4', timeRange: '11:00-12:00', distribution: 'normal', mean: 20, stdDev: 5 },
    { key: '5', timeRange: '13:00-14:00', distribution: 'poisson', lambda: 15 },
    { key: '6', timeRange: '14:00-15:00', distribution: 'uniform', min: 15, max: 25 },
    { key: '7', timeRange: '15:00-16:00', distribution: 'normal', mean: 15, stdDev: 4 },
    { key: '8', timeRange: '16:00-17:00', distribution: 'fixed', fixedValue: 10 }
  ]);

  const handleTimeSlotChange = (key: string, field: keyof TimeSlot, value: string | number) => {
    setTimeSlots(timeSlots.map(slot => {
      if (slot.key !== key) return slot;
      
      // 当分布类型改变时，重置相关字段
      if (field === 'distribution') {
        const distribution = value as TimeSlot['distribution'];
        const newSlot: TimeSlot = { key: slot.key, timeRange: slot.timeRange, distribution };
        switch (distribution) {
          case 'fixed':
            newSlot.fixedValue = 20;
            break;
          case 'normal':
            newSlot.mean = 20;
            newSlot.stdDev = 5;
            break;
          case 'poisson':
            newSlot.lambda = 20;
            break;
          case 'uniform':
            newSlot.min = 15;
            newSlot.max = 25;
            break;
        }
        return newSlot;
      }
      
      return { ...slot, [field]: value };
    }));
  };

  const renderDistributionFields = (record: TimeSlot) => {
    switch (record.distribution) {
      case 'fixed':
        return [
          {
            title: '固定值',
            value: record.fixedValue,
            onChange: (value: number | null) => value !== null && handleTimeSlotChange(record.key, 'fixedValue', value)
          }
        ];
      case 'normal':
        return [
          {
            title: '均值',
            value: record.mean,
            onChange: (value: number | null) => value !== null && handleTimeSlotChange(record.key, 'mean', value)
          },
          {
            title: '标准差',
            value: record.stdDev,
            onChange: (value: number | null) => value !== null && handleTimeSlotChange(record.key, 'stdDev', value)
          }
        ];
      case 'poisson':
        return [
          {
            title: 'λ值',
            value: record.lambda,
            onChange: (value: number | null) => value !== null && handleTimeSlotChange(record.key, 'lambda', value)
          }
        ];
      case 'uniform':
        return [
          {
            title: '最小值',
            value: record.min,
            onChange: (value: number | null) => value !== null && handleTimeSlotChange(record.key, 'min', value)
          },
          {
            title: '最大值',
            value: record.max,
            onChange: (value: number | null) => value !== null && handleTimeSlotChange(record.key, 'max', value)
          }
        ];
      default:
        return [];
    }
  };

  return (
    <div>
      <FormSection>
        <h4>时间段预约人数</h4>
        <Table<TimeSlot>
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
              render: (value: TimeSlot['distribution'], record: TimeSlot) => (
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
            ...renderDistributionFields(timeSlots[0]).map((field, index) => ({
              title: field.title,
              dataIndex: `param${index}`,
              width: 100,
              render: (_: unknown, record: TimeSlot) => {
                const fields = renderDistributionFields(record);
                const currentField = fields[index];
                return currentField ? (
                  <InputNumber
                    min={0}
                    value={currentField.value}
                    onChange={currentField.onChange}
                    style={{ width: '100%' }}
                  />
                ) : null;
              }
            }))
          ]}
          dataSource={timeSlots}
          pagination={false}
        />
        <div style={{ marginTop: 8, color: '#666', fontSize: 12 }}>
          说明：
          <ul style={{ paddingLeft: 20, marginTop: 4 }}>
            <li>固定值：每个时段固定预约人数</li>
            <li>正态分布：预约人数服从正态分布，可设置均值和标准差</li>
            <li>泊松分布：适用于随机到达的场景，λ值表示单位时间内的平均到达人数</li>
            <li>均匀分布：在最小值和最大值之间等概率分布</li>
          </ul>
        </div>
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
const ProcessConfig = () => {
  const [priorityStrategy, setPriorityStrategy] = useState('queue_length');
  const [priorityItems, setPriorityItems] = useState(['blood']); // 默认优先安排血检
  
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
const ResourceConfig = () => {
  const [staffGroups, setStaffGroups] = useState<StaffGroup[]>([
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
              render: (value: string, record: StaffGroup) => (
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
              render: (value: number, record: StaffGroup) => (
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
              render: (value: string[], record: StaffGroup) => (
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
              render: (_: unknown, record: StaffGroup) => (
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
const BusinessConfig = () => {
  const [packages, setPackages] = useState<Package[]>([
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
              render: (value: string, record: unknown) => {
                const pkg = record as Package;
                return (
                  <Input
                    value={value}
                    onChange={(e) => handlePackageChange(pkg.key, 'name', e.target.value)}
                    placeholder="输入套餐名称"
                    style={{ width: '100%' }}
                  />
                );
              }
            },
            { 
              title: '包含项目',
              dataIndex: 'items',
              render: (value: string[], record: unknown) => {
                const pkg = record as Package;
                return (
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="选择检查项目"
                    value={value}
                    onChange={(value) => handlePackageChange(pkg.key, 'items', value)}
                    options={groupedExamItems}
                    maxTagCount={10}
                    menuItemSelectedIcon={null}
                    optionFilterProp="label"
                    listHeight={320}
                    popupClassName="package-items-dropdown"
                  />
                );
              }
            },
            { 
              title: '套餐价格',
              dataIndex: 'price',
              width: 120,
              render: (value: number, record: unknown) => {
                const pkg = record as Package;
                return (
                  <InputNumber
                    value={value}
                    onChange={(value) => handlePackageChange(pkg.key, 'price', value || 0)}
                    placeholder="输入价格"
                    min={0}
                    step={100}
                    addonAfter="元"
                    style={{ width: '100%' }}
                  />
                );
              }
            },
            {
              title: '操作',
              key: 'action',
              width: 60,
              render: (_: unknown, record: unknown) => {
                const pkg = record as Package;
                return (
                  <DeleteButton
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemovePackage(pkg.key)}
                    disabled={packages.length === 1}
                  />
                );
              }
            }
          ]}
          dataSource={packages}
          pagination={false}
        />
        <AddPackageButton type="dashed" block icon={<PlusOutlined />} onClick={handleAddPackage}>
          添加套餐
        </AddPackageButton>
      </FormSection>
    </div>
  );
};

// 成本参数配置
const CostConfig = () => {
  const [fixedCost, setFixedCost] = useState(0.5); // 每分钟基础设施成本（元）
  
  // 各个检查项目的利润率配置
  const [profitRates, setProfitRates] = useState<ProfitRate[]>([
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
            说明：体检中心开门期间每分钟需要支付的基础设施成本，包括场地、设备折旧等
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
              render: (value: number, record: ProfitRate) => (
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

export default function SimulationConfigPanel({ visible, onClose }: SimulationConfigPanelProps) {
  const [selectedKey, setSelectedKey] = useState('1');

  const menuItems = [
    {
      key: '1',
      icon: <CalendarOutlined />,
      label: '预约信息',
    },
    {
      key: '2',
      icon: <OrderedListOutlined />,
      label: '流程参数',
    },
    {
      key: '3',
      icon: <TeamOutlined />,
      label: '资源配置',
    },
    {
      key: '4',
      icon: <AppstoreOutlined />,
      label: '业务策略',
    },
    {
      key: '5',
      icon: <DollarOutlined />,
      label: '成本参数',
    }
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <AppointmentConfig />;
      case '2':
        return <ProcessConfig />;
      case '3':
        return <ResourceConfig />;
      case '4':
        return <BusinessConfig />;
      case '5':
        return <CostConfig />;
      default:
        return null;
    }
  };

  return (
    <Modal
      title="模拟参数配置"
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="reset">重置</Button>,
        <Button key="save" type="primary" onClick={onClose}>
          保存
        </Button>
      ]}
    >
      <ContentContainer>
        <MenuContainer>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => setSelectedKey(key)}
            style={{ borderRight: 'none' }}
          />
        </MenuContainer>
        <ConfigContent>
          {renderContent()}
        </ConfigContent>
      </ContentContainer>
    </Modal>
  );
} 