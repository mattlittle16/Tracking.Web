import { CarrierCode } from '../types/tracking.types';

interface CarrierSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CarrierSelect({ value, onChange, error }: CarrierSelectProps) {
  return (
    <div className="mb-6">
      <label 
        htmlFor="carrier" 
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Carrier
      </label>
      <div className="relative">
        <select
          id="carrier"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 pr-10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 text-base appearance-none cursor-pointer ${
            error
              ? 'border-red-400 focus:ring-red-500 bg-red-50'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400 bg-white'
          }`}
        >
          <option value="" disabled>Select a carrier</option>
          <option value={CarrierCode.UPS}>📦 {CarrierCode.UPS}</option>
          <option value={CarrierCode.FedEx}>📦 {CarrierCode.FedEx}</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
