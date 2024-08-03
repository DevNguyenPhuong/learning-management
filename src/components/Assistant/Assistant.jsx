import { AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
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
      <FloatButton
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={isListening ? <AudioOutlined /> : <AudioMutedOutlined />}
        onClick={handleListening}
      />
    </>
  );
}

export default Assistant;
