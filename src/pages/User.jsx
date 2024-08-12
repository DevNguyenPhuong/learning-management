import { Button, Form, Input } from "antd";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { turnOnDarkMode, turnOnLightMode } from "../components/User/userSlice";

function User() {
  const [form] = Form.useForm();
  const { mode } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleCancel = () => {
    form.resetFields();
  };

  function handleToggleDarkMode() {
    if (mode === "dark") dispatch(turnOnLightMode());
    if (mode === "light") dispatch(turnOnDarkMode());
  }

  return (
    <>
      <button
        className="mt-4 ml-4 lg:mt-0 lg:ml-0"
        onClick={handleToggleDarkMode}
      >
        <div>
          {mode === "dark" && <FaSun className="lg:w-8 lg:h-8 w-6 h-6" />}
          {mode === "light" && <FaMoon className="lg:w-8 lg:h-8 w-6 h-6" />}
        </div>
      </button>

      <div className=" flex flex-col items-center justify-center h-screen">
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
                    return Promise.reject(
                      new Error("Password does not match!")
                    );
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
                Save change
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default User;
