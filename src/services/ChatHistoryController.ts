import { ChatHistoryEntity } from '@/pages/Chat/types';
import { request } from '@umijs/max';

interface IBaseResponse {
  success: boolean;
}

interface IChatMessageResponse extends IBaseResponse {
  data: ChatHistoryEntity;
}

export async function queryChatHistoryByChatId(
  params: {
    // path
    chatId?: string;
  },
  options?: { [key: string]: any },
) {
  return request(`/api/v1/chatHistory/list`, {
    method: 'POST',
    data: { ...params },
    ...(options || {}),
  });
}

export async function createChatHistory(
  params: {
    chatId: string;
    question: string;
    assistant?: string;
  },
  options?: { [key: string]: any },
) {
  return request<IChatMessageResponse>('/api/v1/chatHistory/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

export async function modifyChatHistory(
  params: {
    messageId: string;
    assistant: string;
  },
  body?: { [key: string]: any },
  options?: { [key: string]: any },
) {
  const { messageId } = params;
  return request<API.Result_UserInfo_>(`/api/v1/chatHistory/${messageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}


export async function deleteChatHistory(
  params: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_string_>(`/api/v1/chatHistory/${params.id}`, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}
