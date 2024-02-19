import { ChatEntity, ChatMessageItem } from '@/pages/Chat/types';
import { request } from '@umijs/max';

interface IBaseResponse {
  success: boolean;
}

interface IChatMessageResponse extends IBaseResponse {
  data: ChatEntity
}

interface IChatLIstResponse extends IBaseResponse {
  data: ChatEntity[]
}

export async function queryChatList(
  params: {
    // path
    chatId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<IChatLIstResponse>(`/api/v1/chat/list`, {
    method: 'POST',
    data: { ...params },
    ...(options || {}),
  });
}

export async function removeChatList(
  params: {
    // path
    id?: string;
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
    id?: string;
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

export async function chatWithQuestion(
  params: {
    // path
    chatId?: string;
    questionId?: string;
  },
  options?: { [key: string]: any },
) {
  const { chatId } = params;
  return fetch(`/api/v1/chat/${chatId}/question/stream`, {
  // return request<API.Result_string_>(`/api/chat/${param0}/question/stream`, {
    method: 'POST',
    body: JSON.stringify(params),
    ...(options || {}),
  });
}
export async function chatToOllama(
  params: {
    question: string;
  },
  options?: { [key: string]: any },
) {

  return fetch(`/ai/ollama`, {
    method: 'POST',
    body: JSON.stringify(params),
    ...(options || {}),
  });
}

export async function chat(
  params: {
    // path
    /** userId */
    connectKey?: string;
  },
  options?: { [key: string]: any },
) {
  const { connectKey } = params;
  return request(`/api/easy/stream?connectKey=${connectKey}`, {
  // return request<API.Result_string_>(`/api/chat/${param0}/question/stream`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
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
    data: body,
    ...(options || {}),
  });
}