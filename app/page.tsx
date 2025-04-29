"use client";
import { useLayercodePipeline } from "@layercode/react-sdk";
import { AudioVisualization } from "./ui/AudioVisualization";
import { ConnectionStatusIndicator } from "./ui/ConnectionStatusIndicator";
import { MicrophoneButton } from "./ui/MicrophoneButton";

export default function Home() {
  const { agentAudioAmplitude, status, triggerUserTurnStarted, triggerUserTurnFinished } = useLayercodePipeline({
    pipelineId: process.env.NEXT_PUBLIC_LAYERCODE_PIPELINE_ID!,
    authorizeSessionEndpoint: "/api/agent/authorize", // The useLayercodePipeline hook calls this api route on start, which creates a new session in Layercode and retrieves the client session key which is require for the frontend client to connect to your Layercode voice pipelines.
    onDataMessage: (data) => {
      console.log("Received data msg", data);
    }, // If you return json data objects from your webhook, they are forwarded to the client and send to this callback.
  });

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <div className="w-96 h-96 border border-white rounded-lg flex flex-col gap-20 items-center justify-center">
        <h1 className="text-gray-800 text-xl font-bold">Voice Agent Demo</h1>
        <AudioVisualization amplitude={agentAudioAmplitude} height={75} />
        <div className="flex flex-col gap-4 items-center justify-center">
          <MicrophoneButton triggerUserTurnStarted={triggerUserTurnStarted} triggerUserTurnFinished={triggerUserTurnFinished} />
          <ConnectionStatusIndicator status={status} />
        </div>
      </div>
    </div>
  );
}
