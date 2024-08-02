// Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useAuth } from "./../components/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // const onFinish = async (values) => {
  //   // try {
  //   //   const response = await axios.post(
  //   //     "https://iglo-cms-api.xyz/api/login",
  //   //     values
  //   //   );
  //   //   if (response.status === 200) {
  //   //     const userData = response.data.user; // Assuming the response contains user data
  //   //     login(userData, () => navigate("/"));
  //   //   }
  //   //   message.success("Login successful!");
  //   //   console.log("Logged in successfully", response.data);
  //   // } catch (error) {
  //   //   console.error("Login error", error);
  //   //   message.error("Failed to login, please try again.");
  //   // }
  // };

  const onSubmit = () => {
    navigate("/");
  };

  return (
    <>
      <section className="bg-blue-50 h-screen relative overflow-hidden">
        {/* Circle Backgrounds */}
        <div className="hidden lg:block absolute bg-blue-200 rounded-full w-80 h-80 -m-16 ml-32 -mt-48"></div>
        <div className="hidden lg:block absolute bg-blue-500 rounded-full w-96 h-96 -m-16 -ml-28 opacity-85"></div>
        <div className="hidden lg:block bottom-0 right-0 absolute bg-blue-200 rounded-full w-80 h-80 -mb-36 mr-24"></div>
        <div className="hidden lg:block bottom-0 right-0 absolute bg-blue-500 rounded-full w-96 h-96 -mb-24 -mr-24 opacity-85"></div>
        {/* End Circle Backgrounds */}

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-3xl font-bold leading-9 text-gray-900">
              IGLO CRM
            </h2>
          </div>

          <div className="mt-6 sm:mx-auto w-full sm:max-w-sm bg-white rounded-lg shadow-xl p-10">
            <h2 className="mb-6 font-bold text-blue-900 text-2xl text-center">
              Sign in
            </h2>
            <Form
              name="login"
              onFinish={onSubmit}
              className="flex-row space-y-4"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email"
                  size="large"
                  type="email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button className="w-full" type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
