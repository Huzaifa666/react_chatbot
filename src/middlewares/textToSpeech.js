import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const test={
    display:'none'
};

function TextToSpeech(props) {
    const {value, sender} = props;
    const { speak } = useSpeechSynthesis();
    

    let voices;
    if ('speechSynthesis' in window) {
        voices = window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = function() {
            voices = window.speechSynthesis.getVoices();
        };
    }

    useEffect(()=>{
        if(sender === "tIA"){
            document.querySelector('button').click();
            speak({ text: value, voice: voices[4]});
        }
    },[value]);

    return (
        <div>
            <button style={test}></button>
        </div>
    );
}

export default TextToSpeech;