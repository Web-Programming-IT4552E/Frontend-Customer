import { Button, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { truncateString } from '@/utils/string';
import { useGetAllShippingAddresses } from '@/apis/shippingAddressApi';

const ShippingAddresses = () => {
  const { data: shippingAddressData } = useGetAllShippingAddresses(1, 9);
  const [form] = Form.useForm();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleClickBtn = (isAdd: boolean = false) => {
    console.log(isAdd);
    setIsOpenModal(true);
  };

  const resetForm = () => {
    form.setFieldsValue({
      receiver_name: '',
      receiver_phone_number: '',
      address: '',
    });
  };

  const handleClose = () => {
    resetForm();
    setIsOpenModal(false);
  };

  const onFinish = (values: any) => {
    resetForm();
    setIsOpenModal(false);
    console.log(values);
  };

  const onFinishFailed = () => {
    console.log('Failed');
  };

  return (
    <>
      <Modal
        className="shipping-modal"
        title="Add shipping address"
        open={isOpenModal}
        onCancel={handleClose}
        footer={[]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mt-[20px] flex flex-col gap-[12px]"
          {...{
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
          }}
        >
          <Form.Item
            name="receiver_name"
            label="Fullname:"
            rules={[{ required: true }]}
          >
            <Input
              className="w-full"
              placeholder="Please input your username!"
            />
          </Form.Item>
          <Form.Item
            name="receiver_phone_number"
            label="Phone Number:"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please input phone nunber!" />
          </Form.Item>
          <Form.Item
            initialValue={0}
            name="city"
            label="City:"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 0, label: 'Jack' },
                { value: 1, label: 'Lucy' },
                { value: 2, label: 'yiminghe' },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            initialValue={0}
            name="district"
            label="District:"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 0, label: 'Jack' },
                { value: 1, label: 'Lucy' },
                { value: 2, label: 'yiminghe' },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            initialValue={0}
            name="ward"
            label="Ward:"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: 0, label: 'Jack' },
                { value: 1, label: 'Lucy' },
                { value: 2, label: 'yiminghe' },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address:"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please input address!" />
          </Form.Item>
          <div className="flex justify-end gap-[2px]">
            <Button id="confirm-btn" htmlType="submit">
              Confirm
            </Button>
            ,
            <Button id="cancel-btn" onClick={handleClose}>
              {' '}
              Close
            </Button>
            ,
          </div>
        </Form>
      </Modal>
      <div id="shipping-addresses">
        <h2 className="mt-[60px] mb-[40px] text-[24px] font-semibold md:text-[36px]">
          Shipping Address
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-[12px] px-[20px] lg:px-[60px]">
          {shippingAddressData?.data !== undefined && shippingAddressData.data.map((item, idx) => {
            return (
              <Button
                type="default"
                key={idx}
                onClick={() => {
                  handleClickBtn(false);
                }}
              >
                <div className="flex flex-col gap-[5px] text-start">
                  <p>
                    <span>Address:</span>{' '}
                    {truncateString(`${item.address_detail.address}, ${item.address_detail.ward}, ${item.address_detail.district}, ${item.address_detail.city}` || "")}
                  </p>
                  <p>
                    <span>Phone:</span> {item.address_detail.receiver_phone_number}
                  </p>
                </div>
              </Button>
            );
          })}
          <Button
            type="dashed"
            onClick={() => {
              handleClickBtn(true);
            }}
          >
            <AiOutlinePlusCircle className="mr-[5px] text-[20px]" /> Add
            shipping address
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShippingAddresses;
