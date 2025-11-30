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
        return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
      case TrackingStatus.OutForDelivery:
        return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700';
      case TrackingStatus.InTransit:
        return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      case TrackingStatus.Exception:
        return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      case TrackingStatus.InfoReceived:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getStatusIcon = (status?: TrackingStatus): string => {
    switch (status) {
      case TrackingStatus.Delivered:
        return '✓';
      case TrackingStatus.OutForDelivery:
        return '🚚';
      case TrackingStatus.InTransit:
        return '📦';
      case TrackingStatus.Exception:
        return '⚠️';
      case TrackingStatus.InfoReceived:
        return 'ℹ️';
      default:
        return '📦';
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

  const formatShortDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full animate-fade-in">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b-2 border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 break-all">
              {trackingInfo.trackingNumber}
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-600 shadow-sm">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                {trackingInfo.carrier}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold border-2 shadow-sm ${getStatusColor(
                  trackingInfo.status
                )}`}
              >
                <span className="mr-1.5">{getStatusIcon(trackingInfo.status)}</span>
                {trackingInfo.status}
              </span>
            </div>
          </div>
        </div>
        
        {trackingInfo.deliveryDate && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-wide">Estimated Delivery</p>
                <p className="text-base font-bold text-blue-900 dark:text-blue-200">
                  {formatDate(trackingInfo.deliveryDate)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Section */}
      {trackingInfo.eventList && trackingInfo.eventList.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tracking History
          </h3>
          <div className="relative pl-8 space-y-6">
            {/* Timeline line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-blue-300 to-gray-200 dark:from-blue-400 dark:via-blue-600 dark:to-gray-700"></div>
            
            {trackingInfo.eventList.map((event, index) => (
              <div key={index} className="relative group">
                {/* Timeline dot */}
                <div className={`absolute -left-[26px] top-2 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 shadow-md transition-transform group-hover:scale-125 ${
                  index === 0 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-400 dark:bg-gray-600'
                }`}></div>
                
                {/* Event card */}
                <div className={`bg-white dark:bg-gray-700 p-4 rounded-lg border-2 transition-all duration-200 ${
                  index === 0 
                    ? 'border-blue-200 dark:border-blue-700 shadow-md' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <p className={`text-sm font-bold uppercase tracking-wide ${
                      index === 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatShortDate(event.date)}
                    </p>
                    {index === 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-700">
                        Latest
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-base">
                    {event.description}
                  </p>
                  {(event.location || event.country) && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <svg className="w-4 h-4 mr-1.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
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

      {/* Action Button */}
      <button
        onClick={onTrackAnother}
        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Track Another Package
        </span>
      </button>
    </div>
  );
}
