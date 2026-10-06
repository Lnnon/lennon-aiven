# LENNON portfolio

Responsive Vite portfolio with sample content and a Supabase REST data adapter.

## Run locally

1. Install dependencies with `npm install`.
2. Start the dev server with `npm run dev`.

## Connect Supabase

Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. The public anon key is intended for browser use; protect every table with appropriate Supabase Row Level Security policies. The portfolio loader reads `users`, `profile`, `experience`, `education`, `skills`, `certifications`, `projects`, `project_media`, `testimonials`, `social_links`, and `analytics`. Contact submissions are inserted into `contact_messages` by `sendContactMessage` in `src/data.js`.

The sample portfolio content remains visible until the page is configured to render records returned by `loadPortfolio()`. Align the select policies and table columns with your schema before enabling the database loader.
