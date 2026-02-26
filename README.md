# 📊 Campaigns Dashboard

A production-ready fullstack Campaigns Dashboard for internal marketing/operations teams to monitor, search, filter, and analyze campaign performance.

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, React Query, Axios, React Router |
| **Backend** | Node.js, Express, TypeScript, In-memory data store |

## 📁 Project Structure

```
├── server/                    # Backend API
│   └── src/
│       ├── types/             # TypeScript interfaces
│       ├── data/              # Seed data (42 campaigns)
│       ├── services/          # Business logic
│       ├── controllers/       # Request handlers
│       ├── routes/            # API routes
│       └── app.ts             # Express setup
│
├── src/                       # Frontend React app
│   ├── types/                 # Shared TypeScript types
│   ├── services/              # Axios API layer
│   ├── hooks/                 # React Query hooks
│   ├── components/
│   │   ├── Navbar/            # Navigation bar
│   │   ├── SearchBar/         # Debounced search
│   │   ├── Filters/           # Niche + Sort dropdowns
│   │   ├── CampaignCard/      # Campaign card grid item
│   │   ├── Pagination/        # Page navigation
│   │   └── UI/                # Loading, Empty, Error states
│   └── pages/
│       └── CampaignsPage.tsx  # Main page with URL sync
```

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
# Frontend (from project root)
npm install

# Backend
cd server
npm install
```

### 2. Start the backend

```bash
cd server
npm run dev
# → API runs at http://localhost:5000
```

### 3. Start the frontend

```bash
# From project root
npm run dev
# → App runs at http://localhost:3000 (proxies API to :5000)
```

## 🔌 API Contract

### `GET /api/campaigns`

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `search` | string | — | Case-insensitive title + tag match |
| `niche` | string | — | Filter by niche |
| `sort` | string | `newest` | `newest`, `oldest`, `highest`, `lowest` |
| `page` | number | `1` | Page number |
| `limit` | number | `9` | Items per page (max 50) |

**Response:**
```json
{
  "data": [Campaign],
  "meta": { "total": 42, "page": 1, "totalPages": 5, "limit": 9 }
}
```

## 🏗️ Architecture Decisions

### State Management
- **URL state** → filters (search, niche, sort, page) — shareable & bookmarkable
- **React Query** → server state — caching, deduplication, background refetch
- **Local state** → UI-only interactions (mobile menu toggle)

### Search
- 300ms debounce to avoid excessive API calls
- Input sanitized to prevent injection
- Case-insensitive matching on title + tags

### Caching
- React Query `staleTime: 5 minutes` — avoids refetching identical queries
- `keepPreviousData` — prevents layout shift during pagination/filter changes

### Edge Cases
- Invalid page → returns empty array with correct meta
- Invalid sort → falls back to `newest`
- Large limit → capped at 50
- Empty search → returns all campaigns

## 🎨 Design
- Custom color palette (Indigo primary, Slate surface)
- Inter font from Google Fonts
- Glassmorphism navbar with backdrop blur
- Niche-specific color coding (Fintech=blue, Health=rose, etc.)
- Skeleton loading with shimmer animation
- Hover elevation on cards
- Gradient progress bars
- Responsive grid (1/2/3 columns)

## ⚖️ Tradeoffs
1. **In-memory DB** vs real database — faster to prototype, sufficient for assessment
2. **Proxy** vs CORS in production — Vite proxy simplifies dev, would use reverse proxy in prod
3. **URL sync** adds complexity but makes filters shareable — production-grade UX
4. **React Query over Redux** — campaign data is server state, not client state
