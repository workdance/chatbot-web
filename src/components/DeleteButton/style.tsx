import {} from 'react';
import useThemeToken from '../../hooks/useThemeToken';
import css from '../../utils/cacheEmotion';

export default function useStyle() {
  const { token, prefixCls } = useThemeToken();

  return {
    DeleteButton: css`
      width: 24px !important;
      height: 24px;
      margin-left: 4px;

      display: flex;
      align-items: center;
      justify-content: center;
      color: ${token.colorTextTertiary};
      background-color: rgba(0, 0, 0, 0);

      &:hover {
        color: ${token.colorTextTertiary} !important;
        background-color: ${token.controlItemBgHover} !important;
      }

      &__Popconfirm {
        width: 180px;

        .${prefixCls}-popconfirm-message {
          margin-bottom: 15px;

          .${prefixCls}-popconfirm-message-icon{
            position: relative;
            top: 4px;
          }
        }

        .${prefixCls}-popconfirm-description {
          margin-top: 0;
        }
      }
    `,
  };
}
