export default function ProgressBar({ value = 0, showLabel = true, size = "md", color = "indigo" }) {
  const clamped = Math.min(100, Math.max(0, value));
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
  const colors = {
    indigo: "bg-indigo-600",
    green: "bg-green-500",
    amber: "bg-amber-400",
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[size] || heights.md}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors[color] || colors.indigo}`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1 text-right font-medium">{clamped}%</p>
      )}
    </div>
  );
}
