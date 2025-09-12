import textToSpeech from "@google-cloud/text-to-speech";

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

function cleanText(text) {
  // Remove emojis and most non-ASCII symbols
  let cleaned=text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
             .replace(/[^\x00-\x7F]/g, "");
   cleaned = cleaned.replace(/[!\"'’“”\-:;(){}\[\]]/g, "");
  return cleaned;
}

export async function synthesizeSpeech(text) {
  let cleaned = cleanText(text);
  cleaned = cleaned.replace(/([.?,])/g, '$1<break time="800ms"/>');

  // Detect Hindi (Devanagari Unicode range)
  const isHindi = /[\u0900-\u097F]/.test(cleaned);

  const voice = isHindi
    ? { languageCode: "hi-IN", name: "hi-IN-Wavenet-A", ssmlGender: "FEMALE" }
    : { languageCode: "en-IN", name: "en-IN-Wavenet-B", ssmlGender: "FEMALE" };

  const request = {
    input: { ssml: `<speak><prosody rate="medium" pitch="+2st">${cleaned}</prosody></speak>` },
    voice,
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent;
}