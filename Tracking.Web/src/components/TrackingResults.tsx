import type { TrackingInfo } from '../types/tracking.types';
import { TrackingStatus } from '../types/tracking.types';

interface TrackingResultsProps {
  trackingInfo: TrackingInfo;
  onTrackAnother: () => void;
}

export function TrackingResults({ trackingInfo, onTrackAnother }: TrackingResultsProps) {
  const getStatusColor = (status?: TrackingStatus): string => {
    switch (status) {
      case TrackingStatus.Delivered:
        return 'bg-green-100 text-green-800 border-green-200';
      case TrackingStatus.OutForDelivery:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case TrackingStatus.InTransit:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case TrackingStatus.Exception:
        return 'bg-red-100 text-red-800 border-red-200';
      case TrackingStatus.InfoReceived:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {trackingInfo.trackingNumber}
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
            {trackingInfo.carrier}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
              trackingInfo.status
            )}`}
          >
            {trackingInfo.status}
          </span>
        </div>
        {trackingInfo.deliveryDate && (
          <p className="mt-3 text-gray-600">
            <span className="font-medium">Estimated Delivery:</span>{' '}
            {formatDate(trackingInfo.deliveryDate)}
          </p>
        )}
      </div>

      {trackingInfo.eventList && trackingInfo.eventList.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking History</h3>
          <div className="relative border-l-2 border-gray-200 pl-6 space-y-6">
            {trackingInfo.eventList.map((event, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[29px] top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">{formatDate(event.date)}</p>
                  <p className="font-medium text-gray-900 mb-1">{event.description}</p>
                  {(event.location || event.country) && (
                    <p className="text-sm text-gray-600">
                      {event.location}
                      {event.location && event.country && ', '}
                      {event.country}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onTrackAnother}
        className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
      >
        Track Another Package
      </button>
    </div>
  );
}
