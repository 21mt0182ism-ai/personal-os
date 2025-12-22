# Personal Life OS

A lightweight, multipage JavaScript web application to manage learning, habits, health, journaling and weekly reports - all in one place.

This project is intentionally built **without frameworks** to focus on
core web fundamentals: architecture, state management, and data modeling.

## Features
- 🔐 Simple authentication (localStorage-based)
- 📊 Dashboard with daily summaries
- ✅ Habit tracking with streak logic
- 📘 Learning session tracking (hours + minutes)
- 🏃 Health activity logging
- 📝 Daily journal with history
- 📈 Weekly reports (last 7 days)
- 📤 Export reports as CSV
- 🧭 Shared navigation across pages
- 🎨 Clean, minimal UI

## Tech Stack
- HTML (multipage)
- Vanilla JavaScript (ES Modules)
- CSS
- LocalStorage (Phase 1)
- FastAPI backend (to be planned)

## Project Structure
public/ → HTML pages (multipage app)
src/pages/ → Page-level JavaScript
src/components → Reusable UI components
src/services/ → Auth & storage abstractions
src/utils/ → Date helpers
src/styles/ → Global CSS

## Possible Future Improvements
Dark mode
Charts (Chart.js)
Monthly reports
Backend sync (FastAPI)
Auth with real users
Data import/export
Mobile layout refinements

## How to Run
Use any static server:

```bash
npx serve .
# or
python -m http.server


Open: http://localhost:3000 or http://localhost:8000/public/index.html
```
