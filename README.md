# ARC Engine - PRD v3

**Two Minds. One Spark.**

ARC Engine is a conversational AI interface that synthesizes dual perspectives—analytical precision (ARC-0) and creative intuition (ARC-1)—into unified insights through intelligent spark generation.

## Features

### Multi-Panel Architecture
- **User Prompt Stream**: Displays user queries
- **ARC-0 (Analytical)**: Provides logical, systematic analysis
- **ARC-1 (Creative)**: Offers imaginative, unconventional perspectives  
- **Summary Panel**: Synthesizes both perspectives
- **Spark Panel**: Conditionally appears with breakthrough insights

### Smart Classifier
- Analyzes each query to determine if spark insight is needed
- Returns `NEEDS_SPARK` or `NO_SPARK` classification
- Integrates seamlessly into message pipeline

### Streaming Responses
- Real-time typewriter effects for ARC-0 responses
- Flickering scanline effects for ARC-1 responses
- Panel-specific animation speeds
- Live cursor indicators during streaming

### Idle Animations
- Particle drift effects (<4% opacity)
- Breathing glow on panels
- Scanline overlays
- Static flicker background
- All powered by Framer Motion

### Glassmorphic Design
- SparkSummaryPanel with glass morphism
- Backdrop blur effects
- Shimmer animations
- Purple accent palette with glow effects
- Animated ✦ spark icon with pulse

## Tech Stack

- **Framework**: Next.js 16.0.1 with Turbopack
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes (classifier, arc0, arc1, summary, spark)
│   ├── arc/              # Main ARC interface
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
│   ├── BackgroundAnimation.tsx
│   ├── InputBar.tsx
│   ├── MessageBubble.tsx
│   ├── Panel.tsx
│   └── SparkPanel.tsx
└── store/
    └── useArcStore.ts    # Zustand state management
```

## API Endpoints

All endpoints are currently mocked for MVP:

- `POST /api/classifier` - Classifies messages as NEEDS_SPARK or NO_SPARK
- `POST /api/arc0` - Streams analytical responses
- `POST /api/arc1` - Streams creative responses
- `POST /api/summary` - Generates synthesis
- `POST /api/spark` - Creates spark insights

## Development Notes

- The application is offline-first ready
- All mock responses can be easily replaced with real API calls
- State management is centralized using Zustand
- Animations use Framer Motion for smooth performance
- Responsive design: 4-column desktop, single-column mobile

## PRD v3 Compliance

✅ Multi-panel UI architecture  
✅ LLM classifier integration  
✅ Streaming responses with animations  
✅ Idle animation system  
✅ InputBar with correct placeholder  
✅ Mock API endpoints  
✅ Glassmorphic SparkSummaryPanel  
✅ Framer Motion & Zustand integration  
✅ Offline-first philosophy  
✅ Clean, minimal codebase  

## License

Private repository - All rights reserved.
