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
    <div className="fixed bottom-4 w-full px-8 grid grid-cols-3 items-center z-50">
      <ConnectionStatusIndicator status={status} />
      <div className="justify-self-center flex gap-4 items-center rounded-full border border-gray-100 dark:border-gray-900 py-2 pr-2 pl-3 bg-white dark:bg-gray-950 shadow-md dark:shadow-gray-900/30">
        <AudioVisualization amplitude={agentAudioAmplitude} />
        <MicrophoneButton triggerUserTurnStarted={triggerUserTurnStarted} triggerUserTurnFinished={triggerUserTurnFinished} />
      </div>
    </div>
  );
}
