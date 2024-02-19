import { useImmer } from 'use-immer';
import { history } from '@umijs/max';
import { createChat, chatToOllama } from '@/services/ChatController';
import { useHandleStream } from '../hooks/useHandleStream';
import { ChatQuestion } from '../types';
import { generatePlaceHolderMessage, getChatNameFromQuestion } from '../utils';
import { useModel } from '@umijs/max';
import { useParams } from '@umijs/max';
import { createChatHistory, modifyChatHistory } from '@/services/ChatHistoryController';

export default function useChatInputViewModel() {
  const [chatInputView, updateChatInputView] = useImmer({
    generatingAnswer: false,
    message: '',
    assistant: '',
  });
  const { chatViewModel, updateStreamingHistory, updateChatViewModel } = useModel('Chat.chatViewModel')
  const { handleStream } = useHandleStream();
  const { id } = useParams();

  const handleFetchError = (err: any) => {
    console.error(err);
  };

  const addStreamQuestion = async (
    chatId: string,
    chatQuestion: ChatQuestion,
  ) => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    };

    const { data } = await createChatHistory({
      chatId,
      question: chatQuestion.question,
    });

    const placeHolderMessage = generatePlaceHolderMessage({
      userMessage: chatQuestion.question ?? '',
      chatId,
    });

    updateStreamingHistory(placeHolderMessage);

    try {
      // const response = await chatWithQuestion(
      //   {
      //     chatId: chatId,
      //     ...chatQuestion,
      //   },
      //   {
      //     headers,
      //   },
      // );
      const response = await chatToOllama(
        {
          question: chatQuestion.question || '',
        },
        {
          headers,
        },
      );
      if (!response.ok) {
        void handleFetchError(response);
        return;
      }

      if (response.body === null) {
        throw new Error('resposeBodyNull');
      }

      await handleStream({
        messageId: data.messageId,
        question: chatQuestion.question || '',
        reader: response.body.getReader()
      },
        () => console.error(placeHolderMessage.messageId),
        (assistant: string) => {
          // 3.0 流执行完毕后，把完整的流数据传递给 prod 落库，更新 chatHistory 的 assistant 字段
          // console.log('allChunk', assistant);
          const param = {
            messageId: data.messageId,
            assistant,
          };
          modifyChatHistory(param, param);
        }
      );
    } catch (error) {
      console.error({
        variant: 'danger',
        text: String(error),
      });
    }
  };


  const addQuestion = async (question: string, callback: () => void) => {
    if (question.trim() === '') {
      console.error('[addQuestion] question is empty');
      return;
    }

    try {
      updateChatInputView(draft => {
        draft.generatingAnswer = true;
      });

      // 1.0 先创建 chat
      let currentChatId = id || chatViewModel.chatId;
      if (currentChatId === '') {
        const chat = await createChat({
          chatName: getChatNameFromQuestion(question),
        });

        if (chat.success) {
          currentChatId = chat.data.chatId;
          updateChatViewModel(draft => {
            draft.chatId = currentChatId;
          })
          history.push(`/chat/${currentChatId}`);
          // renderChatList({ chatId: currentChatId });
        }
      }


      // 2.0 开始进行对话，创建 chatHistory
      const chatQuestion: ChatQuestion = {
        // model, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        question,
        // temperature: temperature,
        // max_tokens: maxTokens,
        // brain_id: currentBrain?.id,
        // prompt_id: currentPromptId ?? undefined,
      };

      callback?.();
      await addStreamQuestion(currentChatId, chatQuestion);
    } catch (err) {
      console.error('[submitQuestion] error', err);
    } finally {
      updateChatInputView(draft => {
        draft.generatingAnswer = false;
      });
    }
  };

  const submitQuestion = (message: string) => {
    if (!chatInputView.generatingAnswer) {
      addQuestion(message, () => {
        updateChatInputView(draft => {
          draft.message = '';
        });
      });
    }
  }

  return {
    chatInputView,
    chatView: chatInputView,
    updateChatInputView,
    submitQuestion,
  };
}
