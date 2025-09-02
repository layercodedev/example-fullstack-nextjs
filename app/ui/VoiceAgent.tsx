'use client';

import { useLayercodeAgent } from '@layercode/react-sdk';
import { AudioVisualization } from './AudioVisualization';
import { ConnectionStatusIndicator } from './ConnectionStatusIndicator';
import { MicrophoneIcon } from './MicrophoneIcon';

export default function VoiceAgent() {
  const { agentAudioAmplitude, status } = useLayercodeAgent({
    agentId: process.env.NEXT_PUBLIC_LAYERCODE_AGENT_ID!,
    authorizeSessionEndpoint: '/api/authorize',
    onDataMessage: (data) => {
      console.log('Received data msg', data);
    },
  });

  return (
    <div className="w-96 h-96 border border-white rounded-lg flex flex-col gap-20 items-center justify-center">
      <h1 className="text-gray-800 text-xl font-bold">Voice Agent Demo</h1>
      <AudioVisualization amplitude={agentAudioAmplitude} height={75} />
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="h-12 px-4 rounded-full flex items-center gap-2 justify-center select-none bg-[#FF5B41] text-white">
          <MicrophoneIcon />
        </div>
        <ConnectionStatusIndicator status={status} />
      </div>
    </div>
  );
}