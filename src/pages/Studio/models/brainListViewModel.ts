import { BrainEntity } from '@/types';
import { queryBrainList, removeBrain } from '@/services/BrainController';
import { history } from '@umijs/max';
import moment from 'moment';
import { useCallback } from 'react';
import { useImmer } from 'use-immer';
import { useModel } from '@umijs/max';
import { message } from 'antd';

export enum Operate {
  checked = 'checked',
  delete = 'delete',
  revise = 'revise',
}


export default function useBrainListViewModel() {
  const { brainViewModel, updateBrainViewModel } = useModel('Studio.brainViewModel');
  const [brainListViewModel, updateBrainListViewModel] = useImmer({
    brainList: [] as BrainEntity[],
  });
  const renderBrainList = useCallback(
    () => {
      const init = async () => {
        const rst = await queryBrainList({});
        const list = rst.data;

        const formatData = list.map((item) => {
          return {
            id: item.id,
            name: `${item.name}`,
            brainId: String(item.brainId),
            description: item.description,
            brainType: item.brainType,
            model: item.model,
            "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
            gmtCreate: moment(item.gmtCreate).format('HH:mm'),
            gmtModified: moment(item.gmtModified).format('HH:mm'),
          };
        });
        updateBrainListViewModel((draft) => {
          draft.brainList = formatData;
        });

        if (!brainViewModel.currentBrain.brainId) {
          updateBrainViewModel((draft) => {
            draft.currentBrain = formatData[0];
          })
        }

      };
      init();
    },
    [],
  );

  async function updateBrainById({ id, BrainName }: {
    id: string;
    BrainName: string;
  }) {
    // const rst = await updateBrainItemById({
    //   id: id,
    //   BrainName,
    // });

    // if (rst.success) {
    //   console.log('update success');
    //   updateBrainListViewModel(draft => {
    //     draft.brainList = draft.brainList.map(item => {
    //       return item;
    //     })
    //   })
    // }
    // return rst.success;
  }

  const handleItemClick = async (
    op: keyof typeof Operate,
    id: string,
    extra: string,
  ) => {
    console.log('extra', extra);
  };


  async function removeBrainById({ id }: { id: string | undefined }) {
    const removeOk = await removeBrain({
      id: id,
    });

    if (removeOk.success) {
      console.log('remove success');
      message.success('删除成功');
      renderBrainList()
    }

    return removeOk.success;
    
  }
  return {
    brainListViewModel,
    updateBrainListViewModel,
    renderBrainList,
    handleItemClick,
    removeBrainById
  };
}
