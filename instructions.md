# Dushala Business Academy — Production MVP Prompt
> Senior Full-Stack Developer Specification | Next.js 14 App Router | Dockerized

---

## MISSION BRIEF

You are a senior full-stack developer building a **production-ready, fully Dockerized MVP** for **"Dushala Business Academy"** — a D2C business coaching platform for Indian women entrepreneurs.

**Before writing a single line of code:**
1. Read this entire document top to bottom
2. Understand the data flow and architecture
3. Bootstrap the project using the official Next.js CLI command
4. Build the folder structure exactly as specified
5. Implement every feature listed — nothing skipped, nothing abbreviated

---

## BOOTSTRAP COMMAND (Run This First)

```bash
npx create-next-app@latest dushala-business-academy \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

> This generates the official Next.js 14 App Router structure inside `src/app/`.  
> All subsequent folders and files live under `src/` unless otherwise noted.

---

## TECH STACK (Strict — Do Not Substitute)

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, `src/` directory) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + shadcn/ui |
| Database | PostgreSQL via Prisma ORM |
| Auth | Clerk (role-based: `admin` / `student`) |
| State | Zustand (no Redux) |
| Animations | Framer Motion |
| Video Player | Plyr.js (preferred) or Video.js |
| Mock Data | JSON seed files under `/src/data/` |
| Containerization | Docker + Docker Compose |

---

## DESIGN SYSTEM (Non-Negotiable)

**Aesthetic:** Luxury Indian feminine — *Sabyasachi meets Masterclass meets Netflix*

```ts
// tailwind.config.ts — extend theme with these exact tokens
colors: {
  brand: {
    rose:   '#B76E79',   // Primary — Deep rose gold
    ivory:  '#FAF5EE',   // Secondary — Warm ivory
    gold:   '#C9A84C',   // Accent — 24k gold
    dark:   '#1A1A1A',   // Text / deep backgrounds
    muted:  '#7A6A5A',   // Muted body text
  }
},
fontFamily: {
  heading: ['Playfair Display', 'serif'],
  body:    ['Inter', 'sans-serif'],
},
```

**Style references:**
- Layout cadence → Netflix (horizontal scrollable rows, cards, dark depth)
- Typography hierarchy → Masterclass (large serif headings, refined spacing)
- Brand warmth → Indian premium (gold accents, ivory backgrounds, rich rose)

---

## FOLDER STRUCTURE (Generate Exactly This)

```
dushala-business-academy/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── (auth)/                   # Auth route group (no shared layout)
│   │   │   ├── sign-in/
│   │   │   │   └── [[...sign-in]]/
│   │   │   │       └── page.tsx
│   │   │   └── sign-up/
│   │   │       └── [[...sign-up]]/
│   │   │           └── page.tsx
│   │   ├── (marketing)/              # Public-facing pages
│   │   │   ├── layout.tsx            # Marketing layout (navbar + footer)
│   │   │   ├── page.tsx              # Landing page  /
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx
│   │   │   └── about/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/              # Protected pages (Clerk middleware)
│   │   │   ├── layout.tsx            # Dashboard layout (sidebar + topbar)
│   │   │   ├── student/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx      # Student home
│   │   │   │   ├── courses/
│   │   │   │   │   ├── page.tsx      # Course catalog
│   │   │   │   │   └── [courseId]/
│   │   │   │   │       ├── page.tsx  # Course detail
│   │   │   │   │       └── lessons/
│   │   │   │   │           └── [lessonId]/
│   │   │   │   │               └── page.tsx  # Video player
│   │   │   │   ├── progress/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── quiz-history/
│   │   │   │       └── page.tsx
│   │   │   └── admin/
│   │   │       ├── dashboard/
│   │   │       │   └── page.tsx      # Admin home
│   │   │       ├── courses/
│   │   │       │   ├── page.tsx      # Manage courses
│   │   │       │   └── new/
│   │   │       │       └── page.tsx  # Upload course form
│   │   │       ├── users/
│   │   │       │   └── page.tsx      # User management
│   │   │       └── analytics/
│   │   │           └── page.tsx
│   │   ├── api/                      # Route Handlers (Next.js API)
│   │   │   ├── courses/
│   │   │   │   ├── route.ts          # GET all courses
│   │   │   │   └── [courseId]/
│   │   │   │       ├── route.ts      # GET single course
│   │   │   │       └── lessons/
│   │   │   │           └── route.ts  # GET lessons for course
│   │   │   ├── users/
│   │   │   │   └── route.ts
│   │   │   ├── progress/
│   │   │   │   └── route.ts
│   │   │   └── quiz/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx                # Root layout (ClerkProvider + fonts)
│   │   └── not-found.tsx
│   │
│   ├── components/                   # All reusable components
│   │   ├── ui/                       # shadcn/ui + custom base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── input.tsx
│   │   │   └── progress.tsx
│   │   ├── layout/                   # Page-level structural components
│   │   │   ├── Navbar.tsx            # Sticky nav with mobile hamburger
│   │   │   ├── Sidebar.tsx           # Dashboard sidebar (collapsible)
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── video/                    # Video player system
│   │   │   ├── VideoPlayer.tsx       # Plyr wrapper with language toggle
│   │   │   ├── SubtitleSwitcher.tsx  # EN/HI/TE dropdown
│   │   │   └── QuizOverlay.tsx       # Pause + MCQ modal on timestamp
│   │   ├── course/                   # Course-specific components
│   │   │   ├── CourseCard.tsx        # Thumbnail + title + progress
│   │   │   ├── CourseGrid.tsx        # Responsive grid of cards
│   │   │   ├── LessonList.tsx        # Sidebar lesson accordion
│   │   │   ├── ProgressBar.tsx       # Branded progress bar
│   │   │   └── CurriculumAccordion.tsx
│   │   ├── student/                  # Student-specific UI blocks
│   │   │   ├── WelcomeBanner.tsx
│   │   │   ├── ContinueWatching.tsx  # Horizontal scroll row
│   │   │   ├── AISummaryPanel.tsx    # Notes panel with copy button
│   │   │   └── QuizHistory.tsx
│   │   ├── admin/                    # Admin-specific UI blocks
│   │   │   ├── StatsCard.tsx
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── CourseUploadForm.tsx
│   │   │   ├── QuizBuilder.tsx       # Timestamp + MCQ builder
│   │   │   └── UsersTable.tsx
│   │   └── marketing/               # Landing page sections
│   │       ├── HeroSection.tsx
│   │       ├── FeaturesSection.tsx
│   │       ├── MentorSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       └── PricingSection.tsx
│   │
│   ├── lib/                          # Utilities and shared logic
│   │   ├── prisma.ts                 # Prisma client singleton
│   │   ├── auth.ts                   # Clerk auth helpers + role check
│   │   ├── utils.ts                  # cn(), formatDuration(), etc.
│   │   ├── mock-data.ts              # Loader for /src/data JSON files
│   │   └── constants.ts             # Plan names, languages, routes
│   │
│   ├── store/                        # Zustand stores
│   │   ├── usePlayerStore.ts         # Video playback + quiz state
│   │   ├── useCourseStore.ts         # Enrollment + progress
│   │   └── useUIStore.ts             # Sidebar open/close, modals
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useProgress.ts            # Fetch + update lesson progress
│   │   ├── useCourses.ts             # Fetch courses with filters
│   │   └── useQuiz.ts                # Quiz trigger logic
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── course.ts
│   │   ├── user.ts
│   │   ├── quiz.ts
│   │   └── index.ts                  # Re-exports all types
│   │
│   └── data/                         # Mock JSON data (MVP backend)
│       ├── courses.json
│       ├── lessons.json
│       ├── quizzes.json
│       ├── ai-summaries.json
│       └── users.json
│
├── prisma/
│   ├── schema.prisma                 # Full database schema
│   └── seed.ts                       # Seed script using data/ JSON
│
├── public/
│   ├── images/
│   │   ├── mentor-placeholder.jpg
│   │   └── course-thumbnails/        # course-1.jpg, course-2.jpg, course-3.jpg
│   └── subtitles/                    # Mock .vtt files
│       ├── lesson-1-en.vtt
│       ├── lesson-1-hi.vtt
│       └── lesson-1-te.vtt
│
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── .dockerignore
│
├── docker-compose.yml                # App + PostgreSQL + (optional) pgAdmin
├── docker-compose.dev.yml            # Dev with hot reload
├── .env.example                      # All required env vars documented
├── .env.local                        # Local secrets (gitignored)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── middleware.ts                     # Clerk route protection
└── README.md
```

---

## DATABASE SCHEMA (prisma/schema.prisma — Generate Complete File)

```prisma
// prisma/schema.prisma
// Dushala Business Academy — PostgreSQL Schema via Prisma ORM

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── User ────────────────────────────────────────────────────────────────────
model User {
  id            String         @id @default(cuid())
  clerkId       String         @unique              // Clerk user ID
  name          String
  email         String         @unique
  role          Role           @default(STUDENT)
  avatarUrl     String?
  language      Language       @default(EN)         // Default subtitle language
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  enrollments   Enrollment[]
  subscriptions Subscription[]
  progress      Progress[]
}

enum Role {
  ADMIN
  STUDENT
}

enum Language {
  EN
  HI
  TE
}

// ─── Course ───────────────────────────────────────────────────────────────────
model Course {
  id          String   @id @default(cuid())
  title       String
  description String
  thumbnail   String                              // URL or /public path
  price       Float    @default(0)
  language    Language @default(EN)
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  lessons     Lesson[]
  enrollments Enrollment[]
}

// ─── Lesson ───────────────────────────────────────────────────────────────────
model Lesson {
  id          String   @id @default(cuid())
  courseId    String
  title       String
  videoUrlEn  String                              // English video URL
  videoUrlHi  String?                             // Hindi video URL
  videoUrlTe  String?                             // Telugu video URL
  duration    Int                                 // Duration in seconds
  order       Int                                 // Position in course
  createdAt   DateTime @default(now())

  course      Course     @relation(fields: [courseId], references: [id], onDelete: Cascade)
  subtitles   Subtitle[]
  quizzes     Quiz[]
  progress    Progress[]
}

// ─── Subtitle ─────────────────────────────────────────────────────────────────
model Subtitle {
  id       String   @id @default(cuid())
  lessonId String
  language Language
  fileUrl  String                                // Path to .vtt file

  lesson   Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([lessonId, language])
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────
model Quiz {
  id               String        @id @default(cuid())
  lessonId         String
  triggerTimestamp Int                             // Seconds into video to trigger

  lesson    Lesson        @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  questions QuizQuestion[]
}

// ─── QuizQuestion ─────────────────────────────────────────────────────────────
model QuizQuestion {
  id           String   @id @default(cuid())
  quizId       String
  question     String
  options      String[]                           // Array of 4 option strings
  correctIndex Int                                // 0-based index of correct option

  quiz Quiz @relation(fields: [quizId], references: [id], onDelete: Cascade)
}

// ─── Progress ─────────────────────────────────────────────────────────────────
model Progress {
  id             String   @id @default(cuid())
  userId         String
  lessonId       String
  watchedSeconds Int      @default(0)
  completed      Boolean  @default(false)
  updatedAt      DateTime @updatedAt

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
}

// ─── Enrollment ───────────────────────────────────────────────────────────────
model Enrollment {
  id           String   @id @default(cuid())
  userId       String
  courseId     String
  subscribedAt DateTime @default(now())

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  course Course @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([userId, courseId])
}

// ─── Subscription ─────────────────────────────────────────────────────────────
model Subscription {
  id        String             @id @default(cuid())
  userId    String
  plan      SubscriptionPlan
  status    SubscriptionStatus @default(ACTIVE)
  expiresAt DateTime?
  createdAt DateTime           @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum SubscriptionPlan {
  FREE
  PRO
  ELITE
}

enum SubscriptionStatus {
  ACTIVE
  EXPIRED
  CANCELLED
}
```

---

## PAGES — Full Specification

### 1. Landing Page `/` — `src/app/(marketing)/page.tsx`

Sections (top → bottom):

| Section | Details |
|---|---|
| **Navbar** | Sticky, glass morphism on scroll, logo left, nav links center, CTA button right, mobile hamburger |
| **Hero** | Full-screen, dark overlay, tagline in Playfair Display, sub-copy in Inter, two CTAs (Enroll Now + Watch Intro), animated entrance |
| **Mentor** | Photo placeholder left, bio right, rose-gold divider, Framer Motion slide-in |
| **Features** | 3 cards: Video Learning / Multilingual / AI Notes — icon + title + description |
| **Testimonials** | 3 cards, mock data, star ratings, avatar placeholder, rose-gold quote marks |
| **Pricing** | 3 plan cards (Free / Pro / Elite), gold highlight on Pro, feature checklist, CTA per plan |
| **Footer** | Logo, links (Courses, About, Privacy, Contact), social icons, copyright |

---

### 2. Auth Pages — Clerk

**`src/app/(auth)/sign-in/[[...sign-in]]/page.tsx`**
**`src/app/(auth)/sign-up/[[...sign-up]]/page.tsx`**

- Use `<SignIn />` and `<SignUp />` from `@clerk/nextjs`
- Style the container to match design system (ivory background, rose-gold accents)
- After sign-in: use `afterSignInUrl` — redirect `admin` role → `/admin/dashboard`, `student` → `/student/dashboard`
- Implement role check via Clerk `publicMetadata.role`

---

### 3. Student Dashboard `/student/dashboard`

Components:
- `<WelcomeBanner />` — "Welcome back, [Name] 👋" with motivational quote
- `<ContinueWatching />` — horizontal scroll row, 2–3 cards with `<ProgressBar />`
- `<CourseGrid />` — "My Courses" section
- Quick links grid: AI Summary, Quiz History, Progress Report

---

### 4. Course List `/student/courses`

Features:
- Language filter tabs: All / English / Hindi / Telugu
- Search bar with debounce (300ms)
- `<CourseGrid />` with skeleton loading state
- Each `<CourseCard />`: thumbnail, title, language badge, duration, price, enroll CTA

---

### 5. Course Detail `/student/courses/[courseId]`

Sections:
- Hero: thumbnail (full-width), overlay with title + enroll CTA
- `<CurriculumAccordion />`: collapsible sections per lesson with duration + lock icon
- Mentor bio repeat section
- Reviews placeholder (3 mock stars + empty state "Be the first to review")

---

### 6. Video Player `/student/courses/[courseId]/lessons/[lessonId]`

**This is the most critical page. Build it completely.**

Layout: 70/30 split (video + sidebar)

| Element | Spec |
|---|---|
| **Video Player** | Plyr.js wrapper, custom rose-gold controls, 16:9 |
| **Language Toggle** | Dropdown: EN / HI / TE → swaps `<video src>` dynamically |
| **Subtitles** | `<track>` tag, `.vtt` file per language, switches with language toggle |
| **Lesson Sidebar** | List of all lessons, checkmark if `progress.completed === true`, highlight current |
| **Quiz Overlay** | `onTimeUpdate` → if `currentTime >= quiz.triggerTimestamp` → pause → show MCQ modal → score → resume |
| **AI Summary** | "Generate AI Summary" button → slide-in panel with formatted notes, "Copy Notes" button |

---

### 7. Admin Dashboard `/admin/dashboard`

- Stats cards: Total Users / Active Subscriptions / Total Videos / Revenue (mock)
- Recent activity feed (last 5 enrollments, mock data)
- Quick action buttons: Upload Course, Manage Users

---

### 8. Admin — Upload Course `/admin/courses/new`

**Full form with these sections:**

**Course Info:**
- Title (text input)
- Description (textarea)
- Price (number input)
- Language (select: EN / HI / TE)
- Thumbnail (file upload + preview)

**Lessons Builder (dynamic — add/remove):**
- Lesson title
- Video URL inputs: EN (required), HI (optional), TE (optional)
- Subtitle file upload per language (`.vtt`)
- Duration (auto-detect or manual)
- Order (drag to reorder)

**Quiz Builder per Lesson:**
- Trigger timestamp (seconds)
- Add questions: question text + 4 options + correct answer radio

Submit → POST to `/api/courses` (mock confirmation for MVP)

---

### 9. Admin — User Management `/admin/users`

Table columns: Name | Email | Role | Plan | Enrolled Courses | Joined Date | Actions

Features:
- Filter by role (Admin / Student) and subscription status
- Search by name or email
- Pagination (10 per page)
- Actions: View Profile, Change Role (mock)

---

## FEATURE SPECS — Implementation Details

### Multilingual Video

```ts
// In VideoPlayer.tsx
const [lang, setLang] = useState<'en' | 'hi' | 'te'>('en')

const videoSrc = {
  en: lesson.videoUrlEn,
  hi: lesson.videoUrlHi,
  te: lesson.videoUrlTe,
}[lang]

// Switch src dynamically, reload player, seek to saved position
// Load matching subtitle track from lesson.subtitles
```

### Quiz System (Zustand + localStorage)

```ts
// usePlayerStore.ts
interface PlayerStore {
  quizTriggered: boolean
  currentQuizId: string | null
  quizScores: Record<string, number>  // lessonId → score
  triggerQuiz: (quizId: string) => void
  dismissQuiz: () => void
  saveScore: (lessonId: string, score: number) => void
}

// In VideoPlayer.tsx — onTimeUpdate handler:
// if (!quizTriggered && currentTime >= quiz.triggerTimestamp) {
//   player.pause()
//   triggerQuiz(quiz.id)
// }
```

### AI Summary (Mock)

```ts
// data/ai-summaries.json — { lessonId: { points: string[], keyTerms: string[] } }
// AISummaryPanel.tsx — fetch from mock JSON, display formatted
// "Copy Notes" button → navigator.clipboard.writeText(formatted)
```

### Payments (Mock Flow)

```
/pricing → click plan → /checkout?plan=pro → mock form → /checkout/success
```

No real gateway. Show branded success screen with confetti animation.

---

## MOCK DATA — `/src/data/` (Generate All Files)

### `courses.json` — 3 courses

```json
[
  {
    "id": "course-1",
    "title": "Start Your Business from Zero",
    "description": "Learn how to validate your idea, register your business, and make your first sale.",
    "thumbnail": "/images/course-thumbnails/course-1.jpg",
    "price": 0,
    "language": "EN",
    "isPublished": true
  },
  {
    "id": "course-2",
    "title": "Scale on Instagram",
    "description": "Build a powerful brand presence and convert followers into paying customers.",
    "thumbnail": "/images/course-thumbnails/course-2.jpg",
    "price": 1999,
    "language": "HI",
    "isPublished": true
  },
  {
    "id": "course-3",
    "title": "Financial Freedom for Women",
    "description": "Master personal finance, investments, and build passive income streams.",
    "thumbnail": "/images/course-thumbnails/course-3.jpg",
    "price": 2999,
    "language": "TE",
    "isPublished": true
  }
]
```

### `lessons.json` — 3–4 per course

Each lesson has:
- `id`, `courseId`, `title`, `videoUrlEn`, `videoUrlHi`, `videoUrlTe`
- `duration` (seconds), `order`
- Use YouTube embed URLs as mock video sources

### `quizzes.json` — 1 quiz per lesson, 3 MCQ questions each

```json
{
  "lesson-1-1": {
    "triggerTimestamp": 120,
    "questions": [
      {
        "id": "q1",
        "question": "What is the first step in validating a business idea?",
        "options": ["Build the product", "Talk to potential customers", "Create a website", "Register the company"],
        "correctIndex": 1
      }
    ]
  }
}
```

### `ai-summaries.json` — 1 summary per lesson

```json
{
  "lesson-1-1": {
    "title": "Lesson 1 — Business Validation",
    "keyPoints": [
      "Customer discovery is more important than product development",
      "Validate demand before spending money",
      "Use social media to test ideas with zero budget"
    ],
    "keyTerms": {
      "MVP": "Minimum Viable Product — the simplest version of your idea",
      "ICP": "Ideal Customer Profile — who exactly you are selling to"
    },
    "summary": "In this lesson, we covered why most new businesses fail and how to avoid that trap by talking to real customers first..."
  }
}
```

### `users.json` — 3 mock users

```json
[
  { "id": "user-1", "name": "Priya Sharma", "email": "admin@dushala.in", "role": "ADMIN" },
  { "id": "user-2", "name": "Anita Rao", "email": "anita@example.com", "role": "STUDENT" },
  { "id": "user-3", "name": "Meena Patel", "email": "meena@example.com", "role": "STUDENT" }
]
```

### Mock `.vtt` subtitle files — `/public/subtitles/`

```vtt
WEBVTT

00:00:00.000 --> 00:00:05.000
Welcome to Dushala Business Academy.

00:00:05.001 --> 00:00:10.000
In this lesson, we will learn how to start your business from scratch.
```

---

## DOCKER CONFIGURATION (Generate All Files)

### `docker/Dockerfile` (Production)

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### `docker/Dockerfile.dev` (Development with hot reload)

```dockerfile
FROM node:20-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

### `docker-compose.yml` (Production)

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: docker/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/dushala_db
      - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      - CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
      - NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
      - NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
      - NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/student/dashboard
      - NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/student/dashboard
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: dushala_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@dushala.in
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - db

volumes:
  postgres_data:
```

### `docker-compose.dev.yml` (Development)

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: docker/Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/dushala_db
      - WATCHPACK_POLLING=true
    env_file:
      - .env.local
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: dushala_db
    volumes:
      - postgres_data_dev:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data_dev:
```

---

## ENVIRONMENT VARIABLES — `.env.example`

```bash
# ─── Database ─────────────────────────────────────────────────────────────────
DATABASE_URL="postgresql://postgres:password@localhost:5432/dushala_db"

# ─── Clerk Authentication ─────────────────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/student/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/student/dashboard"

# ─── App ──────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Dushala Business Academy"
```

---

## MIDDLEWARE — `src/middleware.ts`

```ts
// src/middleware.ts
// Clerk middleware — protect all dashboard routes

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/pricing',
  '/about',
  '/api/courses(.*)',    // Public course listing
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes without auth
  if (isPublicRoute(req)) return NextResponse.next()

  // Protect all other routes
  const { userId, sessionClaims } = await auth()
  if (!userId) return NextResponse.redirect(new URL('/sign-in', req.url))

  // Admin routes — check role in publicMetadata
  if (isAdminRoute(req)) {
    const role = sessionClaims?.metadata?.role
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/student/dashboard', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
}
```

---

## BUILD ORDER (Strict Sequence)

Follow this exact order. Do not skip or reorder:

```
Step 1:  README.md (architecture overview)
Step 2:  Run npx create-next-app@latest with flags above
Step 3:  Install dependencies (see below)
Step 4:  tailwind.config.ts (with design tokens)
Step 5:  src/app/globals.css (CSS variables + Google Fonts import)
Step 6:  prisma/schema.prisma (full schema)
Step 7:  .env.example
Step 8:  docker-compose.yml + docker-compose.dev.yml + Dockerfiles
Step 9:  middleware.ts
Step 10: src/types/ (all TypeScript interfaces)
Step 11: src/data/ (all mock JSON files)
Step 12: src/lib/ (prisma.ts, auth.ts, utils.ts, mock-data.ts)
Step 13: src/store/ (Zustand stores)
Step 14: src/components/ui/ (shadcn base components)
Step 15: src/components/layout/ (Navbar, Sidebar, Footer)
Step 16: src/app/(marketing)/page.tsx (Landing page — all sections)
Step 17: src/app/(auth)/ (Clerk sign-in/sign-up pages)
Step 18: src/components/video/ (VideoPlayer, QuizOverlay, SubtitleSwitcher)
Step 19: src/components/course/ (CourseCard, CourseGrid, LessonList)
Step 20: src/app/(dashboard)/student/ (all student pages)
Step 21: src/app/(dashboard)/admin/ (all admin pages)
Step 22: src/app/api/ (all route handlers)
Step 23: prisma/seed.ts
Step 24: Final README.md (complete documentation)
```

---

## DEPENDENCIES TO INSTALL

```bash
# Core
npm install @clerk/nextjs prisma @prisma/client zustand framer-motion

# UI
npx shadcn@latest init
npx shadcn@latest add button card badge skeleton dialog input label progress tabs accordion

# Video
npm install plyr react-plyr-wrapper
# OR: npm install video.js

# Utilities
npm install clsx tailwind-merge lucide-react date-fns

# Dev
npm install -D @types/node prisma
```

---

## OUTPUT RULES (Strict — Non-Negotiable)

1. **Generate ONE file at a time, completely** — no truncation, no `// ... rest of code`
2. **Every comment explains WHY** — write for a junior developer reading this for the first time
3. **Named exports for all components** — `export function CourseCard()` not `export default`
4. **Design system colors only** — never use random Tailwind colors (`blue-500`, `purple-700`)
5. **Mobile-first, responsive** — every page must work at 375px width
6. **Skeleton loading states** — never use spinners; use `<Skeleton />` from shadcn for all async sections
7. **No placeholder comments** — if a section exists in the spec, implement it fully
8. **TypeScript strict mode** — no `any` types, no implicit `any`
9. **Error boundaries** — wrap async page sections in `<Suspense>` with skeleton fallbacks
10. **Accessibility** — `aria-label`, `role`, keyboard navigation for all interactive elements

---

## README.md — Final Documentation Requirements

The final README.md must document:

```
1. Project Overview & Purpose
2. Architecture Diagram (ASCII or Mermaid)
3. Data Flow:
   - How a student logs in (Clerk → middleware → role redirect)
   - How a course is fetched (mock JSON → API route → page component)
   - How video language switching works (Zustand store → VideoPlayer)
   - How quiz triggers fire (onTimeUpdate → store → overlay modal)
   - How AI Summary is loaded (button click → mock JSON → panel)
4. Folder Map — one-line description of every folder
5. API Routes — method, path, description, response shape
6. Environment Variables — every var, what it does, where to get it
7. Docker Commands:
   - Dev: docker compose -f docker-compose.dev.yml up --build
   - Prod: docker compose up --build
   - DB migrate: docker compose exec app npx prisma migrate dev
   - DB seed: docker compose exec app npx prisma db seed
8. How to Add a Course (step-by-step guide for non-devs)
9. How to Add a New Language
10. Deployment Guide (Vercel / Railway / VPS)
```

---

*End of specification. Begin with Step 1 from the Build Order.*