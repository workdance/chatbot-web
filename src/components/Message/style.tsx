import {} from 'react';
import useThemeToken from '../../hooks/useThemeToken';
import css from '../../utils/cacheEmotion';
import type { MessageBaseProps } from './MessageBase';
import { msgContentMaxWidth } from '../../common';

function useStyle(props: MessageBaseProps) {
  const { direction = 'left', type } = props;

  const { token } = useThemeToken();

  return {
    message: css`
      display: flex;
      width: 100%;

      &__avatar {
        width: 32px;
        height: 32px;
        ${direction !== 'left' ? 'margin-left: 8px;' : 'margin-right: 8px;'}

        > span {
          border: 0;
        }
      }

      &__content {
        max-width: calc(100% - 40px);

        &__header {
          display: flex;
        }

        &__main {
          max-width: ${msgContentMaxWidth}px;
          ${
            type === 'img' ? '' : `
              background-color: ${direction === 'left'
                ? token.colorBgBase
                : token.controlItemBgActive};
              box-shadow: ${token.boxShadowTertiary};
            `
          }
          border-radius: 8px;
          word-break: break-all;
          position: relative;

          &__status {
            position: absolute;
            bottom: 0;
            right: -30px;
          }
        }

        &__footer {
          display: flex;
          margin-top: 4px;
        }
      }
    `,
  };
}

export default useStyle;
