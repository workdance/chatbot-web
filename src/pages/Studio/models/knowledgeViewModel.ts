import { KnowledgeEntity } from '@/types';
import { queryKnowledgeList, updateKnowledgeItemById, removeKnowledge} from '@/services/KnowledgeController';
import moment from 'moment';
import { useCallback } from 'react';
import { useImmer } from 'use-immer';

export enum Operate {
  checked = 'checked',
  delete = 'delete',
  revise = 'revise',
}


export default function useKnowledgeViewModel() {
  const [knowledgeModel, updateKnowledgeModel] = useImmer({
    list: [] as KnowledgeEntity[],
  });

  const renderKnowledge = useCallback(
    ({ brainId }: { brainId: string }) => {
      const init = async () => {
        const rst = await queryKnowledgeList({
          brainId,
        });
        const formatData = rst.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            url: item.url,
            brainId: item.brainId,
            gmtCreate: moment(item.gmtCreate).format('HH:mm'),
            gmtModified: moment(item.gmtModified).format('HH:mm'),
          }
        });

        console.log(formatData);

        updateKnowledgeModel((draft) => {
          draft.list = formatData;
        });
      };
      init();
    },
    [],
  );



  async function removeKnowledgeById({ id, brainId }: { id: string | undefined, brainId: string }) {
    const removeOk = await removeKnowledge({
      id: id,
    });

    if (removeOk.success) {
      console.log('remove success');
      renderKnowledge({ brainId: brainId });
    }
  }

  async function updateKnowledgeById({ id, name, model }: {
    id: string;
    name: string;
    model: string;
  }) {
    const rst = await updateKnowledgeItemById({
      id: id,
      name,
      model
    });

    if (rst.success) {
      console.log('update success');
      updateKnowledgeModel(draft => {
        draft.Knowledge.model = model
      })
    }
    return rst.success;
  }

  return {
    knowledgeModel,
    renderKnowledge,
    updateKnowledgeModel,
    updateKnowledgeById,
    removeKnowledgeById,
  };
}
