import { Button, DatePicker, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
function Login() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="bg-red-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-lg">
        <Form
          form={form}
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 5 }}
          requiredMark={false}
          size="large"
          layout="horizontal"
          onFinish={onFinish}
          className="bg-white p-8 rounded-lg shadow-lg"
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
export default Login;
