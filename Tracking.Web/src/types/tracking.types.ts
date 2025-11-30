export const CarrierCode = {
  UPS: 'UPS',
  FedEx: 'FedEx',
} as const;

export type CarrierCode = typeof CarrierCode[keyof typeof CarrierCode];

export const TrackingJobStatus = {
  Pending: 'Pending',
  Processing: 'Processing',
  Completed: 'Completed',
  Failed: 'Failed',
} as const;

export type TrackingJobStatus = typeof TrackingJobStatus[keyof typeof TrackingJobStatus];

export const TrackingStatus = {
  InTransit: 'InTransit',
  Delivered: 'Delivered',
  Exception: 'Exception',
  InfoReceived: 'InfoReceived',
  OutForDelivery: 'OutForDelivery',
  Unknown: 'Unknown',
} as const;

export type TrackingStatus = typeof TrackingStatus[keyof typeof TrackingStatus];

export interface TrackingRequest {
  trackingNumber: string;
  carrierCode: CarrierCode;
}

export interface Events {
  date?: string;
  description?: string;
  location?: string;
  country?: string;
}

export interface TrackingInfo {
  trackingNumber?: string;
  carrier?: CarrierCode;
  deliveryDate?: string;
  status?: TrackingStatus;
  eventList?: Events[];
}

export interface TrackingJobResponse {
  jobId: string;
  status: TrackingJobStatus;
  statusUrl?: string;
  expiresAt: string;
}

export interface TrackingStatusResponse {
  jobId: string;
  status: TrackingJobStatus;
  result?: TrackingInfo;
  errorMessage?: string;
  completedAt?: string;
}
