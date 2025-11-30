import { CarrierCode } from '../types/tracking.types';

interface CarrierSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CarrierSelect({ value, onChange, error }: CarrierSelectProps) {
  return (
    <div className="mb-4">
      <label htmlFor="carrier" className="block text-sm font-medium mb-2">
        Carrier
      </label>
      <select
        id="carrier"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
      >
        <option value="">Select Carrier</option>
        <option value={CarrierCode.UPS}>{CarrierCode.UPS}</option>
        <option value={CarrierCode.FedEx}>{CarrierCode.FedEx}</option>
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
