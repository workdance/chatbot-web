import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useModel } from '@umijs/max';
import React from 'react';
import { BrainEntity } from '../../types';

export default () => {
  const { brainListViewModel, updateBrainListViewModel, renderBrainList } = useModel('Studio.brainListViewModel');

  useEffect(() => {
    renderBrainList({ brainId: '' });
  }, []);
  
  return (
    <ProList<BrainEntity>
      rowKey="id"
      headerTitle="知识库列表"
      dataSource={brainListViewModel.brainList}
      showActions="hover"
      toolBarRender={() => {
        return [
          <Link to="/studio/create" key="1">         
            <Button key="3" type="primary">
              新建
            </Button>
          </Link>,
        ];
      }}
      editable={{
        onSave: async (key, record, originRow) => {
          console.log(key, record, originRow);
          return true;
        },
      }}
      // onDataSourceChange={updateBrainListViewModel}
      metas={{
        title: {
          dataIndex: 'name',
        },
        avatar: {
          dataIndex: 'image',
          editable: false,
        },
        description: {
          dataIndex: 'description',
        },
        subTitle: {
          dataIndex: 'brainType',
          render: (_, record) => {
            return (
              <Space size={0}>
                <Tag color="blue">{record.brainType}</Tag>
              </Space>
            );
          },
        },
        actions: {
          render: (text, row, index, action) => [
            <Link to={`/studio/${row.brainId}`} key="link">编辑</Link>
          ],
        },
      }}
    />
  );
};