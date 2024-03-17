import { KnowledgeEntity } from '@/types';
import { request } from '@umijs/max';

interface IBaseResponse {
  success: boolean;
}

interface IKnowledgeResponse extends IBaseResponse {
  data: KnowledgeEntity
}

interface IKnowledgeListResponse extends IBaseResponse {
  data: KnowledgeEntity[]
}

export async function queryKnowledgeList(
  params: {
    brainId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<IKnowledgeListResponse>(`/api/v1/knowledge/list`, {
    method: 'POST',
    data: { ...params },
    ...(options || {}),
  });
}

export async function removeKnowledge(
  params: {
    // path
    id?: string;
  },
  options?: { [key: string]: any },
) {
  const { id } = params;
  return request<IKnowledgeListResponse>(`/api/v1/knowledge/${id}`, {
    method: 'DELETE',
    data: { ...params },
    ...(options || {}),
  });
}


export async function updateKnowledgeItemById(
  params: {
    id?: string;
    name: string;
    model: string;
  },
  options?: { [key: string]: any },
) {
  const { id: KnowledgeId } = params;
  return request<IKnowledgeListResponse>(`/api/v1/knowledge/${KnowledgeId}`, {
    method: 'PUT',
    data: { ...params },
    ...(options || {}),
  });
}

export async function createKnowledge(
  body?: {
    name: string;
    brainId: string;
    url: string;
  },
  options?: { [key: string]: any },
) {
  return request<IKnowledgeResponse>('/api/v1/knowledge/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getKnowledgeDetail(
  params: {
    // path
    KnowledgeId?: string;
  },
  options?: { [key: string]: any },
) {
  const { KnowledgeId: param0 } = params;
  return request<IKnowledgeResponse>(`/api/v1/knowledge/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}