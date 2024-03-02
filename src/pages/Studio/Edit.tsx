import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProList,
} from '@ant-design/pro-components';
import { Divider, Skeleton, Space, Tabs, TabsProps, Tag, Upload, UploadProps, message } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import { useModel, useParams } from '@umijs/max';
import styles from './index.module.less'
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

const onChange = (key: string) => {
  console.log(key);
};

const SettingTabPanel = () => {
  const { brainViewModel, renderBrain } = useModel('Studio.brainViewModel');
  const { id } = useParams();
  useEffect(() => {
    renderBrain({ brainId: id })
  }, []);

  console.info('brainName', brainViewModel.brain.name)
  if (!brainViewModel.brain.name) {
    return <Skeleton />;
  }

  return <div className={styles.settingPanel}>
    <ProForm
      // @ts-ignore
      labelWidth="auto"
      onFinish={async (values: any) => {
        // await waitTime(2000);
        console.log(values);
        message.success('提交成功');
      }}
      initialValues={{
        name: brainViewModel.brain.name,
        description: brainViewModel.brain.description,
        useMode: 'chapter',
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="大脑名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="description"
          label="大脑描述"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <Divider>模型设置</Divider>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'llama2',
              label: 'llama2',
            },
          ]}
          // readonly
          width="md"
          name="model"
          label="模型"
        />
      </ProForm.Group>
    </ProForm>
    <Divider>提示设置</Divider>
  </div>
}



const defaultData = [
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
];

type DataItem = (typeof defaultData)[number];
const KnowledgePanel = () => {
  const [dataSource, setDataSource] = useState<DataItem[]>(defaultData);
const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
  return <div className={styles.knowledgePanel}>
    <Divider>上传区</Divider>
    <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件至此区域即可上传</p>
    <p className="ant-upload-hint">
    查看、下载或删除您大脑使用的知识
    </p>
  </Dragger>
  <Divider>已上传的知识库</Divider>
  <ProList<DataItem>
      rowKey="id"
      headerTitle="基础列表"
      dataSource={dataSource}
      showActions="hover"
      editable={{
        onSave: async (key, record, originRow) => {
          console.log(key, record, originRow);
          return true;
        },
      }}
      onDataSourceChange={setDataSource}
      metas={{
        title: {
          dataIndex: 'name',
        },
        subTitle: {
          render: () => {
            return (
              <Space size={0}>
                <Tag color="blue">Ant Design</Tag>
                <Tag color="#5BD8A6">TechUI</Tag>
              </Space>
            );
          },
        },
        actions: {
          render: (text, row, index, action) => [
            <a
              onClick={() => {
                action?.startEditable(row.id);
              }}
              key="link"
            >
              编辑
            </a>,
          ],
        },
      }}
    />
  </div>
}



const items: TabsProps['items'] = [
  {
    key: '1',
    label: '设置',
    children: <SettingTabPanel />,
  },
  {
    key: '3',
    label: '知识库',
    children: <KnowledgePanel/>
  },
];

const App: React.FC = () => <div>
  <h5 className={styles.studioTitle}>我的大脑</h5>
  <section className={styles.sectionContent}>
    <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
  </section>
</div>

export default App;