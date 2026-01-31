# Luke Birthday Card

## Overview
An interactive personalized birthday card web app featuring:
- Bow and arrow interaction where pulling the arrow extinguishes birthday candles
- Elegant paper card design with embossed borders and corner flourishes
- Swipeable Polaroid photo gallery on the left side
- Calligraphy handwriting animation with ink splatter effects synced to audio
- Natural handwriting with emphasized words and wet ink styling

Built with Next.js 16 and React 18.

## Project Structure
- `app/` - Next.js App Router pages and components
  - `page.jsx` - Main page rendering the birthday card
  - `layout.jsx` - Root layout with metadata
  - `components/BirthdayCard.jsx` - Interactive birthday card component
- `public/` - Static assets
  - `fonts/` - Custom handwriting font (InterSignature-q20q2.ttf)
  - `audio/` - Narration audio (luke-poem.mp3)
  - `bow.png`, `arrow.png`, `candle.png` - Interactive elements
  - Photos (photo1.jpg, photo2.jpg, photo3.jpg)

## Development
- **Dev server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Start**: `npm run start`

## Features
### Card Front
- **Horizontal Bow**: Bow on left pointing toward candles with pullback animation
- **Candle Cluster**: 5 candles arranged in 2 rows (3 back, 2 front) with flickering flames
- **Arrow Mechanic**: Pull arrow back (drag left) to shoot; arrow flies across to extinguish candles
- **Paper Texture**: Realistic cream paper with grid lines, embossed border, corner flourishes

### Card Interior
- **Swipeable Photos**: Photo carousel with dot navigation and tape decoration
- **Natural Handwriting**: Text with slight rotation and wobble per line
- **Emphasized Words**: Key words (Luke, star, thrive, love, bright, dreams, heart) appear bolder with glow
- **Ink Effects**: Static ink spots and splatter dots throughout the poem
- **Audio Sync**: Handwriting reveals progressively synced to spoken narration
- **Silent Fallback**: Animation plays at natural pace without audio

## Recent Changes
- 2026-01-31: Enhanced card design
  - Flipped bow to vertical orientation with pullback animation
  - Increased candle size 3x with larger flames and glow
  - Arrow now flies across screen to hit candle flames
  - Added sequential candle extinguishing effect
  - Redesigned interior with natural handwriting, ink splatter, and emphasis
  - Made photos swipeable with carousel navigation
  - Removed "loading audio" text
- 2026-01-29: Migrated from Vercel to Replit
  - Updated Next.js to v16.1.6
  - Configured port bindings for Replit (0.0.0.0:5000)
- 2026-01-29: Built initial interactive birthday card
  - Added draggable arrow with page-flip animation
  - Implemented Polaroid-style photo layout
  - Created handwriting animation with audio sync

## Technical Notes
- Uses Next.js App Router with client components
- Font loaded via FontFace API
- SVG-based handwriting animation with clip-path reveal
- Ink dots use useMemo for stable positioning across renders
- Audio sync using requestAnimationFrame loop
- No database or external API dependencies
