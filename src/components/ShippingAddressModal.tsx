import { ShippingAddressData } from "@/@types/shipping-address";
import { useGetAllCities } from "@/apis/cityApi";
import { useGetAllCountries } from "@/apis/countryApi";
import { useGetAllDistricts } from "@/apis/districtApi";
import { useGetAllWards } from "@/apis/wardApi";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";

const ShippingAddressModal: React.FC<{
  shippingData?: ShippingAddressData;
  open: boolean;
  onCancel: () => void;
}> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    countryId: "",
    cityId: "",
    districtId: "",
  });
  const { data: countryData } = useGetAllCountries();
  const { data: cityData } = useGetAllCities(
    filters.countryId,
    filters.countryId !== ""
  );
  const { data: districtData } = useGetAllDistricts(
    filters.cityId,
    filters.cityId !== ""
  );
  const { data: wardData } = useGetAllWards(
    filters.districtId,
    filters.districtId !== ""
  );

  useEffect(() => {
    if (countryData && Object.keys(countryData).length >= 0) {
      setFilters({
        ...filters,
        countryId: countryData[0]!.code,
      });
    }
  }, [countryData]);

  const resetForm = () => {
    form.setFieldsValue({
      receiver_name: "",
      receiver_phone_number: "",
      address: "",
    });
  };

  const handleClose = () => {
    resetForm();
    onCancel();
  };

  const handleFilters = (e: any, type: string) => {
    switch (type) {
      case "country":
        setFilters({ ...filters, countryId: e });
        break;
      case "city":
        setFilters({ ...filters, cityId: e });
        break;
      case "district":
        setFilters({ ...filters, districtId: e });
        break;
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
    handleClose();
    onCancel();
  };

  const onFinishFailed = () => {
    console.log("Failed");
  };

  return (
    <Modal
      className="shipping-modal"
      title="Add shipping address"
      open={open}
      onCancel={onCancel}
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
          <Input className="w-full" placeholder="Please input your username!" />
        </Form.Item>
        <Form.Item
          name="receiver_phone_number"
          label="Phone Number:"
          rules={[{ required: true }]}
        >
          <Input placeholder="Please input phone nunber!" />
        </Form.Item>
        {countryData !== undefined && (
          <Form.Item
            initialValue={countryData[0]!.code}
            name="country"
            label="Country:"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(e: any) => { handleFilters(e, "country") }}
              options={countryData.map((item) => {
                return {
                  value: item.code,
                  label: item.name,
                };
              })}
            ></Select>
          </Form.Item>
        )}
        {cityData !== undefined && (
          <Form.Item
            initialValue={cityData[0]?.code}
            name="city"
            label="City:"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(e: any) => { handleFilters(e, "city") }}
              options={cityData.map((item) => {
                return {
                  value: item.code,
                  label: item.name,
                };
              })}
            ></Select>
          </Form.Item>
        )}

        {districtData !== undefined && (
          <Form.Item
            initialValue={districtData[0]!.code}
            name="district"
            label="District:"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(e: any) => { handleFilters(e, "district") }}
              options={districtData.map((item) => {
                return {
                  value: item.code,
                  label: item.name,
                };
              })}
            ></Select>
          </Form.Item>
        )}

        {wardData !== undefined && (
          <Form.Item
            initialValue={wardData[0]!.code}
            name="ward"
            label="Ward:"
            rules={[{ required: true }]}
          >
            <Select
              options={wardData.map((item) => {
                return {
                  value: item.code,
                  label: item.name,
                };
              })}
            ></Select>
          </Form.Item>
        )}
        <Form.Item name="address" label="Address:" rules={[{ required: true }]}>
          <Input placeholder="Please input address!" />
        </Form.Item>
        <div className="flex justify-end gap-[2px]">
          <Button id="confirm-btn" htmlType="submit">
            Confirm
          </Button>
          ,
          <Button id="cancel-btn" onClick={handleClose}>
            {" "}
            Close
          </Button>
          ,
        </div>
      </Form>
    </Modal>
  );
};

export default ShippingAddressModal;
