// Login.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useAuth } from "./../components/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "https://iglo-cms-api.xyz/api/login",
        values
      );
      if (response.status === 200) {
        const userData = response.data.user; // Assuming the response contains user data
        login(userData, () => navigate("/"));
      }
      message.success("Login successful!");
      console.log("Logged in successfully", response.data);
    } catch (error) {
      console.error("Login error", error);
      message.error("Failed to login, please try again.");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-hidden">
          <section className="bg-red-100 h-screen relative">
            {/* Circle Backgrounds */}
            <div className="absolute bg-red-200 rounded-full w-80 h-80 -m-16 ml-32 -mt-48"></div>
            <div className="absolute bg-rose-700 rounded-full w-96 h-96 -m-16 -ml-28 opacity-85"></div>
            <div className="bottom-0 right-0 absolute bg-red-200 rounded-full w-80 h-80 -mb-36 mr-24"></div>
            <div className="bottom-0 right-0 absolute bg-rose-700 rounded-full w-96 h-96 -mb-24 -mr-24 opacity-85"></div>
            {/* End Circle Backgrounds */}

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="mb-4 text-center text-3xl font-extrabold text-gray-950">
                  TECH <span className="text-red-900">TOLK</span>
                </h1>
                <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                  IGLO
                </h2>
              </div>

              <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm bg-white rounded-lg shadow-xl p-10">
                <h2 className="mb-6 font-bold text-red-900 text-2xl text-center">
                  Sign in
                </h2>
                <Form
                  name="login"
                  onFinish={onFinish}
                  className="space-y-4"
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
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <button
                      htmltype="submit"
                      className="flex w-full justify-center rounded-md bg-red-800 px-3 py-2 font-semibold leading-6 text-white shadow-sm hover:bg-red-600 text-lg mt-8"
                    >
                      Sign in
                    </button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Login;
