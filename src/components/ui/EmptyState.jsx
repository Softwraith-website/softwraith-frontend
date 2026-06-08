import { FolderOpen } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  message = "There's nothing here yet.",
  icon: Icon = FolderOpen,
  actionText,
  onAction,
  className = ""
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 max-w-md mx-auto my-8 ${className}`}>
      <div className="p-4 bg-gray-100 rounded-full text-gray-400 mb-4">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
