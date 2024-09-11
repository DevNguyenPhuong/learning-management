import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserForm() {
  const [form] = Form.useForm();
  const oldUserData = useSelector((store) => store.user);
  const {
    full_name,
    gender,
    age,
    email,
    major,
    experience,
    objective,
    description,
  } = oldUserData;

  const { updateUser, isPending } = useUpdateUser();

  useEffect(() => {
    form.setFieldsValue({
      full_name,
      gender,
      age,
      email,
      major,
      experience,
      objective,
      description,
    });
  }, [
    form,
    full_name,
    gender,
    age,
    email,
    major,
    experience,
    objective,
    description,
  ]);

  const onFinish = (values) => {
    updateUser({
      ...oldUserData,
      ...values,
    });
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <Form
      title="sdssdsds"
      name="update-user-form"
      form={form}
      requiredMark={false}
      size="large"
      layout="vertical"
      onFinish={onFinish}
      className=" p-8 rounded-lg shadow-lg"
      initialValues={{
        username: "sds",
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item label="Fullname" name="full_name">
            <Input disabled={isPending} placeholder="Fullname" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item label="Gender" name="gender">
            <Select disabled={isPending} placeholder="Select gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                type: "number",
                min: 1,
                max: 120,
                message: "Age must be between 1 and 120",
              },
            ]}
          >
            <InputNumber
              disabled={isPending}
              placeholder="Age"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input disabled={isPending} placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item label="Major" name="major">
            <Input placeholder="Major" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Experience" name="experience">
            <Input disabled={isPending} placeholder="Experience" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item label="Career objective" name="objective">
            <TextArea
              disabled={isPending}
              showCount
              maxLength={200}
              placeholder="objective"
              style={{
                height: 120,
                resize: "none",
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item label="Descripe about you" name="description">
            <TextArea
              disabled={isPending}
              showCount
              maxLength={200}
              placeholder="Description"
              style={{
                height: 120,
                resize: "none",
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <div className="flex justify-end space-x-4 flex-wrap gap-4">
            <Button
              disabled={isPending}
              onClick={handleCancel}
              className="login-form-button"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isPending}
            >
              Save change
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default UpdateUserForm;
