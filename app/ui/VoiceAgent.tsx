import { useLayercodePipeline } from '@layercode/react-sdk';
import { AudioVisualization } from './AudioVisualization';
import { ConnectionStatusIndicator } from './ConnectionStatusIndicator';
import { MicrophoneIcon } from '../icons/MicrophoneIcon';

export default function VoiceAgent() {
  const { agentAudioAmplitude, status } = useLayercodePipeline({
    pipelineId: process.env.NEXT_PUBLIC_LAYERCODE_PIPELINE_ID!,
    authorizeSessionEndpoint: '/api/authorize', // The useLayercodePipeline hook calls this api route on start, which creates a new session in Layercode and retrieves the client session key which is require for the frontend client to connect to your Layercode voice pipelines.
    onDataMessage: (data) => {
      console.log('Received data msg', data);
    }, // If you return json data objects from your webhook, they are forwarded to the client and send to this callback.
  });

  return (
    <div className="w-96 h-96 border border-white rounded-lg flex flex-col gap-20 items-center justify-center">
      <h1 className="text-gray-800 text-xl font-bold">Voice Agent Demo</h1>
      <AudioVisualization amplitude={agentAudioAmplitude} height={75} />
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="h-12 px-4 rounded-full flex items-center gap-2 justify-center select-none bg-[#FF5B41]">
          <MicrophoneIcon />
        </div>
        <ConnectionStatusIndicator status={status} />
      </div>
    </div>
  );
}
