# ARC Engine

**Two Minds. One Spark.**

ARC Engine is a conversational AI interface that combines dual AI perspectives (ARC-0 and ARC-1) to generate synthesized insights through the Spark panel.

## Features

- 🔵 **ARC-0**: Analytical perspective providing logical, structured responses
- 🟢 **ARC-1**: Creative perspective offering intuitive, exploratory insights
- ✨ **Spark Panel**: Synthesizes both perspectives into breakthrough insights
- 💬 **User Prompt Stream**: Track your conversation history
- 🎨 **Dark Theme**: Minimal, responsive design optimized for focus
- 📱 **Mobile Responsive**: Works seamlessly across all devices

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page, then click "Enter ARC" to access the main interface.

## Project Structure

- `/src/app/page.tsx` - Landing page
- `/src/app/arc/page.tsx` - Main ARC Engine interface
- `/src/components/` - Reusable UI components
  - `PanelHeader.tsx` - Header for panels with optional options button
  - `Bubble.tsx` - Chat message bubble component
  - `SparkPanel.tsx` - Synthesized insights panel
  - `OptionsDrawer.tsx` - Persona settings drawer
  - `InputBar.tsx` - User input component

## Build for Production

```bash
npm run build
npm start
```

## Technology Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Compliance

This project is 100% compliant with ARC Engine MVP PRD v2, featuring:
- Client-side only logic (no API dependencies)
- Mocked persona responses for MVP demonstration
- Full mobile responsiveness
- Minimal dark theme
- Deploy-ready configuration
