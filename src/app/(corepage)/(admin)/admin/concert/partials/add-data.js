import React from "react";
import { Form, Input, DatePicker, TimePicker, InputNumber } from "antd";
import moment from "moment";
import Dragger from "antd/es/upload/Dragger";

const { TextArea } = Input;

const ConcertForm = ({ form }) => {
  const handleDateChange = (date) => {
    form.setFieldsValue({ start_date: date ? moment(date).format("DD-MM-YYYY") : null });
  };

  const handleTimeChange = (time) => {
    form.setFieldsValue({ start_hours: time ? moment(time).format("HH:mm") : null });
  };

  const handleLogoChange = (info) => {
    if (info.file.status === "done") {
      form.setFieldsValue({ logo: info.file.response.url }); // Assuming the backend returns the logo URL after upload
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the concert name!" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Logo" name="logo" rules={[{ required: true, message: "Please upload the logo!" }]}>
        <Dragger name="logo" action={process.env.NEXT_PUBLIC_BASE_API_URL+"/concerts/upload"} onChange={handleLogoChange} accept=".jpg,.jpeg,.png">
          <p className="ant-upload-drag-icon">{/* Upload icon */}</p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Dragger>
      </Form.Item>

      <Form.Item label="Start Date" name="start_date" rules={[{ required: true, message: "Please input the start date!" }]}>
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>
      <Form.Item label="Start Hours" name="start_hours" rules={[{ required: true, message: "Please input the start hours!" }]}>
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item label="Price (Rupiah)" name="price" rules={[{ required: true, message: "Please input the price!" }]}>
        <InputNumber formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(value) => value.replace(/\Rp\s?|(,*)/g, "")} style={{ width: "100%" }} />
      </Form.Item>
    </Form>
  );
};

export default ConcertForm;
