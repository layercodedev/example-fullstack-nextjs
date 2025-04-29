import { useState, useRef, useEffect } from "react";
import { useButtonHold } from "../hooks/useButtonHold";

export function MicrophoneButton({ triggerUserTurnStarted, triggerUserTurnFinished }: { triggerUserTurnStarted: () => void; triggerUserTurnFinished: () => void }) {
  // When using push-to-talk turn taking in your Layercode voice pipeline, you'll need to call triggerUserTurnStarted and triggerUserTurnFinished when the uses holds down the microphone button or spacebar.
  // The useButtonHold hook handles this state, and also include debouncing so that short accidential clicks are ignored.
  const { isVisuallyPressed, handlePressStart, handlePressEnd } = useButtonHold({
    onPressStart: triggerUserTurnStarted,
    onPressEnd: triggerUserTurnFinished,
    key: "Space",
  });

  return (
    <div className="relative">
      <button
        className={`h-12 px-4 rounded-full flex items-center gap-2 justify-center cursor-pointer outline-none focus:outline-none transition-colors duration-200 select-none ${
          isVisuallyPressed ? "bg-[#FF5B41]" : "bg-gray-800 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-800"
        }`}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        <div className="text-sm font-medium text-white whitespace-nowrap">Hold while speaking</div>
        <svg
          style={{ color: "#FFFFFF" }}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </button>
    </div>
  );
}
