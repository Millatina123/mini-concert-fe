import React, { useEffect, useState } from "react";
import { Modal, Button, Typography, Divider, Form } from "antd";
import Dragger from "antd/es/upload/Dragger";
const { Text, Title } = Typography;

const PaymentForm = ({ form, data }) => {
  const handleLogoChange = (info) => {
    if (info.file.status === "done") {
      form.setFieldsValue({ evidence: info.file.response.url }); // Assuming the backend returns the logo URL after upload
    }
  };

  useEffect(() => {
    if (data?.id) {
      form.setFieldsValue({ concertId: data?.id });
    }
  }, [data, form]);

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <div>
      <div className="mt-4">
        <div className="flex justify-between py-1">
          <Text>Name</Text>
          <Text strong>{JSON.parse(localStorage.getItem("user")).user.name}</Text>
        </div>
        <div className="flex justify-between py-1">
          <Text>Concert</Text>
          <Text strong>{data?.name}</Text>
        </div>

        <div className="flex justify-between py-1">
          <Text>Concert Date</Text>
          <Text strong>{data?.start_date}</Text>
        </div>
        <div className="flex justify-between py-1">
          <Text>Price</Text>
          <Text strong>{formatRupiah(data?.price)}</Text>
        </div>

        <div className="mt-4">
          <Title level={4}>Transfer to BRI with number </Title>
        </div>
        <div className="flex items-center">
          <img className="w-36 h-auto me-4" src="https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_BRI.png" alt="Logo" />
          <div className="flex flex-col items-start">
            <div className="font-medium text-xl"> 1029129200129012</div>
            <span className="text-gray-500">Millatina Fadhilla</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="font-medioum text-base">
            Total : <span className="font-bold text-lg">{formatRupiah(data?.price)}</span>
          </span>
        </div>
        <div className="">
          <span className="text-gray-500">Save evidence and upload below</span>
        </div>
        <div className="mt-4">
          <Form form={form} layout="vertical">
            <Form.Item name="concertId" initialValue={data?.id} hidden>
              <input type="hidden" />
            </Form.Item>
            <Form.Item label="Evidence" name="evidence" rules={[{ required: true, message: "Please upload the Evidence!" }]}>
              <Dragger name="evidence" action={process.env.NEXT_PUBLIC_BASE_API_URL + "user/payment/upload"} multiple={false} onChange={handleLogoChange} accept=".jpg,.jpeg,.png">
                <p className="ant-upload-drag-icon">{/* Upload icon */}</p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Insert Evidence of transfer</p>
              </Dragger>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
