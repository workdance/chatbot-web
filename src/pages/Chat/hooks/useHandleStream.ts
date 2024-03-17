import { useModel } from '@umijs/max';
import { ChatMessage } from '../../../types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHandleStream = () => {
  const { updateStreamingHistory } = useModel('Chat.chatViewModel');

  const handleStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    args: {
      chatId: string;
      messageId: string;
      question: string;
    },
    onFirstChunk: () => void,
    onStreamDone: (allChunk: string) => void,
  ): Promise<void> => {
    const decoder = new TextDecoder('utf-8');
    let isFirstChunk = true;
    let incompleteData = '';
    let assistantChunk = '';

    console.info('handleStreamhandleStream', reader);
    const handleStreamRecursively = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onStreamDone && onStreamDone(assistantChunk);
          break; // 读取完毕
        }

        if (isFirstChunk) {
          isFirstChunk = false;
          onFirstChunk();
        }

        const rawData =
          incompleteData + decoder.decode(value, { stream: true });
        // 这里有2中返回，一种是直接返回结果，一个是返回完整的数据，用 data:是否开头区分
        if (rawData.includes('data:')) {
          const dataStrings = rawData.trim().split('data:').filter(Boolean);
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          dataStrings.forEach((data, index, array) => {
            if (index === array.length - 1 && !data.endsWith('\n')) {
              // Last item and does not end with a newline, save as incomplete
              incompleteData = data;
              return;
            }
            try {
              const parsedData = JSON.parse(data) as ChatMessage;
              console.info(parsedData);
              assistantChunk+=parsedData.assistant;
              updateStreamingHistory({
                assistant: assistantChunk,
                messageId: args.messageId,
                chatId: args.chatId,
                userMessage: args.question,
              });
            } catch (e) {
              console.error('Error parsing data string', e);
            }
          });
        } else {
          const dataStrings = rawData.trim();
          try {
            const parsedData = JSON.parse(dataStrings);
            assistantChunk += parsedData;
            updateStreamingHistory(parsedData);
          } catch (e) {
            assistantChunk += dataStrings;
            console.error('Error parsing data string', e);
          }

          if (assistantChunk) {
            updateStreamingHistory({
              chatId: args.chatId,
              assistant: assistantChunk,
              userMessage: args.question,
              messageId: args.messageId,
            });
          }
        }
      }
    };

    await handleStreamRecursively();
  };

  return {
    handleStream,
  };
};
