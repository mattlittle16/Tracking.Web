import { useState } from 'react';
import { TrackingForm } from './components/TrackingForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { TrackingResults } from './components/TrackingResults';
import { trackingApi } from './services/trackingApi';
import { useTrackingPoll } from './hooks/useTrackingPoll';
import { TrackingJobStatus } from './types/tracking.types';

type AppScreen = 'form' | 'loading' | 'results' | 'error';

function App() {
  const [screen, setScreen] = useState<AppScreen>('form');
  const [jobId, setJobId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: trackingData, error: pollError } = useTrackingPoll(jobId);

  const handleSubmit = async (trackingNumber: string, carrier: string) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await trackingApi.submitTrackingRequest(trackingNumber, carrier);
      setJobId(response.jobId);
      setScreen('loading');
      console.log('Job submitted:', response);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to submit tracking request');
      setScreen('error');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackAnother = () => {
    setScreen('form');
    setJobId(null);
    setErrorMessage(null);
  };

  // Monitor tracking data and update screen
  if (trackingData && screen === 'loading') {
    if (trackingData.status === TrackingJobStatus.Completed && trackingData.result) {
      setScreen('results');
    } else if (trackingData.status === TrackingJobStatus.Failed) {
      setErrorMessage(trackingData.errorMessage || 'Tracking request failed');
      setScreen('error');
    }
  }

  // Handle polling errors
  if (pollError && screen === 'loading') {
    setErrorMessage(pollError);
    setScreen('error');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {screen === 'form' && (
          <TrackingForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        )}

        {screen === 'loading' && <LoadingSpinner />}

        {screen === 'results' && trackingData?.result && (
          <TrackingResults
            trackingInfo={trackingData.result}
            onTrackAnother={handleTrackAnother}
          />
        )}

        {screen === 'error' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
              <p className="text-gray-600 mb-6">{errorMessage}</p>
            </div>
            <button
              onClick={handleTrackAnother}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
