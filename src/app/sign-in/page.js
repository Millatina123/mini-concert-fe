"use client";
import React from "react";
import { Button, Checkbox, Form, Input, Card } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useLoginMutation } from "@/redux/services/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { saveToken, saveUser } from "@/utils/auth";

const SignIn = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      saveToken(response.payload.data.token);
      saveUser(JSON.stringify(response.payload.data));
      if (response.payload.data.user.role === "USER") {
        router.push("/customer");
      } else {
        router.push("/admin");
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.data.payload.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={"https://aqbgvzzymp.cloudimg.io/v7/barokahabadi.co.id/wp-content/uploads/2020/11/dummy-logo-1b.png"} alt="Logo" className="w-56 h-auto mb-8" /> {/* Logo */}
      <Card className="w-full max-w-md p-4 ">
        <Title level={3}>Welcome in mini concert!</Title>
        <Paragraph>Sign in to continue</Paragraph>
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
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
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          {/* Register Link */}
          <p>
            Don't have an account? <a href="/sign-up">Register</a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
