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

export async function createBrain(
  body?: {
    name: string;
    description: string;
    brainTypes: string;
  },
  options?: { [key: string]: any },
) {
  return request<IChatMessageResponse>('/api/v1/brain/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}