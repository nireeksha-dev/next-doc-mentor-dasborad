# NextDoc UK Mentor Dashboard

A comprehensive web application for NHS clinicians to mentor junior doctors through NextDoc UK's career development products.

## Tech Stack
- React 18, TypeScript, Vite
- Tailwind CSS, shadcn/ui components
- Zustand (auth), TanStack Query (data)
- Recharts (analytics)

## Current Status
✅ **Phase 1 Complete** - Full UI with mock data  
⏳ **Phase 2 Pending** - Backend API integration  
⏳ **Phase 3 Pending** - Stripe Connect payouts  
⏳ **Phase 4 Pending** - Instagram content upload

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Documentation
- **API Integration**: See `docs/API_INTEGRATION.md`
- **Testing Guide**: See `docs/TESTING_CHECKLIST.md`
- **Architecture**: Mock API in Phase 1, replace with `src/lib/api.ts` in Phase 2

## Key Features
- Overview dashboard with session scheduling
- Earnings tracking with CSV export
- Mentee management & task queue
- Instagram Creator program (beta landing page)
- Legal compliance modal
- Analytics & reporting

## Design System
All colors use HSL semantic tokens from `src/index.css`. Never use direct colors like `bg-white` - always use design system tokens.

**NHS Blue Theme:**
- Primary: `#003087` (NHS Blue)
- Success: `#10B981` (Clinical Green)  
- Warning: `#F59E0B` (Amber)

## License
Proprietary - © 2025 NextDoc UK Ltd

## Support
- Technical: dev@nextdocuk.com
- Mentors: mentors@nextdocuk.com
- Finance: finance@nextdocuk.com
