import { BrainEntity } from '@/types';
import { getBrainDetail, queryBrain, updateBrainItemById } from '@/services/BrainController';
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
    currentBrain: {} as BrainEntity,
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
          model: item.model,
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

  async function updateBrainById({ id, name, model }: {
    id: string;
    name: string;
    model: string;
  }) {
    const rst = await updateBrainItemById({
      id: id,
      name,
      model
    });

    if (rst.success) {
      console.log('update success');
      updateBrainViewModel(draft => {
        draft.brain.model = model
      })
    }
    return rst.success;
  }

  return {
    brainViewModel,
    renderBrain,
    updateBrainViewModel,
    updateBrainById,
  };
}
