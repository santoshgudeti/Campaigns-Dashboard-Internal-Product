📌 PRODUCT REQUIREMENTS DOCUMENT (PRD)
📊 Campaigns Dashboard – Internal Product
1. Product Overview
🎯 Objective

Build a production-ready internal Campaigns Dashboard that allows users to:

View campaigns in a grid

Search campaigns

Filter by niche

Sort campaigns

View campaign performance stats

Navigate seamlessly across states (loading, empty, error)

This product tests:

Frontend architecture

API design

System thinking

Production-level edge case handling

2. Target Users
👤 Primary User

Internal marketing/operations team member who:

Monitors active campaigns

Filters by niche

Tracks campaign performance

Searches campaigns quickly

3. Core Functional Requirements
3.1 Top Navigation
Requirements

Horizontal nav bar

Active tab highlight

Logo / Brand placeholder

Responsive collapse on mobile

States

Default

Active

Hover

Mobile hamburger (optional)

3.2 Search
Behavior

Text input

Debounced (300–500ms)

Calls API with ?search=

Case-insensitive matching

Matches title + tags

Edge Cases

Empty input → return all

Special characters → sanitized

No results → Empty state UI

3.3 Filters
Required Filters

Niche (dropdown)

Sort (dropdown)

Sort Options

Newest

Oldest

Highest progress

Lowest progress

URL Sync (Production-grade expectation)

Filters reflect in URL:

/campaigns?search=ai&niche=fintech&sort=newest&page=2
3.4 Campaign Cards Grid
Card Structure

Each campaign includes:

Title

Niche tag

Status tag (Active / Completed)

Stats:

Impressions

Clicks

Conversion rate

Progress bar

CTA Button (View Details)

Visual States

Hover elevation

Disabled CTA if archived

3.5 Pagination
Backend Driven

Supports:

?page=1
&limit=9

Response includes:

{
  data: Campaign[],
  meta: {
    total: number,
    page: number,
    totalPages: number
  }
}
3.6 System States (Very Important)
1️⃣ Loading

Skeleton cards

Disabled filters

2️⃣ Empty

"No campaigns found"

Clear filter CTA

3️⃣ Error

Friendly message

Retry button

🧠 Non-Functional Requirements
Performance

API < 300ms response (mock acceptable)

Debounced search

Avoid unnecessary re-renders

Accessibility

Semantic HTML

ARIA roles

Keyboard navigable dropdowns

Proper contrast

Maintainability

Modular folder structure

Typed API layer

Separation of concerns

🏗️ System Architecture
Frontend Architecture
Stack

React

TypeScript

Vite

Tailwind CSS

React Query (for caching)

Axios

Folder Structure
src/
 ├── components/
 │    ├── Navbar/
 │    ├── CampaignCard/
 │    ├── Filters/
 │    ├── SearchBar/
 │    ├── Pagination/
 │    └── UI/
 │
 ├── pages/
 │    └── CampaignsPage.tsx
 │
 ├── hooks/
 │    └── useCampaigns.ts
 │
 ├── services/
 │    └── campaigns.api.ts
 │
 ├── types/
 │    └── campaign.ts
 │
 └── utils/
State Management

Use:

URL state

React Query for server state

Local state for UI

Mental model:

React Query = server memory cache
URL = filter memory
Local state = UI interaction

Backend Architecture
Stack

Node.js

Express

TypeScript

In-memory DB (array or JSON seed)

Folder Structure
src/
 ├── routes/
 │    └── campaigns.route.ts
 ├── controllers/
 │    └── campaigns.controller.ts
 ├── services/
 │    └── campaigns.service.ts
 ├── data/
 │    └── seed.ts
 ├── types/
 │    └── campaign.ts
 └── app.ts
API Contract
GET /campaigns
Query Params
Param	Type	Required	Description
search	string	no	title + tag match
niche	string	no	filter
sort	string	no	newest, oldest
page	number	no	default 1
limit	number	no	default 9
Backend Logic Flow

Load data

Apply search filter

Apply niche filter

Apply sorting

Paginate

Return structured response

🧪 Edge Case Handling

Invalid page number → return empty array

Invalid sort → fallback to newest

Large page limit → cap at 50

Missing query params → defaults

🔐 Optional Bonus Implementation
Basic Auth Mock

Middleware:

if (!req.headers.authorization)
  return 401
Caching Strategy
Frontend

React Query with:

staleTime: 5 minutes
Backend

Simple in-memory cache (Node Map)

CI

ESLint

Prettier

GitHub Actions:

Lint

Build

Test

📘 README Structure

Must include:

Setup instructions

Tech stack

Architecture decisions

Tradeoffs

Assumptions

Folder structure

How pagination works

How search is implemented

How caching works

🎥 Loom Walkthrough Structure

Problem understanding

Architecture overview

Frontend breakdown

Backend breakdown

Demo search + filter

Explain tradeoffs

🧠 Interview Explanation Script

If interviewer asks:

Why React Query?

Because campaign data is server state, not UI state. React Query prevents refetching and manages cache automatically.

Why URL Sync?

So filters are shareable and bookmarkable. This improves usability and production readiness.

Why separate service layer?

To isolate business logic from route handlers for maintainability and testability.

🚀 COMPLETE VIBE PROMPT (To Build It End-to-End)

You can paste this into Cursor / GPT-4.1 / Claude:

🔥 FULL APP GENERATION PROMPT

Build a production-grade fullstack Campaigns Dashboard application.

Frontend:

React + TypeScript

Vite

Tailwind CSS

React Query

Axios

Fully responsive

Modular architecture

Requirements:

Top navigation with active state

Search input with debounce

Niche filter dropdown

Sort dropdown

Campaign grid with:

title

tags

stats

progress bar

CTA button

Pagination

Loading skeletons

Empty state

Error state

URL query param sync

Backend:

Node.js + Express + TypeScript

Endpoint: GET /campaigns

Supports:

search

niche

sort

page

limit

Returns paginated response with meta

Seed at least 40 campaign objects

Clean architecture:

routes

controllers

services

types

Input validation

Error handling middleware

Bonus:

Basic auth middleware

React Query caching

ESLint + Prettier

GitHub Actions CI

Make sure:

No hardcoded data in frontend

All data comes from API

Types are strongly defined

Code is clean and production-minded

Add README with architecture explanation

🎯 Final Advice (For You)

Since you're serious about fullstack engineering:

When building this:

Don’t rush UI polish

Focus on architecture clarity

Make your code explain itself

Prepare to defend decisions

This assignment is testing:

“Can this person think like a mid-level engineer?”

And if you build this properly, it can absolutely go on your resume as:

Built a production-ready fullstack dashboard with advanced filtering, pagination, and API architecture using React, TypeScript, and Node.js.