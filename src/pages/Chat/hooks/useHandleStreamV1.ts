import { ChatMessage } from "../types";
import { useModel } from "@umijs/max";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHandleStream = () => {
  const { updateStreamingHistory } = useModel("Chat.chatViewModel");

  const handleStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onFirstChunk: () => void,
    onStreamDone: (allChunk: string) => void
  ): Promise<void> => {
    const decoder = new TextDecoder("utf-8");
    let isFirstChunk = true;
    let incompleteData = "";
    let allChunk = '';

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
        onStreamDone && onStreamDone(allChunk);
        return;
      }

      if (isFirstChunk) {
        isFirstChunk = false;
        onFirstChunk();
      }


      // Concatenate incomplete data with new chunk
      const rawData = incompleteData + decoder.decode(value, { stream: true });
      console.log('handleStreamRecursively', value, rawData)


      const dataStrings = rawData.trim().split("data:").filter(Boolean).splice(1);

      dataStrings.forEach((data, index, array) => {
        // if (index === array.length - 1 && !data.endsWith("\n")) {
        //   // Last item and does not end with a newline, save as incomplete
        //   incompleteData = data;

        //   return;
        // }
        try {
          const parsedData = JSON.parse(data) as ChatMessage;
          allChunk = parsedData;
          updateStreamingHistory(parsedData);
        } catch (e) {
          console.error("Error parsing data string", e);
        }
      });

      await handleStreamRecursively();
    };

    await handleStreamRecursively();
  };

  return {
    handleStream,
  };
};
