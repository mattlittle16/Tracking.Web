interface TrackingInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TrackingInput({ value, onChange, error }: TrackingInputProps) {
  return (
    <div className="mb-6">
      <label 
        htmlFor="tracking-number" 
        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
      >
        Tracking Number
      </label>
      <input
        id="tracking-number"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 1Z999AA10123456784"
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 text-base ${
          error
            ? 'border-red-400 focus:ring-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-600 dark:text-red-200'
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-700 dark:text-gray-100'
        }`}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
