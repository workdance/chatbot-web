import {} from 'react';
import useThemeToken from '../../hooks/useThemeToken';
import css from '../../utils/cacheEmotion';
import type { TypingProps } from './index';

function useStyle(props: TypingProps) {
  const { token } = useThemeToken();

  return {
    typing: css`
      height: 14px;
      display: inline-block;
      border-left: 4px solid ${props.color ? props.color : token.colorText};
      animation: blink 0.8s infinite;

      @keyframes blink {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `,
  };
}

export default useStyle;
