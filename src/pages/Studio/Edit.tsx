import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProList,
} from '@ant-design/pro-components';
import { Divider, List, Result, Skeleton, Space, Tabs, TabsProps, Tag, Typography, Upload, UploadProps, message } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import { useModel, useParams } from '@umijs/max';
import styles from './index.module.less'
import { InboxOutlined } from '@ant-design/icons';
import { UPLOAD_URL } from '@/constants';
import { createKnowledge } from '@/services/KnowledgeController';
import { BrainType } from './models/brainViewModel';
const { Dragger } = Upload;

const onChange = (key: string) => {
  console.log(key);
};

const SettingTabPanel = () => {
  const { brainViewModel, renderBrain, updateBrainById } = useModel('Studio.brainViewModel');
  const params = useParams();
  const id = params.id as string;
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
        updateBrainById({
          id,
          name: values.name,
          model: values.model
        })
        message.success('提交成功');
      }}
      initialValues={{
        name: brainViewModel.brain.name,
        description: brainViewModel.brain.description,
        model: brainViewModel.brain.model,
        brainType: brainViewModel.brain.brainType,
        useMode: 'chapter',
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="大脑名称"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="md"
          name="brainType"
          label="大脑类型"
          tooltip="无法修改"
          disabled
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
            {
              value: 'qwen:14b',
              label: 'qwen:14b',
            },
            {
              value: 'gemma:7b',
              label: 'gemma:7b',
            },
          ]}
          // readonly
          width="md"
          name="model"
          label="模型"
        />
      </ProForm.Group>
    </ProForm>
    {/* <Divider>提示设置</Divider> */}
  </div>
}

const KnowledgePanel = () => {
  const { brainViewModel } = useModel('Studio.brainViewModel');
  const { knowledgeModel, renderKnowledge, removeKnowledgeById } = useModel('Studio.knowledgeViewModel');
  const brainId = brainViewModel.brain.brainId;

  async function doCreateKnowledge(info: any) {
    const rst = await createKnowledge({
      name: info.file.name,
      brainId,
      url: info.file.response.data.filePath
    })
    if (rst.success) {
      message.success(`${info.file.name} 上传成功.`);
      renderKnowledge({
        brainId,
      })
    }
  }
  const props: UploadProps = {
    name: 'uploadFile',
    multiple: true,
    action: UPLOAD_URL + "?brain_id=" + brainViewModel.brain.brainId,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        doCreateKnowledge(info)
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  useEffect(() => {
    renderKnowledge({
      brainId,
    })
  }, [])

  const handleDelteKnowledge = (id: string) => {
    removeKnowledgeById({
      id,
      brainId,
    })
  }

  if (brainViewModel.brain.brainType === BrainType.BASIC) {
    return <Result
      status="warning"
      title="该大脑不支持上传知识库"
    />
  }


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
    <Divider>已上传的文件</Divider>
    <List
      
      dataSource={knowledgeModel.list}
      renderItem={(item) => (
        <List.Item
          actions={[<a key="list-loadmore-edit" onClick={() => {
            handleDelteKnowledge(item.id)
          }}>删除</a>]}
        >
          {item.name}
        </List.Item>
      )}
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
    children: <KnowledgePanel />
  },
];

const App: React.FC = () => <div>
  <h5 className={styles.studioTitle}>我的知识库</h5>
  <section className={styles.sectionContent}>
    <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
  </section>
</div>

export default App;