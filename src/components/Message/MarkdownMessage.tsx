import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import { Prism } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeMathjax from 'rehype-mathjax/svg';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import MessageBase, { type MessageBaseProps } from './MessageBase';

export interface MarkdownMessageProps extends MessageBaseProps {
  /** 富文本格式字符串模版 */
  children?: string;
  /** 自定义markdown components样式 */
  components?: ReactMarkdownOptions['components'];
}

const Table = ({ children }) => {
  const style: {
    borderCollapse: 'collapse' | 'separate' | 'inherit';
    [key: string]: string;
  } = {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid #E7E9E8',
  };
  return <table style={style}>{children}</table>;
};

const THead = ({ children }) => {
  const style = {
    backgroundColor: '#F4F5F5',
    fontWeight: 'bold',
  };
  return <thead style={style}>{children}</thead>;
};

const TBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const TRow = ({ children }) => {
  const style = {
    border: '1px solid #E7E9E8',
  };
  return <tr style={style}>{children}</tr>;
};

const TData = ({ children }) => {
  const style = {
    padding: '8px',
    border: '1px solid #E7E9E8',
  };
  return <td style={style}>{children}</td>;
};

const defaultComponents: ReactMarkdownOptions['components'] = {
  code(attributes) {
    const { inline, children, className, node } = attributes || {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, language] = /language-(\w+)/.exec(className || '') || [];

    if (inline || !language)
      return React.createElement(node.tagName, {}, children);

    const codeText = `${Array.isArray(children) ? children[0] : children}`;

    return (
      <Prism style={oneDark} language={language}>
        {codeText}
      </Prism>
    );
  },
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: TRow,
  td: TData,
  th: TData,
};

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({
  children = '',
  components = {},
  ...baseMsgProps
}) => {
  return (
    <MessageBase {...baseMsgProps}>
      <div style={{ padding: '12px 16px 0 16px' }}>
        <ReactMarkdown
          className='markdown-body'
          skipHtml={false}
          components={{ ...defaultComponents, ...components }}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeMathjax, rehypeRaw] as any}
        >
          {children}
        </ReactMarkdown>
      </div>
    </MessageBase>
  );
};

export default MarkdownMessage;