import { forwardRef } from "react";

const Textarea = forwardRef(function Textarea(
  { label, error, id, rows = 4, className = "", ...props },
  ref
) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400
          bg-white transition-colors outline-none resize-y
          focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${error ? "border-red-400 focus:ring-red-400" : "border-gray-300"}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});

export default Textarea;
