# Tracking Number SPA

A React single-page application for tracking packages. Users can enter a tracking number and select a carrier (UPS or FedEx) to track their shipments in real-time.

## Features

- 📦 Track packages from multiple carriers (UPS, FedEx)
- 🔄 Real-time tracking with long polling
- 📱 Fully responsive design
- 🎨 Beautiful UI with Tailwind CSS
- ⚡ Fast and type-safe with TypeScript
- 🔍 Form validation with helpful error messages
- 📊 Detailed tracking timeline with event history
- 🎯 Color-coded delivery status badges

## Tech Stack

- **Framework**: React 19.2.0 + TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.17
- **HTTP Client**: Axios 1.13.2
- **State Management**: React hooks

## Prerequisites

- Node.js (v18 or higher recommended)
- Backend API running on http://localhost:5084/

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update with your API settings:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API configuration:

```env
VITE_API_BASE_URL=http://localhost:5084
VITE_API_KEY=your-api-key-here
```

**Environment Files:**
- `.env.development` - Used during `npm run dev` (default: localhost)
- `.env.production` - Used during `npm run build` (update for production API)
- `.env.local` - Local overrides (git-ignored, highest priority)
- `.env.example` - Template file (commit to git)

### 3. Start Backend API

Ensure your tracking API backend is running on http://localhost:5084/. The API should expose:
- `GET /HealthCheck` - Health check endpoint
- `POST /Tracking` - Submit tracking request
- `GET /Tracking/{jobId}` - Get tracking status

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at http://localhost:5173/

### 5. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (TypeScript compile + Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Application Flow

1. **Form Screen**: User enters tracking number and selects carrier
2. **Submit**: Form validates and submits to API (POST /Tracking)
3. **Loading Screen**: App receives jobId and begins polling
4. **Polling**: App polls GET /Tracking/{jobId} every 2.5 seconds
5. **Results Screen**: When job completes, displays tracking information with event timeline
6. **Error Screen**: Handles failures gracefully with retry option

## API Configuration

API settings are configured via environment variables. Create a `.env.local` file or update the appropriate environment file:

**Environment Variables:**
- `VITE_API_BASE_URL` - Base URL for the tracking API (e.g., http://localhost:5084)
- `VITE_API_KEY` - API key for authentication

**Polling Configuration** (in `src/utils/constants.ts`):
```typescript
export const POLL_INTERVAL_MS = 2500; // 2.5 seconds
export const MAX_POLL_ATTEMPTS = 120; // 5 minutes max
```

**Note**: All environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

## Project Structure

```
src/
├── components/
│   ├── TrackingForm.tsx       # Main form component
│   ├── TrackingInput.tsx      # Input field for tracking number
│   ├── CarrierSelect.tsx      # Dropdown for carrier selection
│   ├── TrackingButton.tsx     # Submit button
│   ├── LoadingSpinner.tsx     # Loading animation
│   └── TrackingResults.tsx    # Results display with timeline
├── services/
│   └── trackingApi.ts         # Axios API client
├── types/
│   └── tracking.types.ts      # TypeScript type definitions
├── hooks/
│   └── useTrackingPoll.ts     # Custom hook for polling
├── utils/
│   └── constants.ts           # Configuration constants
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
└── index.css                   # Tailwind CSS imports
```

## Status Badge Colors

- 🟢 **Delivered**: Green
- 🟠 **Out For Delivery**: Orange
- 🔵 **In Transit**: Blue
- 🔴 **Exception**: Red
- ⚪ **Info Received**: Gray

## Development Notes

- Uses React 19's latest features
- TypeScript strict mode enabled
- Tailwind CSS v4 with PostCSS
- Long polling pattern for real-time updates
- Automatic cleanup of intervals on unmount
- Form validation with error states
- Mobile-first responsive design

## License
MIT