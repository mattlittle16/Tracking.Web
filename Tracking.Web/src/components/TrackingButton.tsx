interface TrackingButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function TrackingButton({ onClick, disabled, loading }: TrackingButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? 'Submitting...' : 'Track Package'}
    </button>
  );
}
