import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input, Card } from 'antd';
import { setLoginName, setWorkId } from '@/common';

type FieldType = {
  username?: string;
  workId?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {
  console.log('Success:', values);
  setLoginName(values.username);
  setWorkId(values.workId);
  window.location.reload();
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App: React.FC = () => (
  <Card style={{ width: 500, margin: '100px auto' }}>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="工号"
        name="workId"
        rules={[{ required: true, message: '请输入工号!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="备注"
      >
       该信息仅存储在客户端
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          创建
        </Button>
      </Form.Item>
    </Form>
  </Card>

);

export default App;