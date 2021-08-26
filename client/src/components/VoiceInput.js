import React, { useState } from 'react';
import './VoiceInput.css';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

function VoiceInput() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [convertedText, setConvertedText] = useState('');
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const handleVoiceButtonDown = () => {
    resetTranscript();
    SpeechRecognition.startListening();
  };

  const handleVoiceButtonUp = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <h1>My Voice Command App</h1>
      <button
        onMouseDown={handleVoiceButtonDown}
        onMouseUp={handleVoiceButtonUp}
      >
        Voice
      </button>
      {/* <button onClick={SpeechRecognition.startListening}>
        Listen!
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop!</button>
      <button onClick={resetTranscript}>Reset</button> */}
      <p>{transcript}</p>
    </div>
  );
}

export default VoiceInput;
