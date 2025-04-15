import React, { useState } from 'react';
import { DatePicker, Button, Card, Space, message } from 'antd';
import { HistoryOutlined, CheckOutlined, SyncOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const Container = styled.div`
  width: 320px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin: 0 0 16px 0;
  color: #1f1f1f;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DataPreview = styled(Card)`
  margin: 16px 0;
  .ant-card-head {
    min-height: 40px;
    padding: 0 12px;
    font-size: 14px;
    .ant-card-head-title {
      padding: 8px 0;
    }
  }
  .ant-card-body {
    padding: 12px;
  }
`;

const DataItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  color: #666;
  font-size: 14px;
`;

const Value = styled.span`
  color: #1f1f1f;
  font-size: 14px;
  font-weight: 500;
`;

const QuickSelectButton = styled(Button)`
  flex: 1;
  font-size: 12px;
  padding: 4px 8px;
  height: 28px;
`;

interface HistoryDatePickerProps {
  onDateChange?: (date: Dayjs | null) => void;
  onApplyDate?: (date: Dayjs) => void;
  onSwitchToSimulate?: (date: Dayjs) => void;
}

export default function HistoryDatePicker({ onDateChange, onApplyDate, onSwitchToSimulate }: HistoryDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isApplied, setIsApplied] = useState(false);

  // 模拟数据
  const previewData = {
    totalPatients: 1250,
    avgWaitTime: '32分钟',
    peakHourFlow: '9:00-10:00'
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    setIsApplied(false);
    onDateChange?.(date);
  };

  const handleQuickSelect = (daysAgo: number) => {
    const date = dayjs().subtract(daysAgo, 'day');
    handleDateChange(date);
  };

  const handleApply = () => {
    if (selectedDate) {
      onApplyDate?.(selectedDate);
      setIsApplied(true);
      message.success('已应用所选日期');
    }
  };

  const handleSync = () => {
    if (selectedDate) {
      console.log('HistoryDatePicker - handleSync - selectedDate:', selectedDate.format('YYYY-MM-DD HH:mm:ss'));
      onSwitchToSimulate?.(selectedDate);
    } else {
      message.error('请先选择并应用历史日期');
    }
  };

  return (
    <Container>
      <Title>
        <HistoryOutlined />
        历史数据选择
      </Title>

      <DatePicker
        style={{ width: '100%', marginBottom: '8px' }}
        placeholder="选择历史日期"
        onChange={handleDateChange}
        value={selectedDate}
      />

      <Space style={{ width: '100%', marginBottom: '16px' }}>
        <QuickSelectButton onClick={() => handleQuickSelect(1)}>
          昨天
        </QuickSelectButton>
        <QuickSelectButton onClick={() => handleQuickSelect(2)}>
          前天
        </QuickSelectButton>
        <QuickSelectButton onClick={() => handleQuickSelect(7)}>
          上周同日
        </QuickSelectButton>
      </Space>

      {selectedDate && (
        <>
          <DataPreview
            title="数据预览"
            size="small"
          >
            <DataItem>
              <Label>总接诊人数</Label>
              <Value>{previewData.totalPatients}人</Value>
            </DataItem>
            <DataItem>
              <Label>平均等待时间</Label>
              <Value>{previewData.avgWaitTime}</Value>
            </DataItem>
            <DataItem>
              <Label>高峰时段</Label>
              <Value>{previewData.peakHourFlow}</Value>
            </DataItem>
          </DataPreview>

          <Button
            type="primary"
            icon={<CheckOutlined />}
            style={{ width: '100%', height: 40, marginBottom: '12px' }}
            onClick={handleApply}
            disabled={isApplied}
          >
            {isApplied ? '已应用' : '应用所选日期'}
          </Button>

          <Button
            icon={<SyncOutlined />}
            style={{ width: '100%', height: 40 }}
            onClick={handleSync}
            disabled={!isApplied}
          >
            同步到推演模式参数
          </Button>
        </>
      )}
    </Container>
  );
} 