# Layercode Voice Agent Example

This open source project demonstrates how to build a real-time voice agent using [Layercode](https://layercode.com) with a Next.js frontend and backend.

## Features

- **Browser-based Voice Interaction:** Users can speak to the agent directly from their browser.
- **Real-time Transcription & Response:** Speech is transcribed and processed in real time.
- **LLM Integration:** User queries are sent to an LLM using [Vercel AI SDK](https://vercel.com/docs/ai-sdk) and [Gemini Flash 2.0](https://ai.google.dev/gemini-api/docs/models/gemini).
- **Streaming Responses:** LLM responses are streamed back, converted to speech, and played to the user.

## How It Works

1. **Frontend:**  
   Uses [`@layercode/react-sdk`](https://www.npmjs.com/package/@layercode/react-sdk) to connect the browser's microphone and speaker to a Layercode voice pipeline.

2. **Transcription & Webhook:**  
   Layercode transcribes user speech. For each complete message, it sends a webhook containing the transcribed text to a Next.js API route.

3. **Backend Processing:**  
   The Next.js API route uses [`@layercode/node-server-sdk`](https://www.npmjs.com/package/@layercode/node-server-sdk) to handle the webhook. The transcribed text is sent to the LLM (Gemini Flash 2.0 via Vercel AI SDK).

4. **Streaming & Speech Synthesis:**  
   As soon as the LLM starts generating a response, the backend streams the output back as SSE messags to Layercode, which converts it to speech and delivers it to the frontend for playback in realtime.

## Getting Started

Note: Layercode needs to send a webhook to your backend to generate agent responses. So if you're running this locally, you'll need to setup a tunnel to your localhost. See step 5 onwards below.

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Edit your .env environment variables. You'll need to add:
   - `GOOGLE_GENERATIVE_AI_API_KEY` - Your Google AI API key
   - `LAYERCODE_API_KEY` - Your Layercode API key found in the Layercode dashboard settings page
   - `NEXT_PUBLIC_LAYERCODE_PIPELINE_ID` - The Layercode pipeline ID for your voice agent. Find this id in the (Layercode dashboard)[https://dash.layercode.com/]
4. Run the development server with `npm run dev`.
5. Setup a tunnel (we recommend cloudflared which is free for dev) to your localhost with `npx cloudflared tunnel --url http://localhost:3000`
6. Note down the tunnel URL printed in the terminal, e.g. `https://my-tunnel-name.trycloudflare.com`, then add on the webhook url `/api/webhook` to make the full URL `https://my-tunnel-name.trycloudflare.com/api/webhook`
7. Goto the (Layercode dashboard)[https://dash.layercode.com/], click on your pipeline, clicked the edit icon in the 'Your Backend' box, and enter the webhook URL: `https://my-tunnel-name.trycloudflare.com/api/webhook`.
8. NOTE: every time you restart the cloudflared tunnel, the assigned webhook URL domain name will change. So you'll need to update the webhook URL in the Layercode dashboard again.
9. Now open your browser and start speaking to your voice agent!

Tip: If you don't hear any response from your voice agent, check the Webhook Logs tab in the (Layercode dashboard)[https://dash.layercode.com/] to see the response from your backend.

## License

MIT
