"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useUpdatePasswordMutation } from "@/redux/services/auth";

const { Title } = Typography;

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [localStorageUser, setLocalStorageUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLocalStorageUser(JSON.parse(user));
    }
  }, []);

  const onFinish = async (values) => {
    try {
      const { password } = values;
      const userId = localStorageUser.user.id;

      const data = {
        id: userId,
        password,
      };

      const response = await updatePassword(data).unwrap();
      const updatedUser = response.payload.data.user;
      window.localStorage.setItem("user", JSON.stringify({ user: updatedUser }));

      message.success("Password updated successfully");
    } catch (error) {
      message.error("Failed to update password");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Title level={3}>Update Password</Title>
      <p className="text-black mb-3">Update your password below.</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          password: "", // Initial password value
          confirmPassword: "", // Initial confirmation password value
        }}
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
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

export default UpdatePassword;
