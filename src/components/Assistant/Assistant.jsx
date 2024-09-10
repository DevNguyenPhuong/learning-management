import { AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";
import { FloatButton, Tooltip } from "antd";
import useSpeechRecognition from "./useSpeechRecognition";

function Assistant() {
  const { isListening, startListening, stopListening, hasRecognitionSupport } =
    useSpeechRecognition();

  if (!hasRecognitionSupport) {
    console.log("no support");
  }

  function handleListening() {
    if (isListening) stopListening();
    else startListening();
  }

  return (
    <>
      <Tooltip title="Saying help for more information">
        <FloatButton
          type="primary"
          style={{ insetInlineEnd: 24 }}
          icon={isListening ? <AudioOutlined /> : <AudioMutedOutlined />}
          onClick={handleListening}
        />
      </Tooltip>
    </>
  );
}

export default Assistant;
