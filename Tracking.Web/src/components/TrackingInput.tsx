interface TrackingInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TrackingInput({ value, onChange, error }: TrackingInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor="tracking-number" className="block text-sm font-medium mb-2">
        Tracking Number
      </label>
      <input
        id="tracking-number"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter tracking number"
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
