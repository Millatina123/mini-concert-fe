"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useUpdateUserMutation } from "@/redux/services/auth";

const { Title } = Typography;

const EditProfile = () => {
  const [form] = Form.useForm();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [localStorage_user,setLocaStorageUser] = useState();
  useEffect(() => {
    setLocaStorageUser(JSON.parse(window.localStorage.getItem("user")))
  }, [])
  const onFinish = async (values) => {
    try {
      const { email, name, phone } = values;

      var data = {
        id: JSON.parse(localStorage.getItem("user")).user.id,
        email: email,
        name: name,
        phone_number: phone,
      };

      const response = await updateUser(data).unwrap();
      const response_fix = response.payload.data.user;
      localStorage.setItem("user", JSON.stringify({ user: response_fix }));

      // Update localStorage with new user data
      //   localStorage.setItem("user", JSON.stringify({ user: response.user }));
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Title level={3}>Edit Profile</Title>
      <p className="text-black mb-3">Update your profile information below.</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          email: JSON.parse(localStorage_user).user.email, // Initial email value
          name: JSON.parse(localStorage_user).user.name, // Initial name value
          phone: JSON.parse(localStorage_user).user.phone_number, // Initial phone number value
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not a valid email!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="Enter your email" disabled />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset} style={{ marginLeft: "8px" }}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditProfile;
