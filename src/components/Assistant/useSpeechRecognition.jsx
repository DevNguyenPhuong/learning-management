import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { turnOnDarkMode, turnOnLightMode } from "../User/userSlice";
import { useNavigate } from "react-router-dom";

let recognition;
let synth;
let vietnameseVoice;

if ("webkitSpeechRecognition" in window) {
  // eslint-disable-next-line
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "vi-VN";
}

if ("speechSynthesis" in window) {
  synth = window.speechSynthesis;
}

function useSpeechRecognition() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!recognition) return;

    // Find Vietnamese voice
    function setVietnameseVoice() {
      const voices = synth.getVoices();
      vietnameseVoice = voices.find((voice) => voice.lang === "vi-VN");
    }

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = setVietnameseVoice;
    }

    setVietnameseVoice();

    recognition.onresult = (event) => {
      const text = event?.results[0][0]?.transcript;
      setText(event.results[0][0].transcript);
      console.log(text);

      switch (text) {
        case "Bật chế độ tối.":
          speak("Chế độ tối đã bật");
          dispatch(turnOnDarkMode());
          break;

        case "Bật chế độ sáng.":
          speak("Chế độ sáng đã bật");
          dispatch(turnOnLightMode());
          break;

        case "Trợ giúp.":
          speak(
            "Tôi là trợ lý của trang web, nói bật chế độ sáng, tối để thay đổi giao diện. Đến trang chủ, trang ghi chú, trang người dùng, trang lịch học để di chuyển đến các trang tương ứng."
          );
          break;

        case "Đến trang chủ.":
          navigate("/dashboard");
          break;

        case "Đến trang lịch học.":
          navigate("/schedules");
          break;

        case "Đến trang ghi chú.":
          navigate("/notes");
          break;

        case "Đến trang người dùng.":
          navigate("/user");
          break;

        default:
          speak(
            "Không nhận diện được câu lệnh, nói trợ giúp để biết thêm thông tin."
          );
          break;
      }

      recognition.stop();
      setIsListening(false);
    };
  }, [dispatch, navigate]);

  const speak = (text) => {
    if (synth.speaking) {
      console.error("speechSynthesis.speaking");
      return;
    }

    const utterThis = new SpeechSynthesisUtterance(text);

    if (vietnameseVoice) {
      utterThis.voice = vietnameseVoice;
    } else {
      console.warn("Vietnamese voice not found. Using default voice.");
    }

    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  };

  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
}

export default useSpeechRecognition;
