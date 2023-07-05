import { ShippingAddressData } from "@/@types/shipping-address";
import { useGetAllCities } from "@/apis/cityApi";
import { useGetAllCountries } from "@/apis/countryApi";
import { useGetAllDistricts } from "@/apis/districtApi";
import { useGetAllWards } from "@/apis/wardApi";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { shippingApis } from "@/apis/shippingAddressApi";
import { toast } from "react-toastify";
import { GetAllShippingAddressDataFieldItem } from '../@types/shipping-address';

const ShippingAddressModal: React.FC<{
  shippingData?: GetAllShippingAddressDataFieldItem;
  open: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}> = ({ open, onCancel, shippingData, onSuccess, onError }) => {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    countryId: "",
    cityId: "",
    districtId: "",
    wardId: "",
  });
  const { data: countryData = [] } = useGetAllCountries(open === true);
  const { data: cityData = [] } = useGetAllCities(
    filters.countryId,
    Object.keys(countryData).length !== 0
  );
  const { data: districtData = [] } = useGetAllDistricts(
    filters.cityId,
    Object.keys(cityData).length !== 0
  );
  const { data: wardData = [] } = useGetAllWards(
    filters.districtId,
    Object.keys(districtData).length !== 0
  );

  useEffect(() => {
    if (shippingData !== undefined) {
      const { receiver_name, receiver_phone_number, address } = shippingData.address_detail;
      form.setFieldsValue({
        receiver_name, receiver_phone_number, address
      })
    }
    else {
      setFilters({
        countryId: filters.countryId,
        cityId: "",
        districtId: "",
        wardId: "",
      })
    }
  }, [shippingData])

  useEffect(() => {
    if (countryData && Object.keys(countryData).length >= 0) {
      setFilters({
        ...filters,
        countryId: countryData[0]?.code || "",
      });
    }
  }, [countryData]);

  useEffect(() => {
    form.setFieldsValue({
      city: filters.cityId,
      country: filters.countryId,
      district: filters.districtId,
      ward: filters.wardId
    })
  }, [filters]);

  const resetForm = () => {
    form.setFieldsValue({
      receiver_name: "",
      receiver_phone_number: "",
      address: "",
    });
  };

  const handleClose = () => {
    resetForm();
    if (onCancel !== undefined) {
      onCancel();
    }
  };

  const handleFilters = (e: any, type: string) => {
    switch (type) {
      case "country":
        setFilters({
          ...filters,
          countryId: e,
          cityId: "",
          districtId: "",
          wardId: "",
        });
        break;
      case "city":
        setFilters({ ...filters, cityId: e, districtId: "", wardId: "" });
        break;
      case "district":
        setFilters({ ...filters, districtId: e, wardId: "" });
        break;
      case "ward":
        setFilters({ ...filters, wardId: e });
        break;
    }
  };

  const onFinish = async (values: ShippingAddressData) => {
    let handleFunction = [];

    values = {
      ...values,
      district: districtData.filter((item) => item.code === values.district)[0]!.name,
      ward: wardData.filter((item) => item.code === values.ward)[0]!.name,
      city: cityData.filter((item) => item.code === values.city)[0]!.name,
    }
    if (shippingData === undefined) {
      handleFunction.push(shippingApis.addOne({ address_detail: values }));
    } else {
      handleFunction.push(shippingApis.updateOne(shippingData._id,{ address_detail: values }));
    }
    await Promise.all(handleFunction)
      .then(() => {
        toast.success("Successfully");
        if (onSuccess !== undefined) {
          onSuccess();
        }
      })
      .catch((e) => {
        toast.error(e?.message || "Error");
        if (onError !== undefined) {
          onError();
        }
      });
    handleClose();
  };

  const onFinishFailed = () => {
    console.log("Failed");
  };

  return (
    <Modal
      className="shipping-modal"
      title={`${shippingData === undefined ? "Add" : "Modify"} shipping address`}
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
            initialValue={filters.countryId}
            name="country"
            label="Country:"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(e: any) => {
                handleFilters(e, "country");
              }}
              options={[
                { value: "", label: "Select country" },
                ...countryData.map((item) => {
                  return {
                    value: item.code,
                    label: item.name,
                  };
                }),
              ]}
            ></Select>
          </Form.Item>
        )}
        {filters.countryId !== ""  && (
          <Form.Item
            initialValue={filters.cityId}
            name="city"
            label="City:"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(e: any) => {
                handleFilters(e, "city");
              }}
              options={[
                { value: "", label: "Select city" },
                ...cityData.map((item) => {
                  return {
                    value: item.code,
                    label: item.name,
                  };
                }),
              ]}
            ></Select>
          </Form.Item>
        )}

        {filters.cityId !== ""   && (
          <Form.Item
            initialValue={filters.districtId}
            name="district"
            label="District:"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(e: any) => {
                handleFilters(e, "district");
              }}
              options={[
                { value: "", label: "Select district" },
                ...districtData.map((item) => {
                  return {
                    value: item.code,
                    label: item.name,
                  };
                }),
              ]}
            ></Select>
          </Form.Item>
        )}

        {filters.districtId !== ""  && (
          <Form.Item
            initialValue={filters.wardId}
            name="ward"
            label="Ward:"
            rules={[{ required: true }]}
          >
            <Select
              onChange={(e: any) => {
                handleFilters(e, "ward");
              }}
              options={[
                { value: "", label: "Select ward" },
                ...wardData.map((item) => {
                  return {
                    value: item.code,
                    label: item.name,
                  };
                }),
              ]}
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
