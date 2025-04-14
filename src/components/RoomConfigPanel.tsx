import React, { useState } from 'react';
import { Modal, Input, Button, TimePicker, Table, Select, InputNumber, App } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import styled from '@emotion/styled';

const { Option } = Select;

const TimeRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const StyledTimePicker = styled(TimePicker)`
  width: 120px;
`;

const Instructions = styled.div`
  color: #666;
  font-size: 14px;
  margin-top: 16px;
`;

const FormSection = styled.div`
  margin-bottom: 24px;
  
  h4 {
    margin-bottom: 16px;
    color: #1890ff;
  }
`;

interface TimeRange {
  start: Dayjs | null;
  end: Dayjs | null;
}

interface StaffRequirement {
  key: string;
  staffGroup: string;
  count: number;
}

interface RoomConfigPanelProps {
  visible: boolean;
  onClose: () => void;
  roomName: string;
  staffGroups: { key: string; name: string }[];
}

export default function RoomConfigPanel({ visible, onClose, roomName, staffGroups }: RoomConfigPanelProps) {
  const { message } = App.useApp();
  const [processingTime, setProcessingTime] = useState<string>('200');
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>([
    { 
      start: dayjs('07:30', 'HH:mm'),
      end: dayjs('12:00', 'HH:mm')
    }
  ]);
  const [staffRequirements, setStaffRequirements] = useState<StaffRequirement[]>([
    { key: '1', staffGroup: '', count: 1 }
  ]);

  const handleAddTimeRange = () => {
    setTimeRanges([...timeRanges, { start: null, end: null }]);
  };

  const handleRemoveTimeRange = (index: number) => {
    setTimeRanges(timeRanges.filter((_, i) => i !== index));
  };

  const handleTimeChange = (index: number, type: 'start' | 'end', value: Dayjs | null) => {
    const newTimeRanges = [...timeRanges];
    newTimeRanges[index] = {
      ...newTimeRanges[index],
      [type]: value
    };
    setTimeRanges(newTimeRanges);
  };

  const handleAddStaffRequirement = () => {
    const newKey = String(staffRequirements.length + 1);
    setStaffRequirements([...staffRequirements, { key: newKey, staffGroup: '', count: 1 }]);
  };

  const handleRemoveStaffRequirement = (key: string) => {
    setStaffRequirements(staffRequirements.filter(req => req.key !== key));
  };

  const handleStaffRequirementChange = (key: string, field: 'staffGroup' | 'count', value: string | number) => {
    setStaffRequirements(staffRequirements.map(req =>
      req.key === key ? { ...req, [field]: value } : req
    ));
  };

  const handleSave = () => {
    // Validate time ranges
    const hasEmptyTime = timeRanges.some(range => !range.start || !range.end);
    if (hasEmptyTime) {
      message.error('请填写完整的开设时间，不能为空', 3);
      return;
    }

    // Validate time order
    const hasInvalidOrder = timeRanges.some(range => {
      if (!range.start || !range.end) return false;
      return range.end.isBefore(range.start);
    });
    if (hasInvalidOrder) {
      message.error('结束时间必须晚于开始时间', 3);
      return;
    }

    // Validate time overlap
    for (let i = 0; i < timeRanges.length; i++) {
      for (let j = i + 1; j < timeRanges.length; j++) {
        const range1 = timeRanges[i];
        const range2 = timeRanges[j];
        if (!range1.start || !range1.end || !range2.start || !range2.end) continue;
        
        if (
          (range1.start.isBefore(range2.end) && range1.end.isAfter(range2.start)) ||
          (range2.start.isBefore(range1.end) && range2.end.isAfter(range1.start))
        ) {
          message.error('时间段不能重叠', 3);
          return;
        }
      }
    }

    // If all validations pass, close the modal
    onClose();
  };

  return (
    <Modal
      title={`${roomName}参数配置`}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="reset" onClick={() => {
          setTimeRanges([{ 
            start: dayjs('07:30', 'HH:mm'),
            end: dayjs('12:00', 'HH:mm')
          }]);
          setProcessingTime('200');
          setStaffRequirements([{ key: '1', staffGroup: '', count: 1 }]);
        }}>重置</Button>,
        <Button key="save" type="primary" onClick={handleSave}>保存</Button>
      ]}
      width={700}
    >
      <FormSection>
        <h4>处理时间</h4>
        <Input
          value={processingTime}
          onChange={(e) => setProcessingTime(e.target.value)}
          suffix="秒"
          style={{ width: 200 }}
        />
      </FormSection>

      <FormSection>
        <h4>开设时间</h4>
        {timeRanges.map((range, index) => (
          <TimeRangeContainer key={index}>
            <StyledTimePicker
              value={range.start}
              onChange={(time) => handleTimeChange(index, 'start', time)}
              format="HH:mm"
            />
            <span>-</span>
            <StyledTimePicker
              value={range.end}
              onChange={(time) => handleTimeChange(index, 'end', time)}
              format="HH:mm"
            />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveTimeRange(index)}
              disabled={timeRanges.length === 1}
            />
          </TimeRangeContainer>
        ))}
        <Button
          type="link"
          icon={<PlusOutlined />}
          onClick={handleAddTimeRange}
        >
          新增时间段
        </Button>
      </FormSection>

      <FormSection>
        <h4>人员需求配置</h4>
        <Table
          size="small"
          columns={[
            { 
              title: '人员组',
              dataIndex: 'staffGroup',
              render: (value: string, record: StaffRequirement) => (
                <Select
                  style={{ width: 120 }}
                  placeholder="选择人员组"
                  value={value || undefined}
                  onChange={(value) => handleStaffRequirementChange(record.key, 'staffGroup', value)}
                >
                  {staffGroups.map(group => (
                    <Option key={group.key} value={group.key}>{group.name}</Option>
                  ))}
                </Select>
              )
            },
            { 
              title: '需求人数',
              dataIndex: 'count',
              render: (value: number, record: StaffRequirement) => (
                <InputNumber
                  min={1}
                  value={value}
                  onChange={(value) => handleStaffRequirementChange(record.key, 'count', value || 1)}
                />
              )
            },
            {
              title: '操作',
              key: 'action',
              render: (_: unknown, record: StaffRequirement) => (
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveStaffRequirement(record.key)}
                  danger
                  disabled={staffRequirements.length === 1}
                />
              )
            }
          ]}
          dataSource={staffRequirements}
          pagination={false}
        />
        <div style={{ marginTop: 16 }}>
          <Button type="dashed" block icon={<PlusOutlined />} onClick={handleAddStaffRequirement}>
            添加人员需求
          </Button>
        </div>
      </FormSection>

      <Instructions>
        说明：
        <ol style={{ paddingLeft: 20, marginTop: 8 }}>
          <li>处理时间范围为1-3600秒</li>
          <li>时间格式为 HH:mm，如 09:30</li>
          <li>每个时间段不能重叠</li>
          <li>默认为普通窗口，如需设置特殊窗口类型请选择特殊窗口</li>
          <li>所有时间段均为当天时间，结束时间必须大于开始时间</li>
          <li>每个诊室至少需要配置一个人员组</li>
          <li>人员组的实际分配将根据总人数和各诊室需求自动调整</li>
        </ol>
      </Instructions>
    </Modal>
  );
} 