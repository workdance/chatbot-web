import {} from 'react';
import useThemeToken from '@/hooks/useThemeToken';
import css from '@/utils/cacheEmotion';
import { cls } from '@/common';

export default function useStyle() {
  const { token } = useThemeToken();

  return {
    list: css`
      max-width: 300px;

      &__item.${cls('item')} {
        height: 46px;
        width: 100%;
        border-block-end: none;
        margin-bottom: 4px;
        padding: 0 12px;
        border-radius: 6px;
        position: relative;

        &:last-child {
          margin-bottom: 0;
        }

        &.${cls('checked')} {
          color: ${token.colorText};
          background-color: ${token.colorBgTextHover};
        }

        &:hover {
          color: ${token.colorText};
          background-color: ${token.colorBgTextHover};
          .right {
            color: ${token.colorText};
          }
        }

        .left {
          flex-shrink: 0;
          text-align: right;
          font-size: 12px;
          line-height: 20px;
          width: fit-content;
          margin-left: 4px;
          color: ${token.colorTextPlaceholder};
        }
      }

      &__button {
        width: 50px;
        flex-grow: 1;
        padding: 0;
        background-color: transparent !important;

        .right,
        .${cls('rightCheck')} {
          width: 100%;
          text-align: left;
        }
        .right {
          color: ${token.colorTextLabel};
        }
        .${cls('rightCheck')} {
          color: ${token.colorText};
        }
      }

      &__oper {
        width: 60px;
        flex-shrink: 0;

        display: flex;
        align-items: center;
        justify-content: right;
        margin-left: 4px;
        height: 22px;
      }
    `,
  };
}
