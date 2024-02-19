import {} from 'react';
import useThemeToken from '../../hooks/useThemeToken';
import css from '../../utils/cacheEmotion';

function useStyle() {
  const {} = useThemeToken();

  return {
    'send-btn': css`
      min-width: 38px;
      height: 38px;
      min-height: 38px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    `,
  };
}

export default useStyle;
