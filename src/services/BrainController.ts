import { BrainEntity } from '@/types';
import { request } from '@umijs/max';

interface IBaseResponse {
  success: boolean;
}

interface IBrainResponse extends IBaseResponse {
  data: BrainEntity
}

interface IBrainListResponse extends IBaseResponse {
  data: BrainEntity[]
}

export async function queryBrainList(
  params: {
  },
  options?: { [key: string]: any },
) {
  return request<IBrainListResponse>(`/api/v1/brain/list`, {
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
  return request<IBrainListResponse>(`/api/v1/chat/${chatId}`, {
    method: 'DELETE',
    data: { ...params },
    ...(options || {}),
  });
}


export async function updateBrainItemById(
  params: {
    id?: string;
    name: string;
    model: string;
  },
  options?: { [key: string]: any },
) {
  const { id: brainId } = params;
  return request<IBrainListResponse>(`/api/v1/brain/${brainId}`, {
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
  return request<IBrainResponse>('/api/v1/brain/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getBrainDetail(
  params: {
    // path
    brainId?: string;
  },
  options?: { [key: string]: any },
) {
  const { brainId: param0 } = params;
  return request<IBrainResponse>(`/api/v1/brain/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}