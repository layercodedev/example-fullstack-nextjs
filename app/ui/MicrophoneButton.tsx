'use client';

import { MicrophoneIcon } from './MicrophoneIcon';

export function MicrophoneButton() {
  return (
    <div className="relative">
      <div className="flex items-center justify-center select-none text-gray-600 dark:text-gray-300">
        <MicrophoneIcon />
      </div>
    </div>
  );
}
