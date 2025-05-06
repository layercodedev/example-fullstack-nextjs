export const maxDuration = 300; // We set a generous Vercel max function duration to allow for long running agents
export const dynamic = 'force-dynamic';

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, CoreMessage } from 'ai';
import { streamResponse, verifySignature } from '@layercode/node-server-sdk';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// In-memory session messages (for demo only; use Redis or DB in production)
const sessionMessages = {} as Record<string, CoreMessage[]>;

const SYSTEM_PROMPT =
  "You are a helpful conversation assistant. You should respond to the user's message in a conversational manner. Your output will be spoken by a TTS model. You should respond in a way that is easy for the TTS model to speak and sound natural.";
const WELCOME_MESSAGE = 'Welcome to Layercode. How can I help you today?';

// POST request handler for Layercode incoming webhook, per turn of the conversation
export const POST = async (request: Request) => {
  const requestBody = await request.json();
  const signature = request.headers.get('layercode-signature') || '';
  const secret = process.env.LAYERCODE_WEBHOOK_SECRET || '';
  const payload = JSON.stringify(requestBody);
  const isValid = verifySignature({ payload, signature, secret });

  if (!isValid) {
    console.error('Invalid signature', signature, secret, payload);
    return new Response('Unauthorized', { status: 401 });
  }

  console.log('Request body received from Layercode', requestBody);
  const {
    session_id, // Session ID is unique per conversation. Use this to know which conversation a webhook belongs to.
    text, // The user's transcribed message query
    type, // The type of webhook event: message or session.start
  } = requestBody;

  // Get or create the message list for this session
  let messages = sessionMessages[session_id] || [];
  // Add user message
  messages.push({ role: 'user', content: [{ type: 'text', text }] });

  if (type === 'session.start') {
    return streamResponse(requestBody, async ({ stream }) => {
      stream.tts(WELCOME_MESSAGE);
      messages.push({
        role: 'assistant',
        content: [{ type: 'text', text: WELCOME_MESSAGE }],
      });
      stream.end();
    });
  }

  return streamResponse(requestBody, async ({ stream }) => {
    const { textStream } = streamText({
      model: google('gemini-2.0-flash-001'),
      system: SYSTEM_PROMPT,
      messages,
      onFinish: async ({ response }) => {
        // After the response has been generated and streamed, finally save it to the message list for this session
        messages.push(...response.messages);
        console.log('Current message history for session', session_id, JSON.stringify(messages, null, 2));
        sessionMessages[session_id] = messages;
        stream.end(); // We must call stream.end() here to tell Layercode that the assistant's response has finished
      },
    });
    // At any time, you can also return json objects, which will be forwarded directly to the client. Use this to create dynamic UI that is synchnised with the voice response.
    stream.data({ uiState: { aiIsThinking: true } });
    // Here we return the textStream chunks as SSE messages to Layercode, to be spoken to the user
    await stream.ttsTextStream(textStream);
  });
};
