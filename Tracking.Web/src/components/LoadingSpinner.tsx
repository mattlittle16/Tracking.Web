export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-lg text-gray-700 font-medium">
        Fetching tracking information...
      </p>
      <p className="mt-2 text-sm text-gray-500">This may take a few moments</p>
    </div>
  );
}
