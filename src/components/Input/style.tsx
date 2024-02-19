import useThemeToken from '../../hooks/useThemeToken';
import css from '../../utils/cacheEmotion';

function useStyle({ tipsPosition }) {
  const { token } = useThemeToken();

  function dir(direction = 'top') {
    const tempMap = {
      left: 'right',
      right: 'left',
      top: 'bottom',
      bottom: 'top',
    };

    let d = direction;
    if (!(d in tempMap)) d = 'top';

    return `margin-${tempMap[d]}: 8px; ${tempMap[d]}: 0px;`;
  }

  return {
    ['input']: css`
      &__container {
        position: relative;
      }

      &__tips {
          flex-basis: 100%;
          border-bottom: 1px solid ${token.colorBorderSecondary};
          ${dir(tipsPosition)}

          position: absolute;
          width: 100%;
          background-color: #ffffff;
          box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
            0 3px 6px -4px rgba(0, 0, 0, 0.12),
            0 9px 28px 8px rgba(0, 0, 0, 0.05);
          border-radius: ${token.borderRadiusLG}px;
        }

      &__inputContainer {
        display: flex;
        flex-wrap: nowrap;
        min-width: 348px;
        max-width: 832px;
        min-height: 46px;
        border: 2px solid ${token.colorPrimary};
        border-radius: ${token.borderRadiusLG}px;

        background-color: #fff;

        position: relative;


        &__content {
          flex-grow: 1;
          &__list {
            padding: 0 24px;
            line-height: 0;
            display: flex;
          }
        }
        &__operation {
          align-self: flex-end;

          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          height: 46px;
        }
      }

      &__textarea {
        flex: 1;
        min-height: 14px;
        max-height: 176px;
        padding: 0 24px;
        margin: 12px 0;
      }

      &__sender {
        margin-right: 4px;

        display: flex;
        align-items: center;
      }

      &__icon {
        width: 24px;
        height: 24px;
        margin-left: 16px;
        color: #585a5a;

        & + textarea {
          padding-left: 12px;
        }
      }
    `,
  };
}

export default useStyle;
