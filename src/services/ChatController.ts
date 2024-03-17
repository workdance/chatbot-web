import { getWorkId } from '@/common';
import { AI_SERVER_URL } from '@/pages/Chat/constant';
import { ChatEntity } from '@/types';
import { request } from '@umijs/max';

const workId = getWorkId();

interface IBaseResponse {
  success: boolean;
}

interface IChatMessageResponse extends IBaseResponse {
  data: ChatEntity;
}

interface IChatLIstResponse extends IBaseResponse {
  data: ChatEntity[];
}

export async function queryChatList(
  params: {
    // chatId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<IChatLIstResponse>(`/api/v1/chat/list`, {
    method: 'POST',
    data: {
      ...params,
      workId,
    },
    ...(options || {}),
  });
}

export async function removeChatList(
  params: {
    // path
    id: string;
  },
  options?: { [key: string]: any },
) {
  const { id: chatId } = params;
  return request<IChatLIstResponse>(`/api/v1/chat/${chatId}`, {
    method: 'DELETE',
    data: { ...params },
    ...(options || {}),
  });
}

export async function updateChatItemById(
  params: {
    id: string;
    chatName: string;
  },
  options?: { [key: string]: any },
) {
  const { id: chatId } = params;
  return request<IChatLIstResponse>(`/api/v1/chat/${chatId}`, {
    method: 'PUT',
    data: { ...params },
    ...(options || {}),
  });
}

export async function chatWithQuestion(params: {
  question: string;
  chat_id?: string;
  brain_Id?: string;
}) {
  const { chat_id: chatId } = params;
  return fetch(`${AI_SERVER_URL}/chat/${chatId}/question/stream`, {
    // return request<API.Result_string_>(`/api/chat/${param0}/question/stream`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
  });
}

export function chatToOllamaGet(
  params: {
    question: string;
  },
  options?: { [key: string]: any },
) {
  return fetch(
    `http://demo.test.alipay.net:5050/ollama?question=${params.question}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      ...(options || {}),
    },
  );
}

// export async function chatToOllama(
//   params: {
//     question: string;
//   },
//   options?: { [key: string]: any },
// ) {
//   return fetch(`/ai/ollama`, {
//     method: 'POST',
//     body: JSON.stringify(params),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'text/event-stream',
//     },
//     ...(options || {}),
//   });
// }

export async function createChat(
  body?: {
    chatName: string;
  },
  options?: { [key: string]: any },
) {
  return request<IChatMessageResponse>('/api/v1/chat/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...body,
      workId: getWorkId(),
    },
    ...(options || {}),
  });
}
