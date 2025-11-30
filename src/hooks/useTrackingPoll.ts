import { useState, useEffect, useRef } from 'react';
import { trackingApi } from '../services/trackingApi';
import type {
  TrackingStatusResponse,
} from '../types/tracking.types';
import { TrackingJobStatus } from '../types/tracking.types';
import { POLL_INTERVAL_MS, MAX_POLL_ATTEMPTS } from '../utils/constants';

interface UseTrackingPollResult {
  data: TrackingStatusResponse | null;
  isPolling: boolean;
  error: string | null;
}

export function useTrackingPoll(jobId: string | null): UseTrackingPollResult {
  const [data, setData] = useState<TrackingStatusResponse | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollCountRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!jobId) return;

    setIsPolling(true);
    setError(null);
    pollCountRef.current = 0;

    const poll = async () => {
      try {
        const response = await trackingApi.getTrackingStatus(jobId);
        setData(response);

        if (
          response.status === TrackingJobStatus.Completed ||
          response.status === TrackingJobStatus.Failed
        ) {
          setIsPolling(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }

        pollCountRef.current++;
        if (pollCountRef.current >= MAX_POLL_ATTEMPTS) {
          setError('Polling timeout - please try again');
          setIsPolling(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tracking status');
        setIsPolling(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    poll();
    intervalRef.current = window.setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [jobId]);

  return { data, isPolling, error };
}
