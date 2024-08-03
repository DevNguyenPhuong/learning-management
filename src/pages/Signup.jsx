import { Button, Form, Input, theme } from "antd";
import React from "react";
import { Link } from "react-router-dom";
function Signup() {
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleCancel = () => {
    form.resetFields();
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
          name="sign-up-form"
          form={form}
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 5 }}
          requiredMark={false}
          size="large"
          layout="horizontal"
          onFinish={onFinish}
          className="p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-center  text-lg uppercase font-bold">Sign up</h1>
          <p className="text-center pb-4 text-sm ">
            Already a member?{" "}
            <Link to="/login" className="text-blue-600">
              Log in
            </Link>
          </p>

          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input placeholder="fullname" />
          </Form.Item>

          <Form.Item
            label="Username"
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

          <Form.Item
            label="Confirm"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password does not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="confirm password" />
          </Form.Item>

          <div className="flex justify-end space-x-4 flex-wrap gap-4 ">
            <Button onClick={handleCancel} className="login-form-button">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Signup;
