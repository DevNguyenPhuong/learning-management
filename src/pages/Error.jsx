import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <Result
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
