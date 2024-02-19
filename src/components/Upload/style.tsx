import useThemeToken from '../../hooks/useThemeToken';
import { css } from '../../utils/cacheEmotion';

interface StyleProps {
  size: number;
}

function useStyle({ size }: StyleProps) {
  const { prefixCls } = useThemeToken();

  const btnSize = 16;

  return {
    upload: css`
      display: flex;
      &::before {
      }
      &::after {
      }

      .${prefixCls}-upload-list-item-container {
        display: none !important;
      }

      &__close {
        height: ${btnSize}px;
        width: ${btnSize}px;
        border-radius: 50%;

        position: absolute;
        top: -${btnSize / 2}px;
        right: -${btnSize / 2}px;

        background-color: rgb(153, 153, 153);
        overflow: hidden;
        cursor: pointer;

        &:hover {
          background-color: rgb(87, 86, 86) !important;
        }
      }

      &__uploading,
      &__error,
      &__done {
        border: none;
        padding: 0;
        width: ${size}px;
        height: ${size}px;
        position: relative;

        border-radius: 8px;
        flex-direction: column;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          color: rgba(0, 0, 0, 0.88);
          background-color: rgba(0, 0, 0, 0.06);
        }
        
      }

      &__uploading {
        border: 1px dashed rgb(217, 217, 217);
        background-color: rgba(0, 0, 0, 0.06);
        padding-top: 8px;
        color: rgba(0, 0, 0, 0.65);
      }
      &__error {
        border: 1px solid #ff4d4f;
        color: #ff4d4f;
        padding-top: 8px;
        &:hover {
          color: #ff4d4f;
          background-color: #fff;
        }
      }
      &__done {
        &__img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
      }
    `,
    previewList: css`
      .${prefixCls}-upload-list-item-container {
        width: ${size}px !important;
        height: ${size}px !important;
      }
    `,
  };
}

export default useStyle;
