import {
    SpeechConfig,
    AudioConfig,
    SpeechRecognizer,
    AutoDetectSourceLanguageConfig,
  } from "microsoft-cognitiveservices-speech-sdk";
import { fetchSpeechConfig } from "../../api";


export const multiLingualSpeechRecognizer = async (textToSpeech: any) => {

    const speechConfig = SpeechConfig.fromAuthorizationToken(
      textToSpeech.token,
      textToSpeech.region
    );

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

    try {
      const autoDetectSourceLanguageConfig = AutoDetectSourceLanguageConfig.fromLanguages(textToSpeech.languages);
      return SpeechRecognizer.FromConfig(speechConfig, autoDetectSourceLanguageConfig, audioConfig);
    } catch (error) {
      console.error("Using default language settings as error detected while reading language config:", error);
      return new SpeechRecognizer(speechConfig, audioConfig);
    }
};