import { createFromIconfontCN } from '@ant-design/icons';
import type { IconBaseProps } from '@ant-design/icons/es/components/Icon';
import React, { useEffect } from 'react';
import { css, keyframes } from '@/utils/cacheEmotion';
import useStyle from './style';

// https://hitu.antgroup-inc.cn/artists/antdesignfuture/icons
const AntDesignFutureIcon = createFromIconfontCN({
  scriptUrl: 'https://mdn.alipayobjects.com/design_kitchencore/afts/file/kWoPT77-pb0AAAAAAAAAAAAADhulAQBr',
});

enum IconType {
  'icon-file-copy-outlined',
  'icon-like-filled',
  'icon-like-outlined',
  'icon-loading-outlined',
  'icon-minus-circle-outlined',
  'icon-reload-outlined',
  'icon-send-filled',
  'icon-share-outlined',
  'icon-unlike-filled',
  'icon-unlike-outlined',

  'icon-delete-outlined',
  'icon-edit-outlined',
  'icon-close-circle-outlined',
  'icon-question-circle-outlined',
  'icon-stop-outlined',
  'icon-close-outlined',
  'icon-field-time-outlined',
  'icon-plus-outlined',
  'icon-check-outlined',

  'icon-align-left',
  'icon-book-outlined',
  'icon-carry-out',
  'icon-code-library',
  'icon-condensed-content',
  'icon-file-sync',
  'icon-file-text',
  'icon-image',
  'icon-modify-punctuation',
  'icon-partition',
  'icon-solution',
  'icon-table',
  'icon-translate',
  'icon-unordered-list',

  'icon-ai',

  'icon-upload-image',

  'icon-loading',
  'icon-retry-image',

  'icon-call-source-outlined',
  'icon-source-outlined',
  'icon-warn-circle-outlined',
  'icon-check-circle-outlined',
  'icon-direction',
}
export type TIconType = keyof typeof IconType;

export interface IconBasePropsType extends IconBaseProps {
  type: TIconType;
  /**
   * icon 大小 font-size
   * @default 16
   */
  size?: number;
}

const Icon: React.FunctionComponent<IconBasePropsType> = (props) => {
  const { type, style = {}, ...rest } = props;

  const styles = useStyle(props);

  useEffect(() => {
    const iconSymbol = document.getElementById(type as string);
    if (style.color) {
      iconSymbol?.children[0]?.setAttribute('fill', style.color);
    }
  }, [style.color]);

  return (
    <AntDesignFutureIcon
      {...rest}
      style={style}
      className={`${styles.icon} ${rest.className || ''}`}
      type={type}
    />
  );
};

export default Icon;

export const Loading = (props) => {
  const { size = 20, style, type = 'icon-loading-outlined', className = '', ...rest } = props;
  const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

  const styles = {
    Loading: css`
      animation: ${rotate} 1s linear infinite;
    `,
  };

  return (
    <Icon
      className={`${styles.Loading} ${className}`}
      style={Object.assign({ cursor: 'auto' }, style)}
      type={type}
      size={size}
      {...rest}
    />
  );
};

export const RetryImage = (props) => {
  return <Icon type="icon-retry-image" {...props} />;
};

export const IconCheck = (props) => {
  return <Icon type="icon-check-outlined" {...props} />;
};

export const IconAbortCircle = (props) => {
  return <Icon type="icon-minus-circle-outlined" {...props} />;
};

// 🧬
export const IconCallSource = (props) => {
  return <Icon type="icon-call-source-outlined" {...props} />;
};

// 🎾
export const IconSearchSource = (props) => {
  return <Icon type="icon-source-outlined" {...props} />;
};

// ❗️
export const IconWarnCircle = (props) => {
  return <Icon type="icon-warn-circle-outlined" {...props} />;
};

export const IconCheckCircle = (props) => {
  return <Icon type="icon-check-circle-outlined" {...props} />;
};

export const IconDirectionDown = (props) => {
  return <Icon type="icon-direction" {...props} />;
}

export const IconDirectionTop = (props) => {
  const { className = '', ...rest } = props; 
  const styles = {
    index: css`
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    `,
  }
  return <Icon className={`${styles.index} ${className}`} type="icon-direction" {...rest} />;
}

export const IconDirectionLeft = (props) => {
  const { className = '', ...rest } = props; 
  const styles = {
    index: css`
      transform: rotate(90deg);
    `,
  }
  return <Icon className={`${styles.index} ${className}`} type="icon-direction" {...rest} />;
}

export const IconDirectionRight = (props) => {
  const { className = '', ...rest } = props; 
  const styles = {
    index: css`
      transform: rotate(-90deg);
    `,
  }
  return <Icon className={`${styles.index} ${className}`} type="icon-direction" {...rest} />;
}