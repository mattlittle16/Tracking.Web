import { useState } from 'react';
import { TrackingInput } from './TrackingInput';
import { CarrierSelect } from './CarrierSelect';
import { TrackingButton } from './TrackingButton';

interface TrackingFormProps {
  onSubmit: (trackingNumber: string, carrier: string) => void;
  isSubmitting?: boolean;
}

export function TrackingForm({ onSubmit, isSubmitting }: TrackingFormProps) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [carrier, setCarrier] = useState('UPS');
  const [errors, setErrors] = useState<{ trackingNumber?: string; carrier?: string }>(
    {}
  );

  const validate = (): boolean => {
    const newErrors: { trackingNumber?: string; carrier?: string } = {};

    if (!trackingNumber.trim()) {
      newErrors.trackingNumber = 'Tracking number is required';
    }

    if (!carrier) {
      newErrors.carrier = 'Please select a carrier';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(trackingNumber.trim(), carrier);
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Track Your Package
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your tracking number and select a carrier to get started
        </p>
      </div>
      
      <div className="space-y-1">
        <TrackingInput
          value={trackingNumber}
          onChange={setTrackingNumber}
          error={errors.trackingNumber}
        />
        <CarrierSelect value={carrier} onChange={setCarrier} error={errors.carrier} />
        <div className="pt-2">
          <TrackingButton
            onClick={handleSubmit}
            disabled={isSubmitting}
            loading={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
