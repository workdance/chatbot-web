import { BrainEntity } from '@/pages/Chat/types';
import { queryBrainList } from '@/services/BrainController';
import { history } from '@umijs/max';
import moment from 'moment';
import { useCallback } from 'react';
import { useImmer } from 'use-immer';

export enum Operate {
  checked = 'checked',
  delete = 'delete',
  revise = 'revise',
}

async function removeBrainListById({ id }: { id: string | undefined }) {
  // const removeOk = await removeBrainList({
  //   id: id,
  // });

  // if (removeOk.success) {
  //   console.log('remove success');
  //   history.push(`/Brain`);
  // }
  // return removeOk.success;
}

export default function useBrainListViewModel() {
  const [brainListViewModel, updateBrainListViewModel] = useImmer({
    brainList: [] as BrainEntity[],
  });
  const renderBrainList = useCallback(
    ({ brainId }: { BrainId: string | undefined }) => {
      const init = async () => {
        const rst = await queryBrainList({});
        const list = rst.data;

        const formatData = list.map((item) => {
          return {
            id: item.id,
            name: `${item.name}`,
            brainId: item.brainId,
            description: item.description,
            brainType: item.brainType,
            "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
            gmtCreate: moment(item.gmtCreate).format('HH:mm'),
            gmtModified: moment(item.gmtModified).format('HH:mm'),
          };
        });
        updateBrainListViewModel((draft) => {
          draft.brainList = formatData;
        });
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

  return {
    brainListViewModel,
    updateBrainListViewModel,
    renderBrainList,
    handleItemClick,
  };
}
