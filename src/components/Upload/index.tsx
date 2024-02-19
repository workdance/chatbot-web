import type { UploadProps as AntUploadProps } from 'antd';
import { Upload as AntUpload, Button, Modal, Tooltip } from 'antd';
import type { UploadFile as AntUploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { cls } from '../../common';
import { getBase64 } from '../../utils';
import IconBase, { Loading } from '../Icon';
import useStyle from './style';

export type UploadFile = AntUploadFile;

/** Antd UploadFile */
// export type UploadFile<T = any> = {
//   uid: string;
//   size?: number;
//   name: string;
//   fileName?: string;
//   lastModified?: number;
//   lastModifiedDate?: Date;
//   url?: string;
//   status?: 'error' | 'done' | 'uploading' | 'removed';
//   percent?: number;
//   thumbUrl?: string;
//   crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin'];
//   originFileObj?: {
//     uid: string;
//     readonly lastModifiedDate: Date;
//   } & File;
//   response?: T;
//   error?: any;
//   linkProps?: any;
//   type?: string;
//   xhr?: T;
//   preview?: string;
// };

// export interface UploadChangeProps {
//   /** 当前操作的文件 */
//   file: UploadFile;
//   /** 操作后的文件列表 */
//   fileList: UploadFile[];
//   /** 上传进度 */
//   event?: {
//     percent: number;
//   };
// }

export interface ExtendsUploadProps {
  /**
   * 文件预览的位置, id 或者dom节点  
   * el: containerRef = useRef(null)
   * @example {
   *  const domRef = useRef(null);
      <div ref={domRef} ></div>
      <Upload
        action={action}
        containerRef={domRef}
        containerRef={'id'}
        onChange={handleChange}
        fileList={uploadList}
      />
   * }
   */
  container?: any;
  /** 预览大小
   * @default 72
   */
  size?: number;
  /**
   * hover 显示
   * @default 上传图片
   */
  hoverNode?: React.ReactNode | (() => React.ReactNode);
}

// 自定义编写
/** @deprecated 仅用于 API 文档说明 */
export const DOCS_API_Upload_PROPS: React.FC<ExtendsUploadProps> = () => null;

// 定义导致docs 自动化api异常，ExtendsUploadProps 自定义编写
export type UploadProps = ExtendsUploadProps & AntUploadProps;

const Upload = (props: UploadProps) => {
  let {
    container,
    size = 72,

    onChange,
    fileList = [],
    action = 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    hoverNode,
    ...rest
  } = props;
  const [tag, setTag] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const style = useStyle({ size });
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const renderCloseBtn = (uid: string) => {
    return (
      <div
        className={`${style.upload}__close`}
        onClick={(e) => {
          e.stopPropagation();

          let file: UploadFile | undefined;
          const list: UploadFile[] = fileList.filter((e) => {
            if (e.uid !== uid) return true;

            file = e;
            return false;
          });

          if (file) {
            onChange?.({ file, fileList: list });
          }
        }}
      >
        <IconBase
          style={{
            color: 'white',
            position: 'relative',
            top: '-4px',
            left: '2px',
          }}
          type="icon-close-outlined"
          size={12}
        />
      </div>
    );
  };

  const renderItem = (originNode, file, fileList, actions) => {
    if (!file) {
      console.log({ originNode, fileList, actions });
    }

    if(file.percent === 100){
      file.status = 'done';
    }

    switch (file.status) {
      case 'done':
        return (
          <div
            onClick={() => handlePreview(file)}
            className={`${style.upload}__done`}
          >
            <img
              src={file.url || file.thumbUrl}
              alt=""
              className={`${style.upload}__done__img`}
            />
            {renderCloseBtn(file.uid)}
          </div>
        );

      case 'uploading':
        return (
          <div
            className={`${style.upload}__uploading`}
          >
            <Loading />
            <p>上传中</p>
            {renderCloseBtn(file.uid)}
          </div>
        );

      case 'error':
        return (
          <div
            className={`${style.upload}__error`}
          >
            <IconBase type="icon-reload-outlined" size={20} />
            <p>上传失败</p>
            {renderCloseBtn(file.uid)}
          </div>
        );

      case 'removed':
      default:
        return null;
    }
  };

  const portalContent = (
    <AntUpload
      {...rest}
      action={action}
      listType="picture-card"
      // listType="picture"
      fileList={fileList}
      onPreview={handlePreview}
      onChange={onChange}
      // (originNode: ReactElement,
      // file: UploadFile,
      // fileList: object[],
      // actions: { download: function, preview: function, remove: function }
      // ) => React.ReactNode
      itemRender={renderItem}
      className={`${style.previewList}`}
    />
  );

  useEffect(() => {
    if (typeof container === 'string' || !container) {
      const id = cls('render-upload-list');
      const containerRef = document.getElementById(container || id);
      setTag(containerRef || null);
    } else if (container) {
      setTag(container || null);
    }
  }, [container]);

  return (
    <>
      {tag && ReactDOM.createPortal(portalContent, tag?.current || tag)}
      <AntUpload
        maxCount={1}
        accept="image/*"
        {...rest}
        action={action}
        // listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={onChange}
        className={`${style.upload}`}
        itemRender={() => null}
      >
        <Tooltip
          trigger="hover"
          color={'#fff'} // 背景
          title={hoverNode || <div style={{ color: '#262626' }}>点击上传</div>}
        >
          <Button
            style={{ width: '38px', height: '38px', marginRight: '4px' }}
            type="text"
            icon={<IconBase type="icon-upload-image" size={24} />}
          />
        </Tooltip>
      </AntUpload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default Upload;
