# Layercode Voice Agent Example (Next.js + Hono)

A full-stack TypeScript application built with **Next.js** and **Hono** that creates a real-time voice agent using Layercode. The frontend handles browser-based voice interaction, while the backend streams text-to-speech-ready replies from Google Gemini over Server-Sent Events (SSE).

---

## ✨ Features

- **Browser-based Voice Interaction:** Users can speak to the agent directly from their browser.
- **Real-time Transcription & Response:** Speech is transcribed and processed in real time.
- **LLM Integration:** Uses [Vercel AI SDK](https://vercel.com/docs/ai-sdk) with [Gemini Flash 2.0](https://ai.google.dev/gemini-api/docs/models/gemini).
- **Streaming Responses:** LLM responses are streamed back, converted to speech, and played to the user.
- **Secure Webhook Handling:** Built-in webhook signature verification to ensure requests are coming from Layercode.
- **Modern Stack:** Next.js, Hono, HTMX, Tailwind, DaisyUI, Cloudflare Workers.

---

## 🚀 Quick Start

> Requires **Node.js 18+**, a valid **Gemini API key**, a **Layercode API key**, and a **Layercode webhook secret**.

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## 🔧 Configuration

Add a `.env` file (or use `.env.example` as a template):

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
LAYERCODE_API_KEY=your_layercode_api_key_here
NEXT_PUBLIC_LAYERCODE_PIPELINE_ID=your_pipeline_id_here
LAYERCODE_WEBHOOK_SECRET=your_webhook_secret_here
```

---

## 🗺️ API

### POST `/api/webhook`

Receives transcribed text from Layercode and streams responses back.

#### Request JSON

```jsonc
{
  "text": "Hello, how are you?",
  "type": "message", // "message" or "session.start"
  "session_id": "sess-1234",
  "turn_id": "turn-0001"
}
```

#### Streaming Response (SSE)

All streaming and SSE response handling is managed by [`@layercode/node-server-sdk`](https://www.npmjs.com/package/@layercode/node-server-sdk), which provides a simple interface for sending TTS and data chunks to the client.

```
data: {"type":"response.tts","content":"Hi there!","turn_id":"turn-0001"}

data: {"type":"response.end","turn_id":"turn-0001"}
```

| Type           | Description                         |
| -------------- | ----------------------------------- |
| `response.tts` | A partial or complete chunk of text |
| `response.end` | Indicates the turn has finished     |

---

## 🧩 Project Structure

| Path              | Purpose                              |
| ----------------- | ------------------------------------ |
| `app/`            | Next.js app directory                |
| `app/api/`        | API routes (webhook, authorize)      |
| `app/components/` | React components                     |
| `app/page.tsx`    | Main page component                  |
| `.env`            | **Not committed** – environment vars |
| `README.md`       | You are here                         |

---

## 🛠️ Dependencies

- `next` – React framework
- `hono` – web framework for API routes
- `@ai-sdk/google` – Gemini SDK
- `ai` – streaming and message handling
- `@layercode/react-sdk` – browser voice interaction
- `@layercode/node-server-sdk` – SSE streaming and response handling
- `tailwindcss` / `daisyui` – styling

All pinned in `package.json`.

---

## 🩹 Troubleshooting

| Symptom                                   | Fix                             |
| ----------------------------------------- | ------------------------------- |
| `GOOGLE_GENERATIVE_AI_API_KEY is not set` | Add to `.env`                   |
| `LAYERCODE_API_KEY is not set`            | Add to `.env`                   |
| `LAYERCODE_WEBHOOK_SECRET is not set`     | Add to `.env`                   |
| No voice response                         | Check webhook logs in dashboard |
| Tunnel URL changed                        | Update webhook URL in dashboard |

---

## 🔐 Security Notes

- Do **not** commit your `.env` / secrets.
- Use HTTPS & proper auth in production.
- Always verify webhook signatures.
- Keep API keys and webhook secrets secure.
- Implement proper error handling.

---

## 📝 License

MIT
