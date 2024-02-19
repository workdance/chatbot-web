import type { Options } from '@emotion/cache';
import createEmotion from '@emotion/css/create-instance';
import { prefixCls } from '../common';

export function createCacheCss(options?: Options) {
  return createEmotion(Object.assign({}, { speedy: false }, options));
}

/** chat-design 缓存实例 */
const emotion = createCacheCss({
  key: prefixCls,
  stylisPlugins: [
    /* 自定义的 Stylis 插件 */
  ],
  speedy:  process.env.NODE_ENV === 'development',
});

export const keyframes = emotion.keyframes;
export const css = emotion.css;

/** 改用 import { css } from './'  */
export default emotion.css;
