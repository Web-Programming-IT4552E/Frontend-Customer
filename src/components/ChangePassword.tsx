import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

import { customerApis } from '@/apis/customerApi';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const resetForm = () => {
    form.setFieldsValue({
      old_password: '',
      new_password: '',
    });
  };

  const handleClose = () => {
    resetForm();
    router.push(router.pathname);
  };

  const onFinish = async (values: any) => {
    resetForm();
    try {
      await customerApis.changePassword(values);
      toast.success('Update password success');
    } catch (err: any) {
      toast.error(err?.message || 'Update password failed!');
    }
  };

  const onFinishFailed = () => {
    console.log('Failed');
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="mt-[20px] flex flex-col gap-[12px]"
        {...{
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        }}
      >
        <Form.Item
          name="old_password"
          label="Old Password:"
          rules={[{ required: true }]}
        >
          <Input
            type="password"
            className="w-full"
            placeholder="Please input your old password!"
          />
        </Form.Item>
        <Form.Item
          name="new_password"
          label="New Password:"
          rules={[{ required: true }]}
        >
          <Input
            type="password"
            className="w-full"
            placeholder="Please input your new password!"
          />
        </Form.Item>
        <div className="flex justify-end gap-[2px]">
          <Button className="confirm-btn" htmlType="submit">
            Confirm
          </Button>
          <Button className="cancel-btn" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ChangePassword;
