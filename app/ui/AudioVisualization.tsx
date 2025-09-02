export function AudioVisualization({ amplitude }: { amplitude: number }) {
  // Calculate the height of each bar based on amplitude
  const maxHeight = 36; // Maximum height in pixels (reduced to avoid overflow)
  const minHeight = 6; // Minimum height in pixels

  // Create multipliers for each bar to make middle bars taller
  const multipliers = [0.2, 0.5, 1.0, 0.5, 0.2];

  // Boost amplitude by 5 and ensure it's between 0 and 1 (less aggressive)
  const normalizedAmplitude = Math.min(Math.max(amplitude * 5, 0), 1);

  return (
    <div className="flex items-center gap-[2px] h-8 pl-2 overflow-hidden">
      {multipliers.map((multiplier, index) => {
        // Calculate height based on amplitude, multiplier and min/max constraints
        const height = minHeight + normalizedAmplitude * maxHeight * multiplier;

        return (
          <div
            key={index}
            className="bg-[#FF5B41] dark:bg-[#FF7B61] w-1.5 rounded-sm transition-all duration-75"
            style={{ height: `${height}px` }}
          />
        );
      })}
    </div>
  );
}
