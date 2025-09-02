'use client';

import { useLayercodeAgent } from '@layercode/react-sdk';
import { AudioVisualization } from './AudioVisualization';
import { ConnectionStatusIndicator } from './ConnectionStatusIndicator';
import { MicrophoneButton } from './MicrophoneButton';

export default function VoiceAgent() {
  const { userAudioAmplitude, agentAudioAmplitude, status } = useLayercodeAgent({
    agentId: process.env.NEXT_PUBLIC_LAYERCODE_AGENT_ID!,
    authorizeSessionEndpoint: '/api/authorize',
    onDataMessage: (data) => {
      console.log('Received data msg', data);
    },
  });

  return (
    <div className="fixed bottom-4 w-full px-8 grid grid-cols-3 items-center z-50">
      <ConnectionStatusIndicator status={status} />
      <div className="justify-self-center flex gap-4 items-center rounded-full border border-gray-100 dark:border-gray-900 py-2 pr-2 pl-3 bg-white dark:bg-gray-950 shadow-md dark:shadow-gray-900/30">
        <AudioVisualization amplitude={Math.max(userAudioAmplitude, agentAudioAmplitude)} />
        <MicrophoneButton />
      </div>
    </div>
  );
}
