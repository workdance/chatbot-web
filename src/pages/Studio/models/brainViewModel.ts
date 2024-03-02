import { BrainEntity } from '@/pages/Chat/types';
import { getBrainDetail, queryBrain } from '@/services/BrainController';
import { history } from '@umijs/max';
import moment from 'moment';
import { useCallback } from 'react';
import { useImmer } from 'use-immer';

export enum Operate {
  checked = 'checked',
  delete = 'delete',
  revise = 'revise',
}

async function removeBrainById({ id }: { id: string | undefined }) {
  // const removeOk = await removeBrain({
  //   id: id,
  // });

  // if (removeOk.success) {
  //   console.log('remove success');
  //   history.push(`/Brain`);
  // }
  // return removeOk.success;
}

export default function useBrainViewModel() {
  const [brainViewModel, updateBrainViewModel] = useImmer({
    brain: {} as BrainEntity,
  });

  /**
   * 渲染大脑详情
   */
  const renderBrain = useCallback(
    ({ brainId }: { brainId: string | undefined }) => {
      const init = async () => {
        const rst = await getBrainDetail({
          brainId: brainId,
        });
        const item = rst.data;
        
        const formatData = {
          id: item.id,
          name: `${item.name}`,
          brainId: item.brainId,
          description: item.description,
          brainType: item.brainType,
          "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
          gmtCreate: moment(item.gmtCreate).format('HH:mm'),
          gmtModified: moment(item.gmtModified).format('HH:mm'),
        }

        updateBrainViewModel((draft) => {
          draft.brain = formatData;
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
    //   updateBrainViewModel(draft => {
    //     draft.brain = draft.brain.map(item => {
    //       return item;
    //     })
    //   })
    // }
    // return rst.success;
  }

  return {
    brainViewModel,
    updateBrainViewModel,
    renderBrain,
  };
}
