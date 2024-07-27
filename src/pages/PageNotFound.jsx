import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigate(-1)} type="primary">
          Go back
        </Button>
      }
    />
  );
}

export default PageNotFound;
