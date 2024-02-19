import css from '@/utils/cacheEmotion';

function useStyle(props: any) {
  const { size = 16 } = props;

  return {
    icon: css`
      ${size ? `font-size: ${size}px !important;` : ''}
      cursor: pointer;
      display: inline-block;
      ${props.disabled ? 'align-items: not-allowed;' : 'align-items: center;'}
    `,
  };
}

export default useStyle;
