import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../utils/constants';
import type {
  TrackingRequest,
  TrackingJobResponse,
  TrackingStatusResponse,
} from '../types/tracking.types';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});

export const trackingApi = {
  async healthCheck(): Promise<boolean> {
    try {
      await apiClient.get('/HealthCheck');
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },

  async submitTrackingRequest(
    trackingNumber: string,
    carrierCode: string
  ): Promise<TrackingJobResponse> {
    const request: TrackingRequest = {
      trackingNumber,
      carrierCode: carrierCode as any,
    };
    const response = await apiClient.post<TrackingJobResponse>('/Tracking', request);
    return response.data;
  },

  async getTrackingStatus(jobId: string): Promise<TrackingStatusResponse> {
    const response = await apiClient.get<TrackingStatusResponse>(`/Tracking/${jobId}`);
    return response.data;
  },
};
