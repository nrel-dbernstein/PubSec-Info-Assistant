import { SpeechSynthesizer, SpeechSynthesisOutputFormat, SpeechConfig, ResultReason, SpeakerAudioDestination, AudioConfig } from "microsoft-cognitiveservices-speech-sdk";
import { fetchSpeechConfig } from "../../api";

class TextToSpeech {
    private synthesizer: SpeechSynthesizer | null = null;
    private token: string = "";
    private region: string = "";
    private languages: string[] = [];
    private audioConfig: AudioConfig | null = null;
    private player: SpeakerAudioDestination | null = null;

    public async initialize() : Promise<void> {
        const { token, region, languages } = await fetchSpeechConfig();
        this.token = token;
        this.region = region;
        this.languages = languages;
    }
    
    public startTextToSpeech(text: string): void {

        // Stop audio stream if it is already playing
        this.player?.pause();
        this.player?.close();

        const speechConfig = SpeechConfig.fromAuthorizationToken(
        this.token,
        this.region
        );

        this.player = new SpeakerAudioDestination();
        this.audioConfig  = AudioConfig.fromSpeakerOutput(this.player);
        speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

        // Create a new synthesizer
        this.synthesizer = new SpeechSynthesizer(speechConfig, this.audioConfig);

        // Synthesize the speech
        this.synthesizer.speakTextAsync(
        text,
        result => {
            if (result.reason === ResultReason.SynthesizingAudioCompleted) {
            console.log("Synthesis finished.");
            } else {
            console.error("Speech synthesis canceled, " + result.errorDetails);
            }
            // Close the synthesizer after completion
            this.synthesizer?.close();
            this.synthesizer = null;
        },
        error => {
            console.error(error);
            // Close the synthesizer on error
            this.synthesizer?.close();
            this.synthesizer = null;
        }
        );
    }
  }
  
  export default TextToSpeech;