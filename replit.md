# Luke Birthday Card

## Overview
An interactive personalized birthday card web app featuring:
- Draggable arrow on the front that triggers a page-flip animation
- Polaroid-style photo layout on the left side
- Calligraphy handwriting animation synced to audio on the right side
- Custom handwriting font with natural pen stroke simulation

Built with Next.js 16 and React 18.

## Project Structure
- `app/` - Next.js App Router pages and components
  - `page.jsx` - Main page rendering the birthday card
  - `layout.jsx` - Root layout with metadata
  - `components/BirthdayCard.jsx` - Interactive birthday card component
- `public/` - Static assets
  - `fonts/` - Custom handwriting font (InterSignature-q20q2.ttf)
  - `audio/` - Narration audio (luke-poem.mp3)
  - Photos (photo1.jpg, photo2.jpg, photo3.jpg)

## Development
- **Dev server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Start**: `npm run start`

## Features
- **Interactive Arrow**: Pull/drag or click to open the card
- **Page Flip Animation**: Smooth 3D flip effect when opening
- **Polaroid Photos**: Up to 3 photos displayed with rotation and shadow effects
- **Handwriting Animation**: SVG text revealed progressively with clip-path
- **Audio Sync**: Handwriting syncs to spoken narration timing
- **Silent Fallback**: Animation plays at natural pace without audio
- **Responsive Design**: Adapts to mobile and tablet screens

## Recent Changes
- 2026-01-29: Migrated from Vercel to Replit
  - Updated Next.js to v16.1.6 (fixed security vulnerability)
  - Configured port bindings for Replit (0.0.0.0:5000)
  - Set up deployment configuration for autoscale
- 2026-01-29: Rebuilt interactive birthday card
  - Added draggable arrow with page-flip animation
  - Implemented Polaroid-style photo layout
  - Created handwriting animation with audio sync
  - Added responsive CSS for mobile devices

## Technical Notes
- Uses Next.js App Router with client components
- Font loaded via FontFace API
- SVG-based handwriting animation with clip-path reveal
- Audio sync using requestAnimationFrame loop
- No database or external API dependencies
