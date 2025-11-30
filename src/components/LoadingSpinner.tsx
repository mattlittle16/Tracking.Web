export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] py-12 animate-fade-in">
      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="absolute inset-0 w-20 h-20 border-4 border-blue-100 dark:border-blue-900 rounded-full"></div>
        {/* Spinning ring */}
        <div className="w-20 h-20 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 border-r-blue-500 dark:border-r-blue-500 rounded-full animate-spin"></div>
        {/* Inner pulse */}
        <div className="absolute inset-0 m-auto w-12 h-12 bg-blue-400 dark:bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
      </div>
      
      <div className="text-center space-y-3 max-w-md">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Fetching Tracking Information
        </h3>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Please wait while we retrieve your package details...
        </p>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-2 pt-4">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
