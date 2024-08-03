import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { theme } from "antd";

function Error() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Result
      style={{
        height: "100vh",
        background: colorBgContainer,
      }}
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button onClick={() => navigate(-1)} type="primary">
          Go back
        </Button>
      }
    />
  );
}

export default Error;
