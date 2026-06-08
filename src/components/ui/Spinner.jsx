export default function Spinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4"
  };

  return (
    <div className={`flex justify-center items-center py-8 ${className}`} role="status">
      <div
        className={`animate-spin rounded-full border-gray-200 border-t-blue-600 ${sizeClasses[size] || sizeClasses.md}`}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
