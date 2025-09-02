export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const endpoint = 'https://api.layercode.com/v1/agents/web/authorize_session';
  const apiKey = process.env.LAYERCODE_API_KEY;
  if (!apiKey) throw new Error('LAYERCODE_API_KEY is not set.');

  const requestBody = await request.json();
  if (!requestBody?.agent_id) throw new Error('Missing agent_id in request body.');

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
    return NextResponse.json({ error: text || response.statusText }, { status: response.status });
  }
  return NextResponse.json(await response.json());
};