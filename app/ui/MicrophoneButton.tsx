'use client';

import { useState } from 'react';
import { MicrophoneIcon } from './MicrophoneIcon';

export function MicrophoneButton() {
  const [isVisuallyPressed, setIsVisuallyPressed] = useState(false);

  const handlePressStart = () => setIsVisuallyPressed(true);
  const handlePressEnd = () => setIsVisuallyPressed(false);

  return (
    <div className="relative">
      <button
        className={`h-12 px-4 rounded-full flex items-center gap-2 justify-center cursor-pointer outline-none focus:outline-none transition-colors duration-200 select-none ${
          isVisuallyPressed ? 'bg-[#FF5B41]' : 'bg-gray-800 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-800'
        }`}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        <div className="text-sm font-medium text-white whitespace-nowrap">Hold while speaking</div>
        <MicrophoneIcon />
      </button>
    </div>
  );
}
