export function AudioVisualization({ amplitude, height = 46 }: { amplitude: number; height?: number }) {
  const maxHeight = height;
  const minHeight = Math.floor(height / 6);
  const barWidth = Math.floor(minHeight);
  const multipliers = [0.2, 0.5, 1.0, 0.5, 0.2];
  const normalizedAmplitude = Math.min(Math.max(amplitude * 7, 0), 1);

  return (
    <div className="w-auto flex items-center gap-[2px]" style={{ height: `${height}px` }}>
      {multipliers.map((multiplier, index) => {
        const barHeight = minHeight + normalizedAmplitude * maxHeight * multiplier;
        return (
          <div
            key={index}
            className="flex flex-col items-center"
            style={{ height: `${barHeight}px`, width: `${barWidth}px` }}
          >
            <div
              className="bg-[#FF5B41] dark:bg-[#FF7B61] transition-all"
              style={{ width: '100%', height: `${barWidth}px`, borderTopLeftRadius: '9999px', borderTopRightRadius: '9999px' }}
            />
            <div
              className="bg-[#FF5B41] dark:bg-[#FF7B61] transition-all"
              style={{ width: '100%', height: `calc(100% - ${2 * barWidth}px)` }}
            />
            <div
              className="bg-[#FF5B41] dark:bg-[#FF7B61] transition-all"
              style={{ width: '100%', height: `${barWidth}px`, borderBottomLeftRadius: '9999px', borderBottomRightRadius: '9999px' }}
            />
          </div>
        );
      })}
    </div>
  );
}