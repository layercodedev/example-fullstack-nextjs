export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

// Endpoint called from client to get a client session key which lets the browser connect to the Layercode agent
export const POST = async (request: Request) => {
  // Here you could do any user authorization checks you need for your app
  const endpoint = 'https://api.layercode.com/v1/agents/web/authorize_session';
  const apiKey = process.env.LAYERCODE_API_KEY;
  if (!apiKey) {
    throw new Error('LAYERCODE_API_KEY is not set.');
  }
  const requestBody = await request.json();
  if (!requestBody || !requestBody.agent_id) {
    throw new Error('Missing agent_id in request body.');
  }
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || response.statusText);
    }
    return NextResponse.json(await response.json());
  } catch (error: any) {
    console.log('Layercode authorize session response error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
