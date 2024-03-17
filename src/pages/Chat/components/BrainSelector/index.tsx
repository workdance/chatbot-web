import { CheckCard } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Form, Input, Modal } from "antd";
import { useEffect, useRef, useState } from "react";

export default function BrainSelector(props) {
  const { open, setOpen, onBrainSelect } = props;
  const brainIdRef = useRef('');;
  const chatNameRef = useRef('');;
  // const { brainListViewModel, renderBrainList } = useModel('Studio.brainListViewModel')
  // useEffect(() => {
  //   renderBrainList();
  // }, [])
  const handleOk = () => {
    onBrainSelect({
      brainId: brainIdRef.current,
      chatName: chatNameRef.current,
    })
    setOpen(false);
    chatNameRef.current = '';
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value)
    chatNameRef.current = e.target.value
  }

  const [form] = Form.useForm();

  return <Modal
    open={open}
    onOk={handleOk}
    onCancel={handleCancel}
  >
    <div>
    <Form
      form={form}
      layout="vertical"
    >
      <Form.Item label="会话名称" required tooltip="This is a required field">
        <Input onChange={handleInputChange} placeholder="input placeholder" />
      </Form.Item>
      {/* <Form.Item
        label="大脑类型"
        tooltip={{ title: 'Tooltip with customize icon'}}
      >
        <CheckCard.Group
        onChange={(brainId) => {
          console.log('brainId', brainId)
          brainIdRef.current = brainId;
        }}
      >
        {brainListViewModel.brainList.map(item => {
          return <CheckCard size="small" title={item.name} key={item.id} description={item.description} value={item.brainId} />
        })}
      </CheckCard.Group>
      </Form.Item> */}
    </Form>
      
    </div>
  </Modal>
}