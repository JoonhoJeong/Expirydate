import React, { useState } from 'react';
import './VoiceInput.css';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

function VoiceInput() {
  const { transcript, resetTranscript } = useSpeechRecognition();

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
      <p>{transcript}</p>
    </div>
  );
}

export default VoiceInput;
