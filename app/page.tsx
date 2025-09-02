'use client';
import dynamic from 'next/dynamic';

const VoiceAgent = dynamic(() => import('./ui/VoiceAgent'), { ssr: false });

export default function Home() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <VoiceAgent />
    </div>
  );
}