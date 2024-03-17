export const prefixCls = 'chat-design';

export function cls(label: string) {
  return `${prefixCls}-${label}`;
}


export const msgContentMaxWidth = 720;

export enum MessageStatus {
  success = 'success',
  error = 'error',
  loading = 'loading',
}

export const fileTypes = {
  image: ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
}

export type Files = {
  [fileType in keyof typeof fileTypes]: File[];
};

export function getLoginName() {
  return window.localStorage.getItem('chatweb-session-name') || '';
}

export function setLoginName(name: string) {
  window.localStorage.setItem('chatweb-session-name', name);
}

export function getWorkId() {
  return window.localStorage.getItem('chatweb-session-workId') || '';
}

export function setWorkId(name: string) {
  window.localStorage.setItem('chatweb-session-workId', name);
}