# Luke Birthday Card

## Overview
A personalized birthday card web app featuring calligraphy animation synced to audio. Built with Next.js 16 and React 18.

## Project Structure
- `app/` - Next.js App Router pages and components
  - `page.jsx` - Main page rendering the birthday card
  - `layout.jsx` - Root layout with metadata
  - `components/BirthdayCard.jsx` - Interactive birthday card component
- `public/` - Static assets (photos, fonts, audio)

## Development
- **Dev server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Start**: `npm run start`

## Recent Changes
- 2026-01-29: Migrated from Vercel to Replit
  - Updated Next.js to v16.1.6 (fixed security vulnerability)
  - Configured port bindings for Replit (0.0.0.0:5000)
  - Set up deployment configuration for autoscale

## Technical Notes
- Uses Next.js App Router
- No database or external API dependencies
- All assets are served from `/public`
