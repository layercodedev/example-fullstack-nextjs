// Simple wavform visualization to show when the voice AI is speaking
import React from 'react';

export function AudioVisualization({
  amplitude,
  height = 46, // default for backward compatibility
}: {
  amplitude: number;
  height?: number;
}) {
  // Calculate the height of each bar based on amplitude
  const maxHeight = height;
  const minHeight = Math.floor(height / 6);
  const barWidth = Math.floor(minHeight);

  // Create multipliers for each bar to make middle bars taller
  const multipliers = [0.2, 0.5, 1.0, 0.5, 0.2];

  // Boost amplitude by 7 and ensure it's between 0 and 1
  const normalizedAmplitude = Math.min(Math.max(amplitude * 7, 0), 1);

  return (
    <div className="w-auto flex items-center gap-[2px]" style={{ height: `${height}px` }}>
      {multipliers.map((multiplier, index) => {
        const barHeight = minHeight + normalizedAmplitude * maxHeight * multiplier;

        return (
          <div
            key={index}
            className="flex flex-col items-center"
            style={{
              height: `${barHeight}px`,
              width: `${barWidth}px`,
            }}
          >
            {/* Top rounded cap */}
            <div
              className="bg-[#FF5B41] dark:bg-[#FF7B61] transition-all duration-20"
              style={{
                width: '100%',
                height: `${barWidth}px`,
                borderTopLeftRadius: '9999px',
                borderTopRightRadius: '9999px',
              }}
            />
            {/* Middle straight section */}
            <div
              className="bg-[#FF5B41] dark:bg-[#FF7B61] transition-all duration-20"
              style={{
                width: '100%',
                height: `calc(100% - ${2 * barWidth}px)`,
                borderRadius: 0,
              }}
            />
            {/* Bottom rounded cap */}
            <div
              className="bg-[#FF5B41] dark:bg-[#FF7B61] transition-all duration-20"
              style={{
                width: '100%',
                height: `${barWidth}px`,
                borderBottomLeftRadius: '9999px',
                borderBottomRightRadius: '9999px',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
