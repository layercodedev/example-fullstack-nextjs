export const dynamic = 'force-dynamic';

import { createOpenAI } from '@ai-sdk/openai';
import { streamText, ModelMessage } from 'ai';
import { streamResponse, verifySignature } from '@layercode/node-server-sdk';
import config from '@/layercode-config.json';

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const sessionMessages = {} as Record<string, ModelMessage[]>;

const SYSTEM_PROMPT = config.prompt;
const WELCOME_MESSAGE = config.welcome_message;

export const POST = async (request: Request) => {
  // Verify the request is from Layercode
  const requestBody = await request.json();
  const signature = request.headers.get('layercode-signature') || '';
  const secret = process.env.LAYERCODE_WEBHOOK_SECRET || '';
  const isValid = verifySignature({ payload: JSON.stringify(requestBody), signature, secret });
  if (!isValid) return new Response('Unauthorized', { status: 401 });

  const {
    session_id,
    text,
    type,
  } = requestBody;

  if (!['message', 'session.start', 'session.end', 'session.update'].includes(type)){
    console.log('type not included!!!', type)
  }

  const messages = sessionMessages[session_id] || [];

  if (type === 'session.start') {
    return streamResponse(requestBody, async ({ stream }) => {
      stream.tts(WELCOME_MESSAGE);
      messages.push({ role: 'assistant', content: WELCOME_MESSAGE });
      sessionMessages[session_id] = messages;
      stream.end();
    });
  }

  if (type === 'session.update' || type === 'session.end') {
    return new Response('OK', { status: 200 });
  }

  messages.push({ role: 'user', content: text });

  return streamResponse(requestBody, async ({ stream }) => {
    const { textStream } = streamText({
      model: openai('gpt-4o-mini'),
      system: SYSTEM_PROMPT,
      messages,
      onFinish: async ({ text }) => {
        messages.push({ role: 'assistant', content: text });
        sessionMessages[session_id] = messages;
        stream.end();
      },
    });

    stream.data({ aiIsThinking: true });
    await stream.ttsTextStream(textStream);
  });
};