// NumberDictation.js
import { useState, useRef } from "react";

export default function NumberDictation() {
  const [numbers, setNumbers] = useState([]);
  const recognitionRef = useRef(null);

  const startDictation = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      
      const extractedNumbers = transcript.match(/\d+/g) || [];
      setNumbers(extractedNumbers);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopDictation = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="p-4 text-center bg-white shadow-lg rounded-lg w-96">
      <h1 className="text-xl font-bold">Number Dictation Tool</h1>
      <button onClick={startDictation} className="m-2 p-2 bg-blue-500 text-white rounded">Start</button>
      <button onClick={stopDictation} className="m-2 p-2 bg-red-500 text-white rounded">Stop</button>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Recognized Numbers:</h2>
        <p className="text-lg bg-gray-100 p-2 rounded">{numbers.join(", ") || "No numbers yet..."}</p>
      </div>
    </div>
  );
}
