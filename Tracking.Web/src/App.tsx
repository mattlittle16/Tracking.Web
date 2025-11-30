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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-10 md:p-12">
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
            <div className="text-center animate-fade-in py-8">
              <div className="mb-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <svg
                    className="w-10 h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Something Went Wrong
                </h2>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <p className="text-red-800 text-sm font-medium">{errorMessage}</p>
                </div>
              </div>
              <button
                onClick={handleTrackAnother}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
