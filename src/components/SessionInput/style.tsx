import {} from 'react';
import useThemeToken from '../../hooks/useThemeToken';
import css from '../../utils/cacheEmotion';

export default function useStyle() {
  const { token } = useThemeToken();

  return {
    SessionInput: css`
      width: 100%;
      display: flex;
      align-items: center;

      &__input {
        border: 1px solid ${token.colorBgTextActive};
        box-shadow: none;
        border-radius: 6px !important;
      }

      > button {
        border: 0;
        padding: 0;
        width: 24px;
        min-width: 24px;
        height: 24px;
        margin-left: 4px;
      }

      &__check {
        color: #52c41a;
      }

      &__close {
        color: #ff4d4f;
      }
    `,
  };
}
