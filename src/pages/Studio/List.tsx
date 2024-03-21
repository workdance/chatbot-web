import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useModel } from '@umijs/max';
import React from 'react';
import { BrainEntity } from '../../types';

export default () => {
  const { brainListViewModel, renderBrainList, removeBrainById } = useModel('Studio.brainListViewModel');

  useEffect(() => {
    renderBrainList();
  }, []);

  const handleClickDelete = (id) => {
    removeBrainById({
      id,
    })
  }
  
  return (
    <ProList<BrainEntity>
      rowKey="id"
      headerTitle="大脑列表"
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
          render: (_, record) => {
            return <>
              <Space size={0}>
                简介：{record.description}
              </Space>
                
            </>
          },
        },
        subTitle: {
          dataIndex: 'brainType',
          render: (_, record) => {
            return (
              <Space size={0}>
                <Tag color="blue">大脑类型:{record.brainType}</Tag>
                <Tag color="green">模型：{record.model}</Tag>
              </Space>
            );
          },
        },
        actions: {
          render: (text, row) => [
            <Link to={`/studio/${row.brainId}`} key="link">编辑</Link>,
            <a key="delete" onClick={() => { handleClickDelete(row.id)}}>删除</a>
          ],
        },
      }}
    />
  );
};