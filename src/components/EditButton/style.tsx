import {} from 'react';
import useThemeToken from '../../hooks/useThemeToken';
import css from '../../utils/cacheEmotion';

export default function useStyle() {
  const { token } = useThemeToken();

  return {
    EditButton: css`
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
    `,
  };
}
