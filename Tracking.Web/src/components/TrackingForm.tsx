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
  const [carrier, setCarrier] = useState('');
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
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Track Your Package
      </h1>
      <TrackingInput
        value={trackingNumber}
        onChange={setTrackingNumber}
        error={errors.trackingNumber}
      />
      <CarrierSelect value={carrier} onChange={setCarrier} error={errors.carrier} />
      <TrackingButton
        onClick={handleSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
      />
    </div>
  );
}
