import { useButtonHold } from '../hooks/useButtonHold';
import { MicrophoneIcon } from '../icons/MicrophoneIcon';
export function MicrophoneButtonPushToTalk({ triggerUserTurnStarted, triggerUserTurnFinished }: { triggerUserTurnStarted: () => void; triggerUserTurnFinished: () => void }) {
  // When using push-to-talk turn taking in your Layercode voice pipeline, you'll need to call triggerUserTurnStarted and triggerUserTurnFinished when the uses holds down the microphone button or spacebar.
  // The useButtonHold hook handles this state, and also include debouncing so that short accidential clicks are ignored.
  const { isVisuallyPressed, handlePressStart, handlePressEnd } = useButtonHold({
    onPressStart: triggerUserTurnStarted,
    onPressEnd: triggerUserTurnFinished,
    key: 'Space',
  });

  return (
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
  );
}
