require('dotenv').config(); // Load environment variables from .env file
const fs = require('fs');
const path = require('path');
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();

const PERSONAACCENT = 'in'; // Indian accent
const PERSONBACCENT = 'com'; // American accent

// Function to generate TTS audio with a specific accent and male voice
async function generateTTS(text, accent = 'com', filename = 'output.mp3') {
  const request = {
    input: { text: text },
    voice: {
      languageCode: 'en-US', // Default American English
      name: accent === 'in' ? 'en-IN-Wavenet-C' : 'en-US-Wavenet-B', // Male voices for Indian and American accents
    },
    audioConfig: {
      audioEncoding: 'MP3',
    },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const outputPath = path.join(__dirname, filename);

    fs.writeFileSync(outputPath, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${outputPath}`);
  } catch (err) {
    console.error('Error during TTS generation:', err);
  }
}

// Read and process script
fs.readFile('public/script.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading script file:', err);
    return;
  }

  const lines = data.split('\n');
  const messages = lines.map((line) => {
    const [person, message] = line.split(':').map((part) => part.trim());
    return { person, message };
  }).filter((message) => message.message||message.person);
  messages.forEach((message, i) => {
    const accent = message.person === 'Person A' ? PERSONAACCENT : PERSONBACCENT;
    generateTTS(message.message, accent, `../out/output${i}.mp3`);
  });
});

