import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { theme } from "antd";
import { useLogin } from "./useLogin.js";

function LoginForm() {
  const { login, isPending } = useLogin();
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onFinish = (values) => {
    login(values);
  };

  return (
    <div
      style={{
        background: colorBgContainer,
      }}
      className="flex items-center justify-center h-screen"
    >
      <div
        style={{
          boxShadow:
            " inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
        }}
        className="w-full max-w-lg"
      >
        <Form
          form={form}
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 5 }}
          requiredMark={false}
          size="large"
          layout="horizontal"
          onFinish={onFinish}
          className="p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-center  text-lg uppercase font-bold">Log in</h1>
          <p className="text-center pb-4 text-sm ">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </p>
          <Form.Item
            label="Username"
            className="pb-4"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <div className="flex justify-end space-x-4 flex-wrap gap-4 ">
            <Button
              className="login-form-button"
              onClick={() => {
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
