import { ChatMessage } from "../types";
import { useModel } from "@umijs/max";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHandleStream = () => {
  const { updateStreamingHistory } = useModel("Chat.chatViewModel");

  const handleStream = async (
    args: {
      messageId: string
      question: string,
      reader: ReadableStreamDefaultReader<Uint8Array>,
    },
    onFirstChunk: () => void,
    onStreamDone: (allChunk: string) => void
  ): Promise<void> => {
    const { question, reader, messageId } = args;
    const decoder = new TextDecoder("utf-8");
    let isFirstChunk = true;
    let incompleteData = "";
    let assistantChunk = '';

    const handleStreamRecursively = async () => {
      const { done, value } = await reader.read();

      if (done) {
        if (incompleteData !== "") {
          // Try to parse any remaining incomplete data

          try {
            const parsedData = JSON.parse(incompleteData) as ChatMessage;
            updateStreamingHistory(parsedData);
          } catch (e) {
            console.error("Error parsing incomplete data", e);
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onStreamDone && onStreamDone(assistantChunk);
        return;
      }

      if (isFirstChunk) {
        isFirstChunk = false;
        onFirstChunk();
      }


      // Concatenate incomplete data with new chunk
      const rawData = incompleteData + decoder.decode(value, { stream: true });
      const dataStrings = rawData;

      try {
        const parsedData = JSON.parse(dataStrings);
        assistantChunk+= parsedData;
        updateStreamingHistory(parsedData);
      } catch (e) {
        assistantChunk+= dataStrings;
        // console.error("Error parsing data string", e);
      };

      if (assistantChunk) {
        updateStreamingHistory({
          assistant: assistantChunk,
          userMessage: question,
          messageId,
        });
      }

      await handleStreamRecursively();
    };

    await handleStreamRecursively();
  };

  return {
    handleStream,
  };
};
