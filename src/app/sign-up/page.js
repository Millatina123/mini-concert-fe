"use client";

import React from "react";
import { Button, Form, Input, Card, InputNumber } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useRegisterMutation } from "@/redux/services/auth"; // Ensure this import is correct and the service exists
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { saveToken, saveUser } from "@/utils/auth";

const SignUp = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        phone_number: values.phone_number,
      }).unwrap();

      saveToken(response.payload.data.token);
      saveUser(JSON.stringify(response.payload.data));
      router.push("/customer");
    } catch (error) {
      toast.error(error.data.payload.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src="https://aqbgvzzymp.cloudimg.io/v7/barokahabadi.co.id/wp-content/uploads/2020/11/dummy-logo-1b.png" alt="Logo" className="w-56 h-auto mb-8" />
      <Card className="w-full max-w-md p-4">
        <Title level={3}>Welcome to the mini concert!</Title>
        <Paragraph>Sign Up to continue</Paragraph>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <InputNumber prefix="+62" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
            <Input.Password />
          </Form.Item>

          <Form.Item className="w-full">
            <Button type="primary" htmlType="submit" className="w-full" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <p>
            Do you have an account? <a href="/sign-in">Login</a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
