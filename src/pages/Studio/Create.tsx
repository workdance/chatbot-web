import type { ProFormInstance } from '@ant-design/pro-components';
import {
  CheckCard,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';
import React from 'react';
import { createBrain } from '@/services/BrainController';
import { history } from '@umijs/max';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>();
  const cardRef = useRef<string>('');
  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          console.log(formRef.current?.getFieldsValue());
          await waitTime(1000);
          const { name, description } = formRef.current?.getFieldsValue() || {};
          if (!name || !description) {
            message.error('请填写基本信息');
            return false;
          }
          if (!cardRef.current) {
            message.error('请选择大脑类型');
            return false;
          }

          const rst = await createBrain({
            name, description, brainTypes: cardRef.current,
          })
          if (rst.success) {
            history.push('./list');
            message.success('提交成功');
          } else {
            message.error('提交失败');
          }
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="brainType"
          title="选择大脑类型"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            
            
            // await waitTime(2000);
            return true;
          }}
        >
          <CheckCard.Group
            onChange={(value) => {
              console.log('value', value);
              cardRef.current = value;
            }}
            defaultValue="A"
          >
            <CheckCard title="本地大脑" description="上传文档或者网站链接" value="doc" />
            <CheckCard
              title="远程大脑"
              disabled
              description="通过 API 调用远程大脑（暂不支持）"
              value="api"
            />
          </CheckCard.Group>

        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          name: string;
        }>
          name="brainDesc"
          title="填写基本信息"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="大脑名称"
            width="md"
            tooltip="最长为 24 位，用于标定的唯一 id"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="description"
            label="大脑描述"
            width="lg"
            placeholder="请输入备注"
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};