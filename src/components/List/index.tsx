import { Button, List, Typography } from 'antd';
import React, { useState } from 'react';
import DeleteButton from '@/components/DeleteButton';
import EditButton from '@/components/EditButton';
import SessionInput from '@/components/SessionInput';
import useStyle from './style';
import { cls } from '@/common';

export enum Operate {
  checked = 'checked',
  delete = 'delete',
  revise = 'revise',
}

/** 会话列表类型 conversation list item */
export interface ListItem {
  /** 会话名称 */
  value: string;
  /** 会话id */
  id: string;
  /** 创建时间，按日期分组使用 */
  createTime: string | number;
  /** 是否选中 */
  isChecked?: boolean;
  /** 最后使用时间 */
  lastTime?: string;
}

/** @deprecated 仅用于 API 文档说明 */
export const DOCS_API_LIST_DATA_ITEM: React.FC<ListItem> = () => null;

// 内部修改中 状态存储
interface IRevise {
  id: string;
  value: string;
}

export interface ListProps {
  /** 需要展示的数据 */
  data?: Array<ListItem>;
  /**
   * 点击切换会话时触发的回调函数，包括选中、删除和修改，修改时extra参数为修改确认时的名字，
   * 修改时，如果前后名字一致，不进行调用
   */
  onClick?: (op: keyof typeof Operate, id: string, extra?: any) => void;
  /**
   * 自定义获取下一次展示会话的 id
   * @param currentId 当前要删除的会话id
   * @returns 下次需要选中的会话id
   */
  customNextSeesionIdFn?: (currentId: string) => string;
}

export default (props: ListProps) => {
  const { data = [], onClick, customNextSeesionIdFn } = props;
  const [reviseList, setReviseList] = useState<IRevise[]>([]);
  const style = useStyle();

  const ellipsis = (tip: string): any => ({
    tooltip: {
      title: tip,
      mouseEnterDelay: 1,
    },
  });

  /** 删除会话 */
  const onDelete = (e: React.MouseEvent | undefined, id: string) => {
    e?.stopPropagation();
    let nextId: string;
    if (typeof customNextSeesionIdFn === 'function') {
      nextId = customNextSeesionIdFn(id);
    } else if (data.length > 1) {
      const index = data.findIndex((i) => i.id === id)!;
      const nextIndex = index === 0 ? 1 : index - 1;
      nextId = data[nextIndex].id;
    } else {
      nextId = '';
    }
    onClick?.(Operate.delete, id, nextId);
  };

  /** 选中会话 */
  const onChecked = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onClick?.(Operate.checked, id);
  };

  /** 修改会话 */
  const onRevise = (e: React.MouseEvent, id: string, value: string) => {
    e.stopPropagation();
    reviseList.push({ id, value });
    setReviseList([...reviseList]);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: IRevise,
  ) => {
    item.value = e.target.value;
    setReviseList([...reviseList]);
  };

  /** 取消修改 */
  const onCancel = (id: string) => {
    const newList = reviseList.filter((v) => v.id !== id);
    setReviseList(newList);
  };

  /** 确认修改会话 */
  const onReviseOk = (id: string) => {
    const value = reviseList.find((v) => v.id === id)?.value;
    const oldValue = data?.find((v) => v.id === id)?.value;

    if (value && oldValue !== value) {
      onClick?.(Operate.revise, id, value);
    }

    onCancel(id);
  };

  function renderItemStatus(item: ListItem) {
    let { value, id, lastTime, isChecked } = item;
    const isRevising = reviseList.find((i) => i.id === id);

    if (isRevising && isChecked) {
      return (
        <SessionInput
          value={isRevising.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange(e, isRevising)
          }
          onOk={() => onReviseOk(id)}
          onCancel={() => onCancel(id)}
        />
      );
    }

    if (isChecked) {
      return (
        <>
          <Button className={`${style.list}__button`} type="text">
            <Typography.Text
              ellipsis={ellipsis(value)}
              type="secondary"
              className={`${cls('rightCheck')}`}
            >
              [当前]{value}
            </Typography.Text>
          </Button>
          <div className={`${style['list']}__oper`}>
            <EditButton
              onClick={(e: React.MouseEvent) => onRevise(e, id, value)}
            />
            <DeleteButton onClick={(e) => onDelete(e, id)} />
          </div>
        </>
      );
    }

    return (
      <>
        <Button className={`${style.list}__button`} type="text">
          <Typography.Text
            ellipsis={ellipsis(value)}
            type="secondary"
            className={'right'}
          >
            {value}
          </Typography.Text>
        </Button>
        <Typography.Text type="secondary" className="left">
          {lastTime}
        </Typography.Text>
      </>
    );
  }

  function renderItem(item: ListItem) {
    let { id, isChecked } = item;

    return (
      <List.Item
        className={`${style['list']}__item ${cls('item')} ${isChecked ? cls('checked') : ''}`}
        key={id}
        onClick={(e: React.MouseEvent) => onChecked(e, id)}
      >
        {renderItemStatus(item)}
      </List.Item>
    );
  }

  return (
    <List
      dataSource={data}
      renderItem={renderItem}
      className={`${style['list']}`}
    />
  );
};