import React, { useState, forwardRef, ForwardedRef } from 'react';
import { Button, Select, Input, Modal, List, Popconfirm, message } from 'antd';
import { SaveOutlined, DeleteOutlined, SettingOutlined, LockOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const Container = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 360px;
  padding: 20px;
  margin: 16px 0;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #1f1f1f;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

interface Template {
  id: string;
  name: string;
  isDefault?: boolean;
  config: {
    speed: number;
    startTime: string;
    duration: number;
  };
}

// 默认模版数据
const defaultTemplates: Template[] = [
  {
    id: 'default-1',
    name: '标准工作日模拟',
    isDefault: true,
    config: {
      speed: 1000,
      startTime: '2024-04-25 08:00:00',
      duration: 28800
    }
  },
  {
    id: 'default-2',
    name: '周末高峰模拟',
    isDefault: true,
    config: {
      speed: 1000,
      startTime: '2024-04-27 09:00:00',
      duration: 25200
    }
  }
];

interface TemplateConfigProps {
  onApplyTemplate: (config: Template['config']) => void;
  currentConfig: Template['config'];
}

interface TemplateConfigRef {
  addTemplateFromHistory: (date: string, config: Template['config']) => string | null;
}

const TemplateConfig = forwardRef<TemplateConfigRef, TemplateConfigProps>(
  function TemplateConfig({ onApplyTemplate, currentConfig }: TemplateConfigProps, ref: ForwardedRef<TemplateConfigRef>) {
    const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
    const [selectedTemplate, setSelectedTemplate] = useState<string>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState('');
    const [isManageModalVisible, setIsManageModalVisible] = useState(false);

    const handleSaveTemplate = () => {
      if (!newTemplateName.trim()) {
        message.error('请输入模版名称');
        return;
      }

      const newTemplate: Template = {
        id: Date.now().toString(),
        name: newTemplateName,
        config: currentConfig
      };

      setTemplates([...templates, newTemplate]);
      setNewTemplateName('');
      setIsModalVisible(false);
      message.success('模版保存成功');
    };

    const handleDeleteTemplate = (templateId: string) => {
      const template = templates.find(t => t.id === templateId);
      if (template?.isDefault) {
        message.error('默认模版不能删除');
        return;
      }
      setTemplates(templates.filter(t => t.id !== templateId));
      message.success('模版删除成功');
    };

    const handleApplyTemplate = (templateId: string) => {
      setSelectedTemplate(templateId);
      const template = templates.find(t => t.id === templateId);
      if (template) {
        onApplyTemplate?.(template.config);
        message.success(`已应用模版：${template.name}`);
      }
    };

    // 从历史模式同步配置时调用此方法
    const addTemplateFromHistory = (date: string, config: Template['config']): string | null => {
      console.log('TemplateConfig - addTemplateFromHistory - called with:', { date, config });
      
      try {
        const templateName = `${date} 模版`;
        const newTemplate: Template = {
          id: Date.now().toString(),
          name: templateName,
          config
        };
        console.log('TemplateConfig - created new template:', newTemplate);

        // 更新模版列表
        setTemplates(prevTemplates => {
          const updatedTemplates = [...prevTemplates, newTemplate];
          console.log('TemplateConfig - updated templates:', updatedTemplates);
          return updatedTemplates;
        });

        // 设置选中的模版
        setSelectedTemplate(newTemplate.id);
        console.log('TemplateConfig - selected template:', newTemplate.id);
        
        // 应用新模版的配置
        onApplyTemplate(config);
        console.log('TemplateConfig - applied template config');

        return templateName;
      } catch (error) {
        console.error('TemplateConfig - error in addTemplateFromHistory:', error);
        return null;
      }
    };

    // 暴露方法给父组件
    React.useImperativeHandle(ref, () => ({
      addTemplateFromHistory
    }), []);

    return (
      <Container>
        <Title>
          <SaveOutlined style={{ color: '#1890ff' }} />
          模版配置
        </Title>

        <Select
          style={{ width: '100%', marginBottom: '12px' }}
          placeholder="选择配置模版"
          value={selectedTemplate}
          onChange={handleApplyTemplate}
          options={templates.map(t => ({ 
            value: t.id, 
            label: (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}>
                <span>{t.name}</span>
                {t.isDefault && <LockOutlined style={{ color: '#999' }} />}
              </div>
            )
          }))}
        />

        <ButtonGroup>
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{ flex: 1 }}
          >
            保存为模版
          </Button>
          <Button
            icon={<SettingOutlined />}
            onClick={() => setIsManageModalVisible(true)}
          >
            管理
          </Button>
        </ButtonGroup>

        {/* 保存模版弹窗 */}
        <Modal
          title="保存为模版"
          open={isModalVisible}
          onOk={handleSaveTemplate}
          onCancel={() => setIsModalVisible(false)}
        >
          <Input
            placeholder="请输入模版名称"
            value={newTemplateName}
            onChange={e => setNewTemplateName(e.target.value)}
            style={{ marginTop: '16px' }}
          />
        </Modal>

        {/* 模版管理弹窗 */}
        <Modal
          title="模版管理"
          open={isManageModalVisible}
          onCancel={() => setIsManageModalVisible(false)}
          footer={null}
          width={480}
        >
          <List
            dataSource={templates}
            renderItem={item => (
              <List.Item
                actions={[
                  !item.isDefault && (
                    <Popconfirm
                      key="delete"
                      title="确定要删除这个模版吗？"
                      onConfirm={() => handleDeleteTemplate(item.id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button 
                        type="text" 
                        danger
                        icon={<DeleteOutlined />}
                      >
                        删除
                      </Button>
                    </Popconfirm>
                  )
                ].filter(Boolean)}
              >
                <List.Item.Meta
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.name}
                      {item.isDefault && (
                        <LockOutlined style={{ color: '#999', fontSize: '14px' }} />
                      )}
                    </div>
                  }
                  description={`开始时间: ${item.config.startTime} | 时长: ${item.config.duration}秒`}
                />
              </List.Item>
            )}
          />
        </Modal>
      </Container>
    );
  }
);

export default TemplateConfig; 