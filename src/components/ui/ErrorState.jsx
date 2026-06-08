import { AlertCircle } from "lucide-react";

export default function ErrorState({
  title = "An error occurred",
  message = "Something went wrong. Please try again later.",
  onRetry,
  className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-red-100 rounded-2xl bg-red-50/50 max-w-md mx-auto my-8 ${className}`}>
      <div className="p-3 bg-red-100 rounded-full text-red-600 mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
